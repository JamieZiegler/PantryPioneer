import { createContext } from "react";

export const SearchContext = createContext({
    ingredients: [],
    results: [],
    setIngredients: () => {},
    searchRecipes: () => {},
    loading: false,
});
