import { useContext} from 'react';
import { AuthContext } from '../../context/authContextDefinition.js';

export const useAuth = () => {
    return useContext(AuthContext);
}