import {useState} from 'react';
import {AuthDeregisterApiRequest} from '@/types/auth/deregisterApiTypes';
import useAuthDeregisterApi from '@/hooks/apis/auth/useAuthDeregisterApi';
import {useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {getUserLoginData} from '@/redux/selector';
import useLogout from '@/hooks/useLogout';

function DeregisterTest() {
    const navigate = useNavigate();
    const userLoginDate = useSelector(getUserLoginData);

    const {authDeregisterApi, isLoading} = useAuthDeregisterApi();
    const logout = useLogout();

    const [isSuccess, setIsSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const successDeregister = () => {
        setIsSuccess(true);
        // 1초 뒤 홈 화면으로 이동
        setTimeout(() => {
            navigate('/home');
        }, 1000);
    };

    const handleDeregister = async () => {
        const KAKAO_API_KEY: string = import.meta.env.VITE_KAKAO_JS_KEY;

        if (userLoginDate.kakaoPid) {
            if (!window.Kakao.isInitialized()) {
                window.Kakao.init(KAKAO_API_KEY);
            }

            const serverRequest: AuthDeregisterApiRequest = {
                kakaoPid: userLoginDate.kakaoPid,
            };
            try {
                const serverResponse = await authDeregisterApi(serverRequest);

                if (serverResponse.status === 'success') {
                    window.Kakao.API.request({
                        url: '/v1/user/unlink',
                    });

                    logout('kakao');
                    successDeregister();
                } else {
                    setErrorMessage(serverResponse.message);
                }
            } catch {
                setErrorMessage('회원 탈퇴 통신 에러 발생');
            }
        }
        // redux로 일반 회원 탈퇴
        else if (userLoginDate.pid) {
            const serverRequest: AuthDeregisterApiRequest = {
                pid: parseInt(userLoginDate.pid, 10),
            };

            try {
                const serverResponse = await authDeregisterApi(serverRequest);

                if (serverResponse.status === 'success') {
                    logout('default');
                    successDeregister();
                } else {
                    setErrorMessage(serverResponse.message);
                }
            } catch {
                setErrorMessage('회원 탈퇴 통신 에러 발생');
            }
        }
        // 로그인 만료됨, 다시 로그인
        else {
            setErrorMessage(
                '로그인 세션이 만료되었습니다. 다시 로그인해주세요.',
            );
            navigate('/auth/login');
        }
    };

    return (
        <div className="flex h-screen flex-col items-center justify-center bg-gray-100">
            <div className="w-96 rounded-lg bg-white p-8 shadow-lg">
                <h1 className="mb-4 text-center text-2xl font-bold text-gray-800">
                    회원 탈퇴
                </h1>
                {isSuccess ? (
                    <p className="mb-4 text-center font-medium text-green-600">
                        회원 탈퇴가 성공적으로 처리되었습니다.
                    </p>
                ) : (
                    <p className="mb-4 text-center font-medium text-red-500">
                        {errorMessage}
                    </p>
                )}
                <button
                    type="button"
                    onClick={handleDeregister}
                    className={`w-full rounded-lg px-4 py-2 font-bold text-white transition ${
                        isLoading
                            ? 'cursor-not-allowed bg-gray-400'
                            : 'bg-red-500 hover:bg-red-600'
                    }`}
                    disabled={isLoading}>
                    {isLoading ? '처리 중...' : '회원 탈퇴'}
                </button>
            </div>
        </div>
    );
}

export default DeregisterTest;
