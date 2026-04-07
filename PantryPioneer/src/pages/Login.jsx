import { useState } from 'react';
import LoginForm from '../components/auth/LoginForm';
import SignUpForm from '../components/auth/SignUpForm';

export default function Login() {
    const [showLogin, setShowLogin] = useState(true);

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <div className="flex border-b mb-6">
                <button 
                    className={`flex-1 py-2 font-semibold ${showLogin ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
                    onClick={() => setShowLogin(true)}
                >
                    Logga in
                </button>
                <button 
                    className={`flex-1 py-2 font-semibold ${!showLogin ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
                    onClick={() => setShowLogin(false)}
                >
                    Skapa konto
                </button>
            </div>

            {showLogin ? <LoginForm /> : <SignUpForm />}
        </div>
    );
}