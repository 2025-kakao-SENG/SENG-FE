import {useTheme} from '@/constants/ThemeProvider';

function DisplayPage() {
    const {isDarkMode, toggleTheme} = useTheme();

    return (
        <div>
            <h2
                className={`font-semibold ${
                    isDarkMode ? 'text-[#B1B1B1]' : 'text-black}'
                }`}>
                화면 테마 설정하기
            </h2>
            <div className="mt-[1.1875rem] flex flex-col items-start gap-[0.6875rem] pl-[1.375rem] text-sm">
                <button
                    type="button"
                    className={`rounded-md px-4 py-2 transition ${
                        isDarkMode
                            ? 'bg-[#292929] text-white'
                            : 'bg-[#f5f5f5] text-black'
                    }`}
                    onClick={toggleTheme}>
                    {isDarkMode ? 'light 테마' : 'dark 테마'}
                </button>
            </div>
        </div>
    );
}

export default DisplayPage;
