import {Outlet} from 'react-router-dom';

function Setting() {
    return (
        <div className="flex gap-x-10">
            <h1>설정</h1>
            <Outlet />
        </div>
    );
}

export default Setting;
