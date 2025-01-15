// Kakao 타입 선언
interface Kakao {
    init(apiKey: string): void; // SDK 초기화
    isInitialized(): boolean; // 초기화 여부 확인
    Auth: {
        login(options: {
            success: (authObj: {access_token: string}) => void;
            fail: () => void;
        }): void;
        getStatusInfo(
            callback: (statusObj: {status: string; user: {id: string}}) => void,
        ): void;
        getAccessToken(): string | null;
        logout(): void;
    };
    API: {
        request(options: {
            url: string;
            success?: (response) => void;
            fail?: () => void;
        });
    };
}

// 전역 객체에 Kakao 추가
interface Window {
    Kakao: Kakao;
}
