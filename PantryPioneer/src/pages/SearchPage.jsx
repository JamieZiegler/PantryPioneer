// Receptsökaren
import { useContext } from "react";
import RecipeSearchForm from "../components/search/RecipeSearchForm.jsx";
import RecipeResults from "../components/search/RecipeResults.jsx";
import { SearchContext } from "../context/searchContextDefinition";

export default function SearchPage() {
    const { results, setResults, ingredients, setIngredients } = useContext(SearchContext);

    return (
        <>
            <div className="search-page">
                <h2>Search Recipe</h2>
                <div className="search-introduction">

                </div>
                <RecipeSearchForm onResults={setResults} setUserIngredients={setIngredients} />
                <RecipeResults results={results} userIngredients={ingredients} />
            </div>
        </>
    );
}