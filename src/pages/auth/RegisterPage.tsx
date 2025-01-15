import {useNavigate} from 'react-router-dom';
import {useState} from 'react';
import {
    AuthRegisterApiRequest,
    AuthRegisterApiResponse,
} from '@/types/auth/registerApiTypes';
import useAuthRegisterApi from '@/hooks/apis/auth/useAuthRegisterApi';

function RegisterPage() {
    const navigate = useNavigate();
    const {authRegisterApi, isLoading} = useAuthRegisterApi();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [birth, setBirth] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [birthError, setBirthError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [addressError, setAddressError] = useState('');

    const [isSuccess, setIsSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const successRegister = () => {
        setIsSuccess(true);
        setTimeout(() => {
            navigate('/auth/login');
        }, 500);
    };

    const validateInputs = (): boolean => {
        let isValid = true;

        if (!name.trim()) {
            setNameError('이름을 입력해주세요.');
            isValid = false;
        } else {
            setNameError('');
        }

        if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setEmailError('유효한 이메일을 입력해주세요.');
            isValid = false;
        } else {
            setEmailError('');
        }

        if (!password.trim() || password.length < 6) {
            setPasswordError('비밀번호는 6자 이상이어야 합니다.');
            isValid = false;
        } else {
            setPasswordError('');
        }

        if (!birth.trim() || !/^\d{4}-\d{2}-\d{2}$/.test(birth)) {
            setBirthError('유효한 생년월일을 입력해주세요. (YYYY-MM-DD)');
            isValid = false;
        } else {
            setBirthError('');
        }

        if (!phone.trim() || !/^010\d{8}$/.test(phone)) {
            setPhoneError('유효한 전화번호를 입력해주세요.');
            isValid = false;
        } else {
            setPhoneError('');
        }

        if (!address.trim()) {
            setAddressError('주소를 입력해주세요.');
            isValid = false;
        } else {
            setAddressError('');
        }

        return isValid;
    };

    async function handleSubmit() {
        if (!validateInputs()) {
            return;
        }

        const request: AuthRegisterApiRequest = {
            name,
            email,
            password,
            birth,
            phone,
            address,
        };

        try {
            const response: AuthRegisterApiResponse =
                await authRegisterApi(request);

            if (response.status === 'success') {
                successRegister();
            } else {
                setErrorMessage(response.message);
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                setErrorMessage(error.message);
                setErrorMessage('회원가입 통신 처리 중 오류가 발생했습니다.');
            } else {
                setErrorMessage('회원가입 중 알 수 없는 오류가 발생했습니다.');
            }
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
            <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
                <h1 className="mb-6 text-center text-2xl font-bold">
                    회원가입
                </h1>

                {/* 성공 모달 */}
                {isSuccess && (
                    <div className="mb-4 rounded bg-green-100 p-4 text-green-800">
                        <p>회원가입에 성공했습니다!</p>
                    </div>
                )}

                {/* 입력 폼 */}
                <div className="space-y-4">
                    <div>
                        <input
                            type="text"
                            placeholder="이름"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        {nameError && (
                            <p className="mt-1 text-sm text-red-600">
                                {nameError}
                            </p>
                        )}
                    </div>

                    <div>
                        <input
                            type="email"
                            placeholder="이메일"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        {emailError && (
                            <p className="mt-1 text-sm text-red-600">
                                {emailError}
                            </p>
                        )}
                    </div>

                    <div>
                        <input
                            type="password"
                            placeholder="비밀번호"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        {passwordError && (
                            <p className="mt-1 text-sm text-red-600">
                                {passwordError}
                            </p>
                        )}
                    </div>

                    <div>
                        <input
                            type="date"
                            placeholder="생년월일"
                            value={birth}
                            onChange={e => setBirth(e.target.value)}
                            className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        {birthError && (
                            <p className="mt-1 text-sm text-red-600">
                                {birthError}
                            </p>
                        )}
                    </div>

                    <div>
                        <input
                            type="text"
                            placeholder="전화번호"
                            value={phone}
                            onChange={e => setPhone(e.target.value)}
                            className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        {phoneError && (
                            <p className="mt-1 text-sm text-red-600">
                                {phoneError}
                            </p>
                        )}
                    </div>

                    <div>
                        <input
                            type="text"
                            placeholder="주소"
                            value={address}
                            onChange={e => setAddress(e.target.value)}
                            className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        {addressError && (
                            <p className="mt-1 text-sm text-red-600">
                                {addressError}
                            </p>
                        )}
                    </div>
                </div>

                {/* 에러 메시지 */}
                {errorMessage && (
                    <p className="mt-4 text-sm text-red-600">{errorMessage}</p>
                )}

                {/* 회원가입 버튼 */}
                <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className={`mt-6 w-full rounded-lg px-4 py-2 font-semibold text-white ${
                        isLoading
                            ? 'cursor-not-allowed bg-blue-300'
                            : 'bg-blue-500 hover:bg-blue-600'
                    }`}>
                    {isLoading ? '회원가입 중...' : '회원가입'}
                </button>
            </div>
        </div>
    );
}

export default RegisterPage;
