import { useContext } from "react";
import RecipeSearchForm from "../components/search/RecipeSearchForm.jsx";
import RecipeResults from "../components/search/RecipeResults.jsx";
import { SearchContext } from "../context/searchContextDefinition";

export default function SearchPage() {
    const { results, setResults, ingredients, setIngredients } =
        useContext(SearchContext);

    return (
        <div className="mx-auto w-full max-w-(--max-width) animate-[fadeInUp_0.4s_ease-out_both] px-4 py-8 sm:px-8 sm:py-12">
            <h2 className="m-0 mb-6 text-center font-display text-[clamp(2rem,4vw,3rem)] leading-tight text-text-main">
                Find Your Next Meal
            </h2>

            <RecipeSearchForm
                onResults={setResults}
                setUserIngredients={setIngredients}
            />
            <RecipeResults results={results} userIngredients={ingredients} />
        </div>
    );
}
