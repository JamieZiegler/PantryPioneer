import { useState, useEffect } from "react";
import { AuthContext } from "./authContextDefinition";
import { supabase } from "../api/supabaseClient"; 

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null);
            setLoading(false);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
            setLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    const logout = async () => {
        await supabase.auth.signOut();
    };

    return (
        <AuthContext.Provider value={{ 
            user, 
            isAuthenticated: !!user,
            logout, 
            loading 
        }}>
            {/* Om loading är true, visa en text/spinner. Annars, visa appen! */}
            {loading ? <div>Laddar applikationen...</div> : children}
        </AuthContext.Provider>
    );
};