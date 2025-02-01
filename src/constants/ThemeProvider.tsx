import {createContext, useContext, useEffect, useState} from 'react';

// 테마 상태를 관리할 Context 생성
interface ThemeContextType {
    isDarkMode: boolean;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

// 전역 테마 상태 관리 Provider
export function ThemeProvider({children}: {children: React.ReactNode}) {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        // localStorage에서 테마 상태 불러오기 (기본값: true)
        return localStorage.getItem('theme') === 'light' ? false : true;
    });

    // 테마 변경 함수
    const toggleTheme = () => {
        setIsDarkMode(prevMode => {
            const newMode = !prevMode;
            localStorage.setItem('theme', newMode ? 'dark' : 'light');
            return newMode;
        });
    };

    // Tailwind의 다크 모드 클래스를 `html` 태그에 적용
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    return (
        <ThemeContext.Provider value={{isDarkMode, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    );
}
