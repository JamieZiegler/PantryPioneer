import { useState } from "react";
import { supabase } from "../../api/supabaseClient";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError("Could not log in. Please check your email and password.");
            console.error(error.message);
        } else {
            navigate("/");
        }
        setLoading(false);
    };

    return (
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <h2 className="text-left font-display text-3xl text-text-main">
                Welcome back
            </h2>
            <p className="-mt-2 text-sm text-text-secondary">
                Log in to manage your pantry and favorites.
            </p>
            {error && (
                <p className="rounded-md border border-error-200 bg-error-50 px-3 py-2 text-sm text-error-700">
                    {error}
                </p>
            )}

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="rounded-md border border-border bg-surface px-3 py-2.5 text-text-main transition-colors placeholder:text-text-muted focus:border-primary"
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="rounded-md border border-border bg-surface px-3 py-2.5 text-text-main transition-colors placeholder:text-text-muted focus:border-primary"
            />

            <button
                disabled={loading}
                className="mt-1 rounded-md bg-primary px-4 py-2.5 font-medium text-text-on-primary transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-50"
            >
                {loading ? "Logging in..." : "Log in"}
            </button>
        </form>
    );
}
