import {useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import useLogout from '@/hooks/useLogout';
import {getUserLoginData} from '@/redux/selector';

function LogoutPage() {
    const navigate = useNavigate();
    const logout = useLogout();
    const userLoginDate = useSelector(getUserLoginData);

    const handleLogout = () => {
        if (userLoginDate.kakaoPid) {
            logout('kakao');
        } else if (userLoginDate.pid) {
            logout('default');
        }
        navigate('/auth/login');
    };

    return (
        <div className="flex h-screen items-center justify-center bg-gray-50">
            <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
                <h1 className="mb-6 text-center text-2xl font-bold">
                    로그아웃
                </h1>
                <p className="mb-4 text-center text-gray-700">
                    로그아웃하시겠습니까?
                </p>
                <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full rounded-lg bg-red-500 px-4 py-2 font-semibold text-white hover:bg-red-600">
                    로그아웃
                </button>
                <button
                    type="button"
                    onClick={() => navigate('/home')}
                    className="mt-4 w-full rounded-lg bg-gray-300 px-4 py-2 font-semibold text-gray-700 hover:bg-gray-400">
                    취소
                </button>
            </div>
        </div>
    );
}

export default LogoutPage;
