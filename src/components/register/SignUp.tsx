import {useNavigate} from 'react-router-dom';
import {useState} from 'react';
import {
    AuthRegisterApiRequest,
    AuthRegisterApiResponse,
} from '@/types/apis/auth/registerApiTypes';
import useAuthRegisterApi from '@/hooks/apis/auth/useAuthRegisterApi';
import logo from '@/assets/images/logo.svg';
import calendar from '@/assets/images/calendar.svg';
import close from '@/assets/images/login/close.svg';
import {useTheme} from '@/constants/ThemeProvider';
import {setLoginClose} from '@/redux/slice/etcSlice';
import {useDispatch} from 'react-redux';

interface SignUpProps {
    backgroundLocation: string;
}

function SignUp({backgroundLocation: registerBackgroundLocation}: SignUpProps) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {authRegisterApi, isLoading} = useAuthRegisterApi();
    const {isDarkMode} = useTheme();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [checkPassword, setCheckPassword] = useState('');
    const [birth, setBirth] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    const [errorMessage, setErrorMessage] = useState('');

    const successRegister = () => {
        navigate('/login', {
            state: {backgroundLocation: registerBackgroundLocation},
        });
    };

    async function handleSubmit() {
        const request: AuthRegisterApiRequest = {
            name,
            email,
            password,
            birth,
            phone,
            address,
        };

        if (password !== checkPassword) {
            setErrorMessage('비밀번호가 일치하지 않습니다.');
            return;
        }

        // 유효성 검증
        if (
            !name ||
            !email ||
            !password ||
            !checkPassword ||
            !birth ||
            !phone ||
            !address
        ) {
            setErrorMessage('모든 항목을 입력해주세요.');
            return;
        }

        const birthRegex = /^[1-2][0-9]{3}-[0-1][0-9]-[0-3][0-9]$/;
        if (!birthRegex.test(birth)) {
            setErrorMessage('생년월일을 형식에 맞게 입력해주세요.');
            return;
        }

        // ex) 01012341234, 010 고정
        const phoneRegex = /^010[0-9]{8}$/;
        if (!phoneRegex.test(phone)) {
            setErrorMessage('연락처를 형식에 맞게 입력해주세요.');
            return;
        }

        try {
            const response: AuthRegisterApiResponse =
                await authRegisterApi(request);

            if (response.status === 'success') {
                successRegister();
            } else if (response.status === 'error') {
                // 에러 메시지에 따라 분기 처리
                if (response.message.includes('Missing required field')) {
                    // 예: 'Missing required field: <필드명>'
                    setErrorMessage(response.message);
                } else if (
                    response.message.includes('The email is already registered')
                ) {
                    // 중복 이메일
                    setErrorMessage('이미 등록된 이메일입니다.');
                } else if (
                    response.message.includes(
                        'The phone number is already registered',
                    )
                ) {
                    // 중복 전화번호
                    setErrorMessage('이미 등록된 전화번호입니다.');
                } else if (
                    response.message.includes('Only POST method is allowed')
                ) {
                    // 지원되지 않는 메서드
                    setErrorMessage('허용되지 않는 메서드 요청입니다.');
                } else if (response.message.startsWith('Error:')) {
                    // 기타 데이터베이스 오류
                    // message 예: "Error: <구체적인 오류 메시지>"
                    setErrorMessage(
                        `서버 오류가 발생했습니다. (${response.message})`,
                    );
                } else {
                    // 기타 예상치 못한 에러 메시지 처리
                    setErrorMessage(
                        `알 수 없는 오류가 발생했습니다. (${response.message})`,
                    );
                }
            } else {
                // status가 'success'도 'error'도 아닌 경우
                setErrorMessage('알 수 없는 응답이 수신되었습니다.');
            }
        } catch /* (error: unknown) */ {
            setErrorMessage('회원가입 중 오류가 발생했습니다.');
        }
    }

    return (
        <div
            className={`flex h-[34.5rem] w-[51.9375rem] items-start justify-between shadow-lg transition-colors duration-300 ${
                isDarkMode
                    ? 'bg-[#1B1B1B] text-[#F5F5F5]'
                    : 'bg-[#e9e9e9] text-black'
            }`}>
            {/* 로고 */}
            <div
                className={`ml-8 mt-8 rounded-full p-3 px-2.5 transition-colors duration-300 ${
                    isDarkMode ? 'bg-black' : 'bg-white'
                }`}>
                <img
                    src={logo}
                    alt="StoryBreeze Logo"
                    className="w-[3.54312rem]"
                />
            </div>

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
                        <p
                            className={`text-[0.66875rem] transition-colors duration-300 ${
                                isDarkMode ? 'text-[#F5F5F5]' : 'text-black'
                            }`}>
                            이메일
                        </p>

                        <input
                            type="text"
                            placeholder="이메일을 입력해주세요."
                            className="h-[2.633125rem] w-[35.695rem] rounded-sm border border-[#9C9C9C] bg-transparent p-2.5 text-[0.66875rem] placeholder:text-[0.66875rem] placeholder:text-[#9C9C9C] focus:border-[#DBAC4A] focus:outline-none focus:placeholder:text-[#DBAC4A]"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>

                    {/* 비밀번호 */}
                    <div className="flex justify-between gap-[0.8775rem]">
                        <div className="flex items-center justify-between gap-[1.68rem]">
                            <p
                                className={`text-[0.66875rem] transition-colors duration-300 ${
                                    isDarkMode ? 'text-[#F5F5F5]' : 'text-black'
                                }`}>
                                비밀번호
                            </p>

                            <input
                                type="password"
                                placeholder="비밀번호를 입력해주세요."
                                className="h-[2.633125rem] w-[14.67125rem] rounded-sm border border-[#9C9C9C] bg-transparent p-2.5 text-[0.66875rem] placeholder:text-[0.66875rem] placeholder:text-[#9C9C9C] focus:border-[#DBAC4A] focus:outline-none focus:placeholder:text-[#DBAC4A]"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="flex items-center justify-between gap-[1.6425rem]">
                            <p
                                className={`text-[0.66875rem] transition-colors duration-300 ${
                                    isDarkMode ? 'text-[#F5F5F5]' : 'text-black'
                                }`}>
                                비밀번호 확인
                            </p>

                            <input
                                type="password"
                                placeholder="비밀번호를 한번 더 입력해주세요."
                                className="h-[2.633125rem] w-[14.629375rem] rounded-sm border border-[#9C9C9C] bg-transparent p-2.5 text-[0.66875rem] placeholder:text-[0.66875rem] placeholder:text-[#9C9C9C] focus:border-[#DBAC4A] focus:outline-none focus:placeholder:text-[#DBAC4A]"
                                value={checkPassword}
                                onChange={e => setCheckPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* 이름 */}
                    <div className="flex items-center justify-between">
                        <p
                            className={`text-[0.66875rem] transition-colors duration-300 ${
                                isDarkMode ? 'text-[#F5F5F5]' : 'text-black'
                            }`}>
                            이름
                        </p>

                        <input
                            type="text"
                            placeholder="이름을 입력해주세요."
                            className="h-[2.633125rem] w-[35.695rem] rounded-sm border border-[#9C9C9C] bg-transparent p-2.5 text-[0.66875rem] placeholder:text-[0.66875rem] placeholder:text-[#9C9C9C] focus:border-[#DBAC4A] focus:outline-none focus:placeholder:text-[#DBAC4A]"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </div>

                    {/* 생년월일 */}
                    <div className="relative flex items-center justify-between">
                        <p
                            className={`text-[0.66875rem] transition-colors duration-300 ${
                                isDarkMode ? 'text-[#F5F5F5]' : 'text-black'
                            }`}>
                            생년월일
                        </p>

                        <input
                            type="text"
                            placeholder="연도-월-일"
                            className="h-[2.633125rem] w-[35.695rem] rounded-sm border border-[#9C9C9C] bg-transparent p-2.5 text-[0.66875rem] placeholder:text-[0.66875rem] placeholder:text-[#9C9C9C] focus:border-[#DBAC4A] focus:outline-none focus:placeholder:text-[#DBAC4A]"
                            value={birth}
                            onChange={e => setBirth(e.target.value)}
                        />
                        <img
                            src={calendar}
                            alt="Calendar"
                            className="focus:placeholder:img-[#DBAC4A] absolute right-[1.46875rem] top-[0.9375rem]"
                        />
                    </div>

                    {/* 연락처 */}
                    <div className="flex items-center justify-between">
                        <p
                            className={`text-[0.66875rem] transition-colors duration-300 ${
                                isDarkMode ? 'text-[#F5F5F5]' : 'text-black'
                            }`}>
                            연락처
                        </p>

                        <input
                            type="text"
                            placeholder="010 1234 1234"
                            className="h-[2.633125rem] w-[35.695rem] rounded-sm border border-[#9C9C9C] bg-transparent p-2.5 text-[0.66875rem] placeholder:text-[0.66875rem] placeholder:text-[#9C9C9C] focus:border-[#DBAC4A] focus:outline-none focus:placeholder:text-[#DBAC4A]"
                            value={phone}
                            onChange={e => setPhone(e.target.value)}
                        />
                    </div>

                    {/* 주소 */}
                    <div className="flex items-center justify-between">
                        <p
                            className={`text-[0.66875rem] transition-colors duration-300 ${
                                isDarkMode ? 'text-[#F5F5F5]' : 'text-black'
                            }`}>
                            주소
                        </p>

                        <div className="flex items-center gap-[0.46rem]">
                            <input
                                type="text"
                                placeholder="주소를 입력해주세요."
                                className="h-[2.633125rem] w-[28.965625rem] rounded-sm border border-[#9C9C9C] bg-transparent p-2.5 text-[0.66875rem] placeholder:text-[0.66875rem] placeholder:text-[#9C9C9C] focus:border-[#DBAC4A] focus:outline-none focus:placeholder:text-[#DBAC4A]"
                                value={address}
                                onChange={e => setAddress(e.target.value)}
                            />
                            <button
                                type="button"
                                className="h-[2.633125rem] w-[6.269375rem] rounded-sm bg-[#EEB02F] px-[1.875rem] text-[0.66875rem] font-medium text-black">
                                주소찾기
                            </button>
                        </div>
                    </div>

                    {/* 회원가입 버튼 */}
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="h-[2.633125rem] w-full rounded-sm bg-[#EEB02F] text-black">
                        회원가입
                    </button>
                </div>
            </div>

            {/* 닫기 버튼 */}
            <button
                type="button"
                onClick={() => {
                    dispatch(setLoginClose());
                    navigate(-1);
                }}>
                <img
                    src={close}
                    alt="Close Button"
                    className="pr-[1.875rem] pt-[1.875rem] text-[0.83625rem] font-medium text-black"
                />
            </button>

            {isLoading && (
                <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
                    <div className="flex flex-col items-center justify-center">
                        <div className="border-b-5 h-32 w-32 animate-spin rounded-full border-t-[7px] border-[#DBAC4A]" />
                        <p className="mt-5 text-[#DBAC4A]">회원가입 중...</p>
                    </div>
                </div>
            )}

            {errorMessage && (
                <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
                    <div className="flex flex-col items-center justify-center rounded-2xl bg-[#111111] p-5">
                        <p className="text-lg text-[#DBAC4A]">{errorMessage}</p>
                        <button
                            type="button"
                            onClick={() => setErrorMessage('')}
                            className="mt-2 rounded bg-[#DBAC4A] px-4 py-2 text-sm font-semibold text-white hover:bg-[#b88a3a]">
                            확인
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SignUp;
