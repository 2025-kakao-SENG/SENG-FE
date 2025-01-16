import {createBrowserRouter, Navigate, Outlet} from 'react-router-dom';
import LandingPage from '@/pages/LandingPage';
import Layout from '@/layouts/Layout.tsx';
import LoginPage from '@/pages/auth/LoginPage';
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
import DeregisterTest from '@/pages/auth/DeregiterPage';
import LogoutPage from '@/pages/auth/LogoutPage';
import BookComponent from '@/components/book/Book';

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
                element: <Outlet />,
                children: [
                    {
                        index: true,
                        element: <Navigate to="login" />,
                    },
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
            // test page
            {
                path: 'deregister',
                element: <DeregisterTest />,
            },
            {
                path: 'logout',
                element: <LogoutPage />,
            },
            {
                path: 'page',
                element: <BookComponent />,
            }
        ],
    },
]);

export default router;
