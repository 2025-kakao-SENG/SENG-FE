import { defineConfig } from 'vitest/config';

export default defineConfig({
  // Vitest 설정을 정의하는 객체입니다.
  test: {
    // 글로벌 변수를 사용할지 여부를 설정 (예: jest의 'describe', 'it'과 같은 글로벌 함수 사용 가능)
    globals: true,

    // 테스트 환경을 설정. "jsdom"은 DOM을 구현한 가상 환경을 사용하여 브라우저 관련 코드 테스트
    environment: "jsdom",

    // 테스트 실행 전에 실행할 설정 파일을 지정. 예를 들어, 전역 설정이나 모의(mock) 데이터를 설정할 수 있음
    setupFiles: "./src/tests/setup.ts",
  },
})