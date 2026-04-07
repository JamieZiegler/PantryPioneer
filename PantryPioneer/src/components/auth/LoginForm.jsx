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
            setError("Kunde inte logga in. Kontrollera e-post och lösenord.");
            console.error(error.message);
        } else {
            navigate("/"); 
        }
        setLoading(false);
    };

    return (
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <h2 className="text-xl font-bold">Välkommen tillbaka</h2>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            
            <input 
                type="email" 
                placeholder="E-post" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
                autoComplete="email"
                className="p-2 border rounded"
            />
            <input 
                type="password" 
                placeholder="Lösenord" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
                autoComplete="current-password"
                className="p-2 border rounded"
            />
            
            <button disabled={loading} className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:opacity-50">
                {loading ? "Loggar in..." : "Logga in"}
            </button>
        </form>
    );
}