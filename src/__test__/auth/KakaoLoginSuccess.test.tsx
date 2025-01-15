import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import {Provider} from 'react-redux';
import {MemoryRouter} from 'react-router-dom';
import {store} from '@/redux/store';
import LoginPage from '@/pages/auth/LoginPage';

describe('로그인 페이지 테스트', () => {
    it('handles Kakao login success', async () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>,
        );

        // Find Kakao login button
        const kakaoLoginButton = screen.getByText('카카오 로그인');

        // Click Kakao login button
        fireEvent.click(kakaoLoginButton);

        // Assert success message
        await waitFor(() =>
            expect(
                screen.getByText('로그인에 성공했습니다!'),
            ).toBeInTheDocument(),
        );
    });
});
