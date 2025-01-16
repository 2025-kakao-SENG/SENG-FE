import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import {Provider} from 'react-redux';
import {MemoryRouter} from 'react-router-dom';
import {store} from '@/redux/store';
import LoginPage from '@/pages/auth/LoginPage';

describe('로그인 페이지 테스트', () => {
    it('일반 로그인 에러 테스트', async () => {
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
        const loginButton = screen.getByText('로그인');

        // Simulate user input with invalid credentials
        fireEvent.change(emailInput, {target: {value: 'wrong@example.com'}});
        fireEvent.change(passwordInput, {target: {value: 'wrongpassword'}});

        // Click login button
        fireEvent.click(loginButton);

        // Assert error message
        await waitFor(() =>
            expect(screen.getByText('로그인 실패')).toBeInTheDocument(),
        );
    });
});
