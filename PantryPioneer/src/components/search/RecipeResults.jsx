import { useState, useMemo } from "react";
import RecipeCard from "./RecipeCard.jsx";

export default function RecipeResults({ results = [], userIngredients = [] }) {
    const [sort, setSort] = useState("match-desc");

    const processed = useMemo(() => {
        const userSet = new Set((userIngredients || []).map((s) => s.toLowerCase()));

        const withMatch = (results || []).map((r) => {
            const recipeIngs = (r.ingredients || []).map((s) => s.toLowerCase());
            let matchCount = 0;
            userSet.forEach((u) => {
                if (recipeIngs.some((ing) => ing.includes(u))) matchCount += 1;
            });
            return { ...r, matchCount };
        });

        const sorted = withMatch.slice();
        switch (sort) {
            case "match-desc":
                sorted.sort((a, b) => b.matchCount - a.matchCount);
                break;
            case "match-asc":
                sorted.sort((a, b) => a.matchCount - b.matchCount);
                break;
            case "alpha-asc":
                sorted.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case "alpha-desc":
                sorted.sort((a, b) => b.title.localeCompare(a.title));
                break;
            default:
                break;
        }
        return sorted;
    }, [results, userIngredients, sort]);

    return (
        <>
            <div className="recipe-results">
                <div className="results-header">
                    <h3>Results:</h3>
                    <div className="sort-controls">
                        <label htmlFor="sort-select">
                            <select id="sort-select" value={sort} onChange={(e) => setSort(e.target.value)}>
                                <option value="match-desc">Matching ingredients (most first)</option>
                                <option value="match-asc">Matching ingredients (least first)</option>
                                <option value="alpha-asc">A → Z</option>
                                <option value="alpha-desc">Z → A</option>
                            </select>
                        </label>
                    </div>
                </div>
                <div className="recipe-cards">
                    {processed.length === 0 ? (
                        <p>No recipes found. Try a different search term.</p>
                    ) : (
                        processed.map((r) => (
                            <RecipeCard key={r.id} recipe={r} />
                        ))
                    )}
                </div>
                
            </div>
        </>
    );
}