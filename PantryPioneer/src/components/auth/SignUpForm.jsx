import { useState } from "react";
import { supabase } from "../../api/supabaseClient";

export default function SignUpForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSignUp = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

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
