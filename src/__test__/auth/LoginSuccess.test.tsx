import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import {Provider} from 'react-redux';
import {MemoryRouter} from 'react-router-dom';
import {store} from '@/redux/store';
import LoginPage from '@/pages/auth/LoginPage';

describe('로그인 페이지 테스트', () => {
    it('일반 로그인 성공 테스트', async () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>,
        );

        // Find inputs and buttons
        const emailInput = screen.getByPlaceholderText('이메일');
        const passwordInput = screen.getByPlaceholderText('비밀번호');
        const loginButton = screen.getByRole('button', {name: '로그인'});

        // Simulate user input
        fireEvent.change(emailInput, {target: {value: 'test@naver.com'}});
        fireEvent.change(passwordInput, {target: {value: 'testtest'}});

        // Click login button
        fireEvent.click(loginButton);

        // Assert success message
        await waitFor(() =>
            expect(
                screen.getByText('로그인에 성공했습니다!'),
            ).toBeInTheDocument(),
        );
    });
});
