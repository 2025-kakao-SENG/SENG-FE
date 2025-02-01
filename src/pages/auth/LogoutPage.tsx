import {useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import useLogout from '@/hooks/useLogout';
import {getUserLoginData} from '@/redux/selector';
import {useTheme} from '@/constants/ThemeProvider';

interface LogoutProps {
    backgroundLocation: string;
}

function Logout({backgroundLocation: logoutBackgroundLocation}: LogoutProps) {
    const navigate = useNavigate();
    const logout = useLogout();
    const userLoginDate = useSelector(getUserLoginData);
    const {isDarkMode} = useTheme();

    const handleLogout = () => {
        if (userLoginDate.kakaoPid) {
            logout('kakao');
        } else if (userLoginDate.pid) {
            logout('default');
        }
        navigate('/login', {
            state: {backgroundLocation: logoutBackgroundLocation},
        });
    };

    return (
        <div
            className={`absolute left-1/2 top-1/2 flex h-[9.75rem] w-[27.75rem] -translate-x-1/2 -translate-y-1/2 transform flex-col items-center rounded-2xl bg-[#1B1B1B] ${
                isDarkMode
                    ? 'bg-[#1B1B1B] text-white'
                    : 'bg-[#f5f5f5] text-black'
            }`}>
            {userLoginDate.isLogined ? (
                <>
                    {/* 로그아웃 확인 메시지 */}
                    <p className="mb-[2rem] mt-[2.2rem] text-[0.98rem] font-medium text-white">
                        로그아웃을 진행하시겠습니까?
                    </p>

                    {/* 버튼 그룹 */}
                    <div className="flex gap-3">
                        <button
                            type="button"
                            className="h-[3.125rem] w-[12.4375rem] rounded-[0.625rem] bg-[#2D2D2D] text-[#C8C8C8] hover:bg-[#4c4c4c]"
                            onClick={() => navigate('/home')}>
                            돌아가기
                        </button>
                        <button
                            type="button"
                            className="h-[3.125rem] w-[12.4375rem] rounded-[0.625rem] bg-[#FAC453] text-black hover:bg-[#d3776d]"
                            onClick={handleLogout}>
                            로그아웃
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <p className="mb-[2rem] mt-[2.2rem] text-[0.98rem] font-medium text-white">
                        로그인을 진행해 주세요
                    </p>

                    {/* 버튼 그룹 */}
                    <div className="flex gap-3">
                        <button
                            type="button"
                            className="h-[3.125rem] w-[12.4375rem] rounded-[0.625rem] bg-[#2D2D2D] text-[#C8C8C8] hover:bg-[#4c4c4c]"
                            onClick={() => navigate('/home')}>
                            돌아가기
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default Logout;
