import {createBrowserRouter, Navigate} from 'react-router-dom';
import LandingPage from '@/pages/randing/LandingPage';
import Register from '@/pages/auth/Register';
import Login from '@/pages/auth/Login';
import MainPageLayout from '@/layouts/MainPageLayout'; // 컴포넌트 값으로 사용
import Home from '@/pages/main/Home';
import MyPage from '@/pages/settingModal/MyPage';
import Library from '@/pages/main/Library';
import AI from '@/pages/main/AI';
import Community from '@/pages/main/Community';
import SettingLayout from '@/layouts/SettingLayout';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to="/main/home" replace />,
    },
    {
        path: '/landing',
        element: <LandingPage />,
    },
    {
        path: '/auth/register',
        element: <Register />,
    },
    {
        path: '/auth/login',
        element: <Login />,
    },
    {
        path: '/main',
        element: <MainPageLayout />,
        children: [
            {
                path: 'home',
                element: <Home />,
            },
            {
                path: 'library',
                element: <Library />,
            },
            {
                path: 'AI',
                element: <AI />,
            },
            {
                path: 'community',
                element: <Community />,
            },
            {
                path: 'setting',
                element: <SettingLayout />,
                children: [
                    {
                        index: true,
                        element: <Navigate to="myPage" replace />, // 기본적으로 myPage로 이동
                    },
                    {
                        path: 'myPage',
                        element: <MyPage />,
                    },
                ],
            },
        ],
    },
]);

export default router;
