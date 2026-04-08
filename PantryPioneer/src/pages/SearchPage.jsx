import { useContext } from "react";
import RecipeSearchForm from "../components/search/RecipeSearchForm.jsx";
import RecipeResults from "../components/search/RecipeResults.jsx";
import { SearchContext } from "../context/searchContextDefinition";

export default function SearchPage() {
    const { results, setResults, ingredients, setIngredients } = useContext(SearchContext);

    return (
        <div className="w-full max-w-(--max-width) mx-auto px-4 sm:px-8 py-8 sm:py-12 animate-[fadeInUp_0.4s_ease-out_both]">
            
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] text-text-main text-center m-0 mb-6 leading-tight">
                Find Your Next Meal
            </h2>
            
            <RecipeSearchForm onResults={setResults} setUserIngredients={setIngredients} />
            <RecipeResults results={results} userIngredients={ingredients} />
            
        </div>
    );
}