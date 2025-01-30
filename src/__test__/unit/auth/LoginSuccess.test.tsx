// src/components/LoginPage/LoginPage.test.tsx
import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import LoginPage from '@/pages/auth/LoginPage';
import {Provider} from 'react-redux';
import {store} from '@/redux/store'; // Redux 스토어 설정
import {BrowserRouter} from 'react-router-dom';
import {describe, it, expect, vi, beforeEach} from 'vitest';

// Mock useNavigate from react-router-dom
const mockedNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
    const actual =
        await vi.importActual<typeof import('react-router-dom')>(
            'react-router-dom',
        );
    return {
        ...actual,
        useNavigate: () => mockedNavigate,
    };
});

describe('LoginPage', () => {
    const backgroundLocation = '/previous-page';

    const setup = () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <LoginPage backgroundLocation={backgroundLocation} />
                </BrowserRouter>
            </Provider>,
        );
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders the login form correctly', () => {
        setup();

        // 이메일 입력 필드
        const emailInput = screen.getByPlaceholderText('이메일');
        expect(emailInput).toBeInTheDocument();

        // 비밀번호 입력 필드
        const passwordInput = screen.getByPlaceholderText('비밀번호');
        expect(passwordInput).toBeInTheDocument();

        // 로그인 버튼
        const loginButton = screen.getByText('로그인');
        expect(loginButton).toBeInTheDocument();

        // 카카오 로그인 버튼
        const kakaoLoginButton = screen.getByRole('button', {
            name: /카카오 로그인/i,
        });
        expect(kakaoLoginButton).toBeInTheDocument();
    });

    it('allows user to input email and password', () => {
        setup();

        const emailInput = screen.getByPlaceholderText(
            '이메일',
        ) as HTMLInputElement;
        const passwordInput = screen.getByPlaceholderText(
            '비밀번호',
        ) as HTMLInputElement;

        fireEvent.change(emailInput, {target: {value: 'test@example.com'}});
        fireEvent.change(passwordInput, {target: {value: 'password123'}});

        expect(emailInput).toHaveValue('test@example.com');
        expect(passwordInput.value).toBe('password123');
    });

    it('shows error message on failed login', async () => {
        setup();

        const emailInput = screen.getByPlaceholderText('이메일');
        const passwordInput = screen.getByPlaceholderText('비밀번호');
        const loginButton = screen.getByText('로그인');

        // 잘못된 자격 증명 입력
        fireEvent.change(emailInput, {target: {value: 'wrong@example.com'}});
        fireEvent.change(passwordInput, {target: {value: 'wrongpassword'}});
        fireEvent.click(loginButton);

        // 에러 메시지가 표시되는지 확인
        const errorMessage = await screen.findByText(
            '아이디 혹은 비밀번호가 잘못되었습니다.',
        );
        expect(errorMessage).toBeInTheDocument();

        // 로그인 버튼이 다시 활성화되었는지 확인
        expect(loginButton).not.toBeDisabled();
        expect(loginButton).toHaveTextContent('로그인');
    });

    it('navigates to home on successful login and updates Redux store', async () => {
        setup();

        const emailInput = screen.getByPlaceholderText('이메일');
        const passwordInput = screen.getByPlaceholderText('비밀번호');
        const loginButton = screen.getByText('로그인');

        // 올바른 자격 증명 입력
        fireEvent.change(emailInput, {target: {value: 'test@example.com'}});
        fireEvent.change(passwordInput, {target: {value: 'password123'}});
        screen.debug();
        fireEvent.click(loginButton);

        // 네비게이션이 호출되었는지 확인
        await waitFor(() => {
            expect(mockedNavigate).toHaveBeenCalledWith('/home');
        });

        // Redux 상태가 업데이트되었는지 확인
        const state = store.getState().user;
        expect(state.isLogined).toBe(true);
        expect(state.email).toBe('test@example.com');
        expect(state.name).toBe('Test User');
    });

    it('closes the login modal and navigates back when close button is clicked', () => {
        setup();

        const closeButton = screen.getByRole('button', {name: /Close Button/i});
        fireEvent.click(closeButton);

        expect(mockedNavigate).toHaveBeenCalledWith(backgroundLocation);
    });
});
