/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: ['./src/**/*.{ts,tsx}'],
    theme: {
        screens: {
            TB: '768px',
            DEFAULT: 'calc(986 / 1920 * 100dvh)',
        },
        // colors: {
        //     primary: '#DBAC4A',
        // },
        extend: {
            dropShadow: {
                'glow-yellow': '0 0 10px #FFD06D', // 바깥쪽 빛 효과
            },
            keyframes: {
                wiggle: {
                    '0%': {transform: 'rotate(-3deg)'},
                    '50%': {transform: 'rotate(3deg)'},
                    '100%': {transform: 'rotate(0deg)'},
                },
            },
            animation: {
                wiggle: 'wiggle 0.7s ease-in-out', // 반복 제거
            },
            boxShadow: {
                right: '1px 0 #292929', // 오른쪽 그림자
            },
            colors: {
                lightBg: '#F5F5F5',
                darkBg: '#1B1B1B',
                lightText: '#000000',
                darkText: '#FFFFFF',
            },
        },
    },
    plugins: [],
};
