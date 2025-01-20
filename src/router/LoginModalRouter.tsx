import LoginPage from '@/pages/auth/LoginPage';
import {Route, Routes, useLocation} from 'react-router-dom';

function LoginModalRouter() {
    const location = useLocation();
    const backgroundLocation = location.state?.backgroundLocation;

    return (
        <Routes location={backgroundLocation || location}>
            <Route path="/login" element={<LoginPage />} />
        </Routes>
    );
}

export default LoginModalRouter;
