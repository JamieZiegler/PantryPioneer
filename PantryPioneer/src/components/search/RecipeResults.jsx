import { useState, useMemo } from "react";
import RecipeCard from "./RecipeCard.jsx";

export default function RecipeResults({ results = [], userIngredients = [] }) {
    const [sort, setSort] = useState("match-desc");

    const processed = useMemo(() => {
        const userSet = new Set(
            (userIngredients || []).map((s) => s.toLowerCase()),
        );

        const withMatch = (results || []).map((r) => {
            const recipeIngs = (r.ingredients || []).map((s) =>
                s.toLowerCase(),
            );
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
        <div className="mt-8 flex w-full animate-[fadeInUp_0.4s_ease-out_both] flex-col overflow-hidden rounded-lg border border-border bg-surface shadow-md">
            <div className="flex flex-col justify-between gap-3 bg-linear-to-br from-primary-dark to-primary p-6 text-white sm:flex-row sm:items-center">
                <h3 className="m-0 font-display text-[1.75rem] text-white">
                    Results
                </h3>
                <div className="flex items-center gap-3">
                    <label htmlFor="sort-select">
                        <select
                            id="sort-select"
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                            className="bg-position[right_0.75rem_center] cursor-pointer appearance-none rounded-sm border-[1.5px] border-white/30 bg-white/10 bg-no-repeat py-2 pr-9 pl-3 font-body text-[0.85rem] text-white transition-colors outline-none focus:border-white/60"
                        >
                            <option
                                value="match-desc"
                                className="bg-surface text-text-main"
                            >
                                Best match first ↓
                            </option>
                            <option
                                value="match-asc"
                                className="bg-surface text-text-main"
                            >
                                Least match first ↑
                            </option>
                            <option
                                value="alpha-asc"
                                className="bg-surface text-text-main"
                            >
                                A &rarr; Z
                            </option>
                            <option
                                value="alpha-desc"
                                className="bg-surface text-text-main"
                            >
                                Z &rarr; A
                            </option>
                        </select>
                    </label>
                </div>
            </div>
            <div className="flex flex-col gap-4 p-6">
                {processed.length === 0 ? (
                    <p className="m-0 text-text-secondary">
                        No recipes found. Try adjusting your search.
                    </p>
                ) : (
                    processed.map((r) => <RecipeCard key={r.id} recipe={r} />)
                )}
            </div>
        </div>
    );
}
