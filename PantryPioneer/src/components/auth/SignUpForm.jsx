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
            alert("Konto skapat! Du kan nu logga in.");
        }
        setLoading(false);
    };

    return (
        <form onSubmit={handleSignUp} className="flex flex-col gap-4">
            <h2 className="text-xl font-bold">Skapa ett nytt konto</h2>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            
            <input 
                type="email" 
                placeholder="Din e-post" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
                className="p-2 border rounded"
            />
            <input 
                type="password" 
                placeholder="Välj ett starkt lösenord" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
                className="p-2 border rounded"
            />
            
            <button disabled={loading} className="bg-green-600 text-white p-2 rounded hover:bg-green-700 disabled:opacity-50">
                {loading ? "Skapar konto..." : "Registrera dig"}
            </button>
        </form>
    );
}