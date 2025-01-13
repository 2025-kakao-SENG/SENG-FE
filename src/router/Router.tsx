import {createBrowserRouter, Navigate} from 'react-router-dom';
import LandingPage from '@/pages/LandingPage';
import Layout from '@/layouts/Layout.tsx';
import LoginPage from '@/pages/auth/LoginPage.tsx';
import RegisterLayout from '@/layouts/RegisterLayout.tsx';
import HomePage from '@/pages/HomePage.tsx';
import AISideBar from '@/components/homePage/AISideBar.tsx';
import LibraryPage from '@/pages/LibraryPage.tsx';
import SettingsLayout from '@/layouts/SettingsLayout';
import MyPage from '@/pages/settings/MyPage.tsx';
import CommunityPage from '@/pages/settings/CommunityPage.tsx';
import LibraryManagementPage from '@/pages/settings/LibraryManagementPage';
import NotificationPage from '@/pages/settings/NotificationPage.tsx';
import DisplayPage from '@/pages/settings/DisplayPage.tsx';

const router = createBrowserRouter([
    {
        path: 'landing',
        element: <LandingPage />,
    },
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: 'auth',
                element: <Navigate to="login" replace />,
                children: [
                    {
                        path: 'login',
                        element: <LoginPage />,
                    },
                    {
                        path: 'register',
                        element: <RegisterLayout />,
                    },
                ],
            },
            {
                path: 'home',
                element: <HomePage />,
                children: [
                    {
                        path: 'ai',
                        element: <AISideBar />,
                    },
                ],
            },
            {
                path: 'library',
                element: <LibraryPage />,
            },
            {
                path: 'settings',
                element: <SettingsLayout />,
                children: [
                    {
                        path: 'myPage',
                        element: <MyPage />,
                    },
                    {
                        path: 'community',
                        element: <CommunityPage />,
                    },
                    {
                        path: 'libraryManagement',
                        element: <LibraryManagementPage />,
                    },
                    {
                        path: 'notification',
                        element: <NotificationPage />,
                    },
                    {
                        path: 'display',
                        element: <DisplayPage />,
                    },
                ],
            },
        ],
    },
]);

export default router;
