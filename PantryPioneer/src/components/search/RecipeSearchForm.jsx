import { useState, useEffect, useContext } from "react";
import { PantryContext } from "../../context/pantryContextDefinition";
import {
    searchRecipes,
    listCategories,
    listAreas,
} from "../../api/themealdb.js";

export default function RecipeSearchForm({
    onResults = () => {},
    setUserIngredients = () => {},
}) {
    const [query, setQuery] = useState("");
    const [includeText, setIncludeText] = useState("");
    const [category, setCategory] = useState("");
    const [area, setArea] = useState("");
    const [categories, setCategories] = useState([]);
    const [areas, setAreas] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [excludeText, setExcludeText] = useState("");
    const [matchAll, setMatchAll] = useState(false);
    const { pantryItems = [] } = useContext(PantryContext);

    function handleUsePantry() {
        const pantryNames = pantryItems
            .map((item) =>
                typeof item === "string" ? item : (item?.name ?? ""),
            )
            .map((name) => name.trim())
            .filter(Boolean);

        if (!pantryNames.length) {
            setError("No pantry items found. Add items in Pantry first.");
            return;
        }

        setIncludeText((current) => {
            const currentItems = current
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean);

            const merged = Array.from(
                new Set([...currentItems, ...pantryNames]),
            );
            return merged.join(", ");
        });

        setError("");
    }

    async function handleAdvancedSubmit(e) {
        e.preventDefault();
        setError("");
        const includeArray = includeText
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean);
        const excludeArray = excludeText
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean);

        if (!query && includeArray.length === 0 && !category && !area) {
            setError("Input a search term or ingredient.");
            onResults([]);
            setUserIngredients([]);
            return;
        }

        setUserIngredients(includeArray);

        const filters = {
            query: query || undefined,
            includeIngredients: includeArray.length ? includeArray : undefined,
            excludeIngredients: excludeArray.length ? excludeArray : undefined,
            matchAll: matchAll ? true : undefined,
            category: category || undefined,
            area: area || undefined,
        };

        setLoading(true);
        try {
            const res = await searchRecipes(filters);
            onResults(res.results || []);
        } catch (err) {
            console.error("Search failed", err);
            setError("Search failed. Check the console for details.");
            onResults([]);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        let cancelled = false;
        async function loadLists() {
            try {
                const [cats, ars] = await Promise.all([
                    listCategories(),
                    listAreas(),
                ]);
                if (cancelled) return;
                if (Array.isArray(cats)) setCategories(cats);
                if (Array.isArray(ars)) setAreas(ars);
            } catch (err) {
                console.warn("Failed to load categories/areas", err);
            }
        }
        loadLists();
        return () => {
            cancelled = true;
        };
    }, []);

    const labelClass =
        "text-[0.9rem] font-semibold text-text-main mb-1.5 mt-3 tracking-[0.01em] uppercase font-body";
    const inputClass =
        "w-full px-4 py-3 border-[1.5px] border-border rounded-sm text-[0.95rem] font-body text-text-main bg-surface mb-1 transition-all hover:border-primary-light focus:outline-none focus:border-primary focus:ring-[3px] focus:ring-primary/15 placeholder:text-text-muted";
    const selectClass = `${inputClass} appearance-none cursor-pointer bg-no-repeat bg-[right_1rem_center]`;
    const btnClass =
        "inline-flex items-center justify-center gap-2 px-8 py-3 text-[0.95rem] font-body font-semibold bg-primary text-text-on-primary border-none rounded-sm cursor-pointer transition-all w-fit mt-4 tracking-[0.02em] hover:bg-primary-dark hover:-translate-y-[1px] hover:shadow-md active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed";

    return (
        <>
            <div className="flex w-full animate-[fadeInUp_0.4s_ease-out_both] flex-col overflow-hidden rounded-lg border border-border bg-surface shadow-md">
                <div className="flex flex-col gap-3 bg-linear-to-br from-primary-dark to-primary p-6 text-text-on-primary">
                    <p className="m-0 text-[0.9rem] leading-relaxed text-text-on-primary">
                        Search by ingredients, recipe name, category, or
                        cuisine. Exclude ingredients you want to avoid and find
                        the perfect match.
                    </p>
                </div>

                <form
                    onSubmit={handleAdvancedSubmit}
                    className="flex flex-col gap-1 p-6 pb-8 text-left"
                >
                    <label
                        htmlFor="ingredient-name-input"
                        className={labelClass}
                    >
                        Ingredients
                    </label>
                    <p className="mb-4 text-sm text-text-secondary">
                        Add as many ingredients as you like, separated by
                        commas. Use the button to quickly add all saved items
                        from your pantry.
                    </p>
                    <input
                        type="text"
                        id="ingredient-name-input"
                        className={inputClass}
                        placeholder="e.g. tomato, garlic, pasta"
                        value={includeText}
                        onChange={(e) => setIncludeText(e.target.value)}
                    />
                    <button
                        type="button"
                        onClick={handleUsePantry}
                        disabled={loading || pantryItems.length === 0}
                        className="inline-flex w-fit items-center justify-center rounded-sm border border-primary bg-surface px-4 py-2 text-[0.9rem] font-semibold text-primary transition-all hover:-translate-y-px hover:bg-primary-subtle disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        Use pantry items
                    </button>
                    <label
                        className="flex cursor-pointer items-center gap-2 py-1 font-body text-[0.9rem] text-text-secondary"
                        htmlFor="match-all-input"
                    >
                        <input
                            type="checkbox"
                            id="match-all-input"
                            className="h-4.5 w-4.5 cursor-pointer accent-primary"
                            checked={matchAll}
                            onChange={(e) => setMatchAll(e.target.checked)}
                        />
                        <span>Only show recipes matching all ingredients</span>
                    </label>
                    <label htmlFor="recipe-name-input" className={labelClass}>
                        Recipe Name
                    </label>
                    <input
                        type="text"
                        id="recipe-name-input"
                        className={inputClass}
                        placeholder="Search by name..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <label
                        htmlFor="exclude-ingredient-input"
                        className={labelClass}
                    >
                        Exclude Ingredients
                    </label>
                    <input
                        type="text"
                        id="exclude-ingredient-input"
                        className={inputClass}
                        placeholder="e.g. nuts, gluten"
                        value={excludeText}
                        onChange={(e) => setExcludeText(e.target.value)}
                    />
                    <div className="mt-2 flex flex-col gap-4 sm:flex-row">
                        <div className="flex flex-1 flex-col">
                            <label htmlFor="category" className={labelClass}>
                                Category
                            </label>
                            <select
                                id="category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className={selectClass}
                            >
                                <option value="">All</option>
                                {categories.map((c) => (
                                    <option key={c} value={c}>
                                        {c}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex flex-1 flex-col">
                            <label htmlFor="area" className={labelClass}>
                                Cuisine / Region
                            </label>
                            <select
                                id="area"
                                value={area}
                                onChange={(e) => setArea(e.target.value)}
                                className={selectClass}
                            >
                                <option value="">All</option>
                                {areas.map((a) => (
                                    <option key={a} value={a}>
                                        {a}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="mt-3 rounded-sm bg-primary-subtle p-3 px-4 text-[0.9rem] text-text-secondary">
                        <strong className="text-text-main">
                            Selected filters:
                        </strong>{" "}
                        {query || includeText || category || area ? (
                            <span>{`${query ? query + " " : ""}${includeText ? "Ingredients: " + includeText + " " : ""}${excludeText ? "Exclude: " + excludeText + " " : ""}${category ? "Category: " + category + " " : ""}${area ? "Cuisine: " + area + " " : ""}`}</span>
                        ) : (
                            <span>None</span>
                        )}
                    </div>
                    {error && (
                        <div className="mt-2 rounded-sm border border-error-200 bg-error-50 p-3 px-4 text-[0.9rem] text-error-700">
                            {error}
                        </div>
                    )}
                    <button
                        type="submit"
                        className={btnClass}
                        disabled={loading}
                    >
                        {loading ? "Searching..." : "Search"}
                    </button>
                </form>
            </div>
        </>
    );
}
