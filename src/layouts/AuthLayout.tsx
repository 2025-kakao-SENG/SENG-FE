import {Outlet} from 'react-router-dom';

function AuthLayout() {
    return (
        <div className="flex h-full w-full flex-col items-center justify-center">
            <Outlet />
        </div>
    );
}

export default AuthLayout;
