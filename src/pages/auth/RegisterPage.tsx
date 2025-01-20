import {useState} from 'react';
import SignUp from '@/components/register/SignUp';
import Service from '@/components/register/Service';

function RegisterPage() {
    const [showSignUp, setShowSignUp] = useState(false);

    const renderSignUp = () => {
        setShowSignUp(true);
    };

    return (
        <div className="absolute left-1/2 top-1/2 z-10 flex h-full w-full -translate-x-1/2 -translate-y-1/2 transform items-center justify-center">
            {/* 이용약관 페이지 */}
            {!showSignUp && <Service renderSignUp={renderSignUp} />}
            {/* 회원가입 페이지 */}
            {showSignUp && <SignUp />}
        </div>
    );
}

export default RegisterPage;
