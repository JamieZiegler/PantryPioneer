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
            {error && (
                <p className="rounded-md border border-error-200 bg-error-50 px-3 py-2 text-sm text-error-700">
                    {error}
                </p>
            )}

            <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="rounded-md border border-border bg-surface px-3 py-2.5 text-text-main transition-colors placeholder:text-text-muted focus:border-primary"
            />
            <input
                type="password"
                placeholder="Choose a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="rounded-md border border-border bg-surface px-3 py-2.5 text-text-main transition-colors placeholder:text-text-muted focus:border-primary"
            />

            <button
                disabled={loading}
                className="mt-1 rounded-md bg-primary px-4 py-2.5 font-medium text-text-on-primary transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-50"
            >
                {loading ? "Creating account..." : "Sign up"}
            </button>
        </form>
    );
}
