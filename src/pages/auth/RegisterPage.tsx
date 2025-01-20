import {useState} from 'react';
import SignUp from '@/components/register/SignUp';
import Service from '@/components/register/Service';

function RegisterPage() {
    const [showSignUp, setShowSignUp] = useState(false);

    const renderSignUp = () => {
        setShowSignUp(true);
    };

    return (
        <div className="flex h-full w-full items-center justify-center">
            {/* 이용약관 페이지 */}
            {!showSignUp && <Service renderSignUp={renderSignUp} />}
            {/* 회원가입 페이지 */}
            {showSignUp && <SignUp />}
        </div>
    );
}

export default RegisterPage;
