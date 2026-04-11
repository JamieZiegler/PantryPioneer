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
            {error && <p className="form-error">{error}</p>}

            <label className="sr-only" htmlFor="login-email">
                Email
            </label>
            <input
                id="login-email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="form-input-sm"
            />
            <label className="sr-only" htmlFor="login-password">
                Password
            </label>
            <input
                id="login-password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="form-input-sm"
            />

            <button type="submit" disabled={loading} className="btn-primary mt-1">
                {loading ? "Logging in..." : "Log in"}
            </button>
        </form>
    );
}
