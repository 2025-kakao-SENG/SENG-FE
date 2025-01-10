import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            // '@'를 'src' 폴더로 매핑하여, 코드에서 '@'를 사용해 src 폴더를 쉽게 참조할 수 있게 만듭니다.
            '@': path.resolve(__dirname, './src'), // 현재 디렉토리(__dirname)를 기준으로 'src' 폴더를 절대 경로로 지정
        },
    },
});
