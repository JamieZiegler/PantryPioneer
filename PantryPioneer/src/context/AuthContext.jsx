/* Provider för autentiseringsstatus och användardata. 
Läses och uppdateras av useAuth.js.*/

import { AuthContext } from "./authContextDefinition";

export const AuthProvider = ({ children }) => {
    return (
        <AuthContext.Provider value={{ user: null, isAuthenticated: false, login: () => {}, logout: () => {}, loading: false }}>
            {children}
        </AuthContext.Provider>

    );
};