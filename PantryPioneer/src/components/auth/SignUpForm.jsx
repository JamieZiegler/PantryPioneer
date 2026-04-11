import { useState } from "react";
import { supabase } from "../../api/supabaseClient";

export default function SignUpForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [accessCode, setAccessCode] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSignUp = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (accessCode !== import.meta.env.VITE_SIGNUP_CODE) {
            setError("Invalid access code. Please contact your instructor.");
            setLoading(false);
            return;
        }

        const { error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) {
            setError(error.message);
        } else {
            alert("Account created! You can now log in.");
        }
        setLoading(false);
    };

    return (
        <form onSubmit={handleSignUp} className="flex flex-col gap-4">
            <h2 className="text-left font-display text-3xl text-text-main">
                Create your account
            </h2>
            <p className="-mt-2 text-sm text-text-secondary">
                Save favorites and personalize recipe suggestions.
            </p>
            {error && <p className="form-error">{error}</p>}
            <div className="rounded-md border border-error-200 bg-error-50 p-4 pt-2">
                <p className="border-error-300 text-md mb-3 border-b-3 pb-0.5 text-center font-semibold text-error-700">
                    Please note!
                </p>
                <p className="text-error-800 text-sm">
                    As this is a school project, there is no ordinary
                    verification process. Anyone with the access code can create
                    an account, so please keep it confidential.
                </p>
            </div>
            <label className="sr-only" htmlFor="signup-email">
                Email
            </label>
            <input
                id="signup-email"
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="form-input-sm"
            />
            <label className="sr-only" htmlFor="signup-password">
                Password
            </label>
            <input
                id="signup-password"
                type="password"
                placeholder="Choose a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="new-password"
                className="form-input-sm"
            />

            <label className="sr-only" htmlFor="signup-code">
                Access Code
            </label>
            <input
                id="signup-code"
                type="password"
                placeholder="Enter your access code"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                required
                className="form-input-sm"
            />

            <button
                type="submit"
                disabled={loading}
                className="btn-primary mt-1"
            >
                {loading ? "Creating account..." : "Sign up"}
            </button>
        </form>
    );
}
