// Provider för sökstatus och sökresultat.

import { useState } from 'react';
import { SearchContext } from "./searchContextDefinition";

export const SearchProvider = ({ children }) => {
    const [ingredients, setIngredients] = useState([]);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const searchRecipes = async () => {
        console.log("Simulerar sökning med ingredienser:", ingredients);
        setLoading(true);
        setTimeout(() => {
            setResults([{ id: 1, title: "Låtsasrecept 1" }]); 
            setLoading(false);
        }, 500);
    };

    return (
        <SearchContext.Provider value={{ ingredients, results, setIngredients, searchRecipes, loading }}>
            {children}
        </SearchContext.Provider>
    );
};