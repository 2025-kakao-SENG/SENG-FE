import {defineConfig} from 'vitest/config';
import path from 'path';

export default defineConfig({
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './src/__test__/setup.ts',
    },
    resolve: {
        alias: {
            // '@'를 'src' 폴더로 매핑하여, 코드에서 '@'를 사용해 src 폴더를 쉽게 참조할 수 있게 만듭니다.
            '@': path.resolve(__dirname, './src'), // 현재 디렉토리(__dirname)를 기준으로 'src' 폴더를 절대 경로로 지정
        },
    },
});
