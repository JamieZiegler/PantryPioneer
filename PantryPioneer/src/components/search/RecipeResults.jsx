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
        <div className="flex flex-col mt-8 w-full rounded-lg bg-surface shadow-md border border-border overflow-hidden animate-[fadeInUp_0.4s_ease-out_both]">
            <div className="bg-linear-to-br from-primary-dark to-primary text-white p-6 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                <h3 className="text-[1.75rem] text-white font-display m-0">Results</h3>
                <div className="flex items-center gap-3">
                    <label htmlFor="sort-select">
                        <select 
                            id="sort-select" 
                            value={sort} 
                            onChange={(e) => setSort(e.target.value)}
                            className="py-2 pl-3 pr-9 rounded-sm border-[1.5px] border-white/30 text-[0.85rem] font-body text-white bg-white/10 transition-colors outline-none cursor-pointer focus:border-white/60 appearance-none bg-no-repeat bg-position[right_0.75rem_center]"
                        >
                            <option value="match-desc" className="text-text-main bg-surface">Best match first ↓</option>
                            <option value="match-asc" className="text-text-main bg-surface">Least match first ↑</option>
                            <option value="alpha-asc" className="text-text-main bg-surface">A &rarr; Z</option>
                            <option value="alpha-desc" className="text-text-main bg-surface">Z &rarr; A</option>
                        </select>
                    </label>
                </div>
            </div>
            <div className="flex flex-col gap-4 p-6">
                {processed.length === 0 ? (
                    <p className="text-text-secondary m-0">No recipes found. Try adjusting your search.</p>
                ) : (
                    processed.map((r) => (
                        <RecipeCard key={r.id} recipe={r} />
                    ))
                )}
            </div>
        </div>
    );
}