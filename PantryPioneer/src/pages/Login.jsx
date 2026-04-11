import { useState } from "react";
import LoginForm from "../components/auth/LoginForm";
import SignUpForm from "../components/auth/SignUpForm";

export default function Login() {
    const [showLogin, setShowLogin] = useState(true);

    return (
        <section className="w-full px-4 py-10 sm:px-6 sm:py-14">
            <div className="mx-auto w-full max-w-md rounded-xl border border-border bg-surface-raised p-6 shadow-md sm:p-8">
                <div className="mb-6 flex border-b border-border">
                    <button
                        className={`flex-1 border-b-2 py-2.5 font-body text-sm font-semibold tracking-[0.02em] transition-colors ${showLogin ? "border-primary text-primary-dark/85" : "text-text-primary border-transparent hover:text-primary-dark"}`}
                        onClick={() => setShowLogin(true)}
                    >
                        Log in
                    </button>
                    <button
                        className={`flex-1 border-b-2 py-2.5 font-body text-sm font-semibold tracking-[0.02em] transition-colors ${!showLogin ? "border-primary text-primary-dark/85" : "text-text-primary border-transparent hover:text-primary-dark"}`}
                        onClick={() => setShowLogin(false)}
                    >
                        Create Account
                    </button>
                </div>

                {showLogin ? <LoginForm /> : <SignUpForm />}
            </div>
        </section>
    );
}
