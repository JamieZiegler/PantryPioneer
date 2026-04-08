import { useState, useEffect } from "react";
import { searchRecipes, listCategories, listAreas } from "../../api/themealdb.js";

export default function RecipeSearchForm({ onResults = () => {}, setUserIngredients = () => {} }) {
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

    async function handleAdvancedSubmit(e) {
        e.preventDefault();
        setError("");
        const includeArray = includeText
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean);
        const excludeArray = excludeText
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean);
        
        if (!query && includeArray.length === 0 && !category && !area) {
            setError('Input a search term or ingredient.');
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
            console.error('Search failed', err);
            setError('Search failed. Check the console for details.');
            onResults([]);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        let cancelled = false;
        async function loadLists() {
            try {
                const [cats, ars] = await Promise.all([listCategories(), listAreas()]);
                if (cancelled) return;
                if (Array.isArray(cats)) setCategories(cats);
                if (Array.isArray(ars)) setAreas(ars);
            } catch (err) {
                console.warn('Failed to load categories/areas', err);
            }
        }
        loadLists();
        return () => { cancelled = true; };
    }, []);

    const labelClass = "text-[0.9rem] font-semibold text-text-main mb-1.5 mt-3 tracking-[0.01em] uppercase font-body";
    const inputClass = "w-full px-4 py-3 border-[1.5px] border-border rounded-sm text-[0.95rem] font-body text-text-main bg-surface mb-1 transition-all hover:border-primary-light focus:outline-none focus:border-primary focus:ring-[3px] focus:ring-primary/15 placeholder:text-text-muted";
    const selectClass = `${inputClass} appearance-none cursor-pointer bg-no-repeat bg-[right_1rem_center]`;
    const btnClass = "inline-flex items-center justify-center gap-2 px-8 py-3 text-[0.95rem] font-body font-semibold bg-primary text-text-on-primary border-none rounded-sm cursor-pointer transition-all w-fit mt-4 tracking-[0.02em] hover:bg-primary-dark hover:-translate-y-[1px] hover:shadow-md active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed";

    return (
        <>
            <div className="flex flex-col rounded-lg bg-surface shadow-md border border-border overflow-hidden animate-[fadeInUp_0.4s_ease-out_both]">
                <div className="bg-linear-to-br from-primary-dark to-primary text-text-on-primary p-6 flex flex-col gap-3">
                    <p className="text-text-on-primary/85 text-[0.9rem] leading-relaxed m-0">
                        Search by ingredients, recipe name, category, or cuisine. Exclude ingredients you want to avoid and find the perfect match.
                    </p>
                </div>
                
                <form onSubmit={handleAdvancedSubmit} className="p-6 pb-8 flex flex-col gap-1 text-left">
                    
                    <label htmlFor="ingredient-name-input" className={labelClass}>
                        Ingredients
                    </label>
                    <input type="text" id="ingredient-name-input" className={inputClass} placeholder="e.g. tomato, garlic, pasta" value={includeText} onChange={(e) => setIncludeText(e.target.value)}/>
                    
                    <label className="flex items-center gap-2 text-[0.9rem] font-body text-text-secondary cursor-pointer py-1" htmlFor="match-all-input">
                        <input 
                            type="checkbox" 
                            id="match-all-input" 
                            className="w-4.5 h-4.5 accent-primary cursor-pointer" 
                            checked={matchAll} onChange={(e) => setMatchAll(e.target.checked)} 
                        />
                        <span>Only show recipes matching all ingredients</span>
                    </label>
                    
                    <label htmlFor="recipe-name-input" className={labelClass}>Recipe Name</label>
                    <input 
                        type="text" 
                        id="recipe-name-input" 
                        className={inputClass} 
                        placeholder="Search by name..." 
                        value={query} 
                        onChange={(e) => setQuery(e.target.value)} 
                    />
                    
                    <label htmlFor="exclude-ingredient-input" className={labelClass}>Exclude Ingredients</label>
                    <input 
                        type="text" 
                        id="exclude-ingredient-input" 
                        className={inputClass} 
                        placeholder="e.g. nuts, gluten" 
                        value={excludeText} 
                        onChange={(e) => setExcludeText(e.target.value)} 
                    />
                    
                    <div className="flex flex-col sm:flex-row gap-4 mt-2">
                        <div className="flex flex-col flex-1">
                            <label htmlFor="category" className={labelClass}>Category</label>
                            <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} className={selectClass}>
                                <option value="">All</option>
                                {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                        <div className="flex flex-col flex-1">
                            <label htmlFor="area" className={labelClass}>Cuisine / Region</label>
                            <select id="area" value={area} onChange={(e) => setArea(e.target.value)} className={selectClass}>
                                <option value="">All</option>
                                {areas.map((a) => <option key={a} value={a}>{a}</option>)}
                            </select>
                        </div>
                    </div>
                    <div className="p-3 px-4 bg-primary-subtle rounded-sm text-[0.9rem] text-text-secondary mt-3">
                        <strong className="text-text-main">Selected filters:</strong>{' '}
                        {query || includeText || category || area ? (
                            <span>{`${query ? query + ' ' : ''}${includeText ? 'Ingredients: ' + includeText + ' ' : ''}${excludeText ? 'Exclude: ' + excludeText + ' ' : ''}${category ? 'Category: ' + category + ' ' : ''}${area ? 'Cuisine: ' + area + ' ' : ''}`}</span>
                        ) : (
                            <span>None</span>
                        )}
                    </div>
                    {error && <div className="p-3 px-4 bg-error-50 text-error-700 rounded-sm text-[0.9rem] border border-error-200 mt-2">{error}</div>}
                    <button type="submit" className={btnClass} disabled={loading}>
                        {loading ? 'Searching...' : 'Search'}
                    </button>
                </form>
            </div>
        </>
    );
}