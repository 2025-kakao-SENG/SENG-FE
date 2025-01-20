import {useNavigate} from 'react-router-dom';
import {useState} from 'react';
import {
    AuthRegisterApiRequest,
    AuthRegisterApiResponse,
} from '@/types/auth/registerApiTypes';
import useAuthRegisterApi from '@/hooks/apis/auth/useAuthRegisterApi';
import logoCircle from '@/assets/images/login/logoCircle.svg';
import calendar from '@/assets/images/calendar.svg';
import close from '@/assets/images/login/close.svg';

function SignUp() {
    const navigate = useNavigate();
    const {authRegisterApi, isLoading} = useAuthRegisterApi();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [checkPassword, setCheckPassword] = useState('');
    const [birth, setBirth] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [checkPasswordError, setCheckPasswordError] = useState('');
    const [birthError, setBirthError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [addressError, setAddressError] = useState('');

    const [errorMessage, setErrorMessage] = useState('');

    const successRegister = () => {
        navigate('/auth/login');
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

        if (password !== checkPassword) {
            setCheckPasswordError('비밀번호가 일치하지 않습니다.');
            isValid = false;
        } else {
            setCheckPasswordError('');
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
            } else {
                setErrorMessage('회원가입 중 알 수 없는 오류가 발생했습니다.');
            }
        }
    }

    return (
        <div className="flex h-[34.5rem] w-[51.9375rem] items-start justify-between bg-[#1B1B1B]">
            {/* 로고 */}
            <img src={logoCircle} alt="Logo" className="pl-8 pt-8" />

            {/* 본문 */}
            <div className="flex flex-col gap-2.5 pt-[3.125rem]">
                <h1 className="text-lg font-extrabold text-[#FAC453]">
                    회원가입
                </h1>

                <p className="text-[0.625rem] font-medium">
                    이용약관을 읽고 동의하시면 서비스를 이용하실 수 있습니다.
                </p>

                <p className="border-[0.041875rem] border-[#575757]" />

                <div className="flex flex-col gap-2.5">
                    {/* 이메일 */}
                    <div className="flex items-center justify-between">
                        <p className="text-[0.66875rem] text-[#F5F5F5]">
                            이메일
                        </p>
                        <input
                            type="text"
                            placeholder="이메일을 입력해주세요."
                            className="h-[2.633125rem] w-[35.695rem] rounded-sm border border-[#9C9C9C] bg-transparent p-2.5 text-[0.66875rem] placeholder:text-[0.66875rem] placeholder:text-[#9C9C9C] focus:border-[#DBAC4A] focus:outline-none focus:placeholder:text-[#DBAC4A]"
                            onChange={e => setEmail(e.target.value)}
                        />
                        {emailError && (
                            <p className="text-[0.625rem] text-[#FF0000]">
                                {emailError}
                            </p>
                        )}
                    </div>

                    {/* 비밀번호 */}
                    <div className="flex justify-between gap-[0.8775rem]">
                        <div className="flex items-center justify-between gap-[1.85rem]">
                            <p className="text-[0.66875rem] text-[#F5F5F5]">
                                비밀번호
                            </p>
                            <input
                                type="password"
                                placeholder="비밀번호를 입력해주세요."
                                className="h-[2.633125rem] w-[14.67125rem] rounded-sm border border-[#9C9C9C] bg-transparent p-2.5 text-[0.66875rem] placeholder:text-[0.66875rem] placeholder:text-[#9C9C9C] focus:border-[#DBAC4A] focus:outline-none focus:placeholder:text-[#DBAC4A]"
                                onChange={e => setPassword(e.target.value)}
                            />
                            {passwordError && (
                                <p className="text-[0.625rem] text-[#FF0000]">
                                    {passwordError}
                                </p>
                            )}
                        </div>
                        <div className="flex items-center justify-between gap-[1.6425rem]">
                            <p className="text-[0.66875rem] text-[#F5F5F5]">
                                비밀번호 확인
                            </p>
                            <input
                                type="password"
                                placeholder="비밀번호를 한번 더 입력해주세요."
                                className="h-[2.633125rem] w-[14.629375rem] rounded-sm border border-[#9C9C9C] bg-transparent p-2.5 text-[0.66875rem] placeholder:text-[0.66875rem] placeholder:text-[#9C9C9C] focus:border-[#DBAC4A] focus:outline-none focus:placeholder:text-[#DBAC4A]"
                                onChange={e => setCheckPassword(e.target.value)}
                            />
                            {checkPasswordError && (
                                <p className="text-[0.625rem] text-[#FF0000]">
                                    {checkPasswordError}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* 이름 */}
                    <div className="flex items-center justify-between">
                        <p className="text-[0.66875rem] text-[#F5F5F5]">이름</p>
                        <input
                            type="text"
                            placeholder="이름을 입력해주세요."
                            className="h-[2.633125rem] w-[35.695rem] rounded-sm border border-[#9C9C9C] bg-transparent p-2.5 text-[0.66875rem] placeholder:text-[0.66875rem] placeholder:text-[#9C9C9C] focus:border-[#DBAC4A] focus:outline-none focus:placeholder:text-[#DBAC4A]"
                            onChange={e => setName(e.target.value)}
                        />
                        {nameError && (
                            <p className="text-[0.625rem] text-[#FF0000]">
                                {nameError}
                            </p>
                        )}
                    </div>

                    {/* 생년월일 */}
                    <div className="relative flex items-center justify-between">
                        <p className="text-[0.66875rem] text-[#F5F5F5]">
                            생년월일
                        </p>
                        <input
                            type="text"
                            placeholder="연도-월-일"
                            className="h-[2.633125rem] w-[35.695rem] rounded-sm border border-[#9C9C9C] bg-transparent p-2.5 text-[0.66875rem] placeholder:text-[0.66875rem] placeholder:text-[#9C9C9C] focus:border-[#DBAC4A] focus:outline-none focus:placeholder:text-[#DBAC4A]"
                            onChange={e => setBirth(e.target.value)}
                        />
                        <img
                            src={calendar}
                            alt="Calendar"
                            className="focus:placeholder:img-[#DBAC4A] absolute right-[1.46875rem] top-[0.9375rem]"
                        />
                        {birthError && (
                            <p className="text-[0.625rem] text-[#FF0000]">
                                {birthError}
                            </p>
                        )}
                    </div>

                    {/* 연락처 */}
                    <div className="flex items-center justify-between">
                        <p className="text-[0.66875rem] text-[#F5F5F5]">
                            연락처
                        </p>
                        <input
                            type="text"
                            placeholder="010 1234 1234"
                            className="h-[2.633125rem] w-[35.695rem] rounded-sm border border-[#9C9C9C] bg-transparent p-2.5 text-[0.66875rem] placeholder:text-[0.66875rem] placeholder:text-[#9C9C9C] focus:border-[#DBAC4A] focus:outline-none focus:placeholder:text-[#DBAC4A]"
                            onChange={e => setPhone(e.target.value)}
                        />
                        {phoneError && (
                            <p className="text-[0.625rem] text-[#FF0000]">
                                {phoneError}
                            </p>
                        )}
                    </div>

                    {/* 주소 */}
                    <div className="flex items-center justify-between">
                        <p className="text-[0.66875rem] text-[#F5F5F5]">주소</p>
                        <div className="flex items-center gap-[0.46rem]">
                            <input
                                type="text"
                                placeholder="주소를 입력해주세요."
                                className="h-[2.633125rem] w-[28.965625rem] rounded-sm border border-[#9C9C9C] bg-transparent p-2.5 text-[0.66875rem] placeholder:text-[0.66875rem] placeholder:text-[#9C9C9C] focus:border-[#DBAC4A] focus:outline-none focus:placeholder:text-[#DBAC4A]"
                                onChange={e => setAddress(e.target.value)}
                            />
                            <button
                                type="button"
                                className="h-[2.633125rem] w-[6.269375rem] rounded-sm bg-[#EEB02F] px-[1.875rem] text-[0.66875rem] font-medium text-black">
                                주소찾기
                            </button>
                        </div>
                        {addressError && (
                            <p className="text-[0.625rem] text-[#FF0000]">
                                {addressError}
                            </p>
                        )}
                    </div>

                    {/* 에러 메시지 */}
                    {errorMessage && (
                        <p className="text-[0.625rem] text-[#FF0000]">
                            {errorMessage}
                        </p>
                    )}

                    {/* 회원가입 버튼 */}
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="h-[2.633125rem] w-[39.875rem] rounded-sm bg-[#EEB02F] text-black">
                        {isLoading ? '회원가입 중...' : '회원가입'}
                    </button>
                </div>
            </div>

            {/* 닫기 버튼 */}
            <button type="button" onClick={() => navigate(-1)}>
                <img
                    src={close}
                    alt="Close Button"
                    className="pr-[1.875rem] pt-[1.875rem] text-[0.83625rem] font-medium text-black"
                />
            </button>
        </div>
    );
}

export default SignUp;
