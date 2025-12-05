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


    return (
        <>
            <div className="search-form">
                <div className="form-header">
                    <p>
                        In the recipe search form, you may search for recipes by entering specific 
                        ingredients you have on hand or wish to use, as well as by recipe name.
                        Additionally, you can filter results by category and cuisine/region, and exclude 
                        recipes containing ingredients you want to avoid.
                    </p>
                    <p>
                        As a logged-in user, you can also search for recipes using parts of, or your entire,
                        personal pantry. You can also save favorite recipes for quick access later.
                    </p>
                </div>
                <form id="recipe-search-form" onSubmit={handleAdvancedSubmit}>
                    
                    <label htmlFor="ingredient-name-input">Search by ingredients (separate with commas)</label>
                    <input type="text" id="ingredient-name-input" name="ingredient-name-input" placeholder="Tomato, garlic, pasta" value={includeText} onChange={(e) => setIncludeText(e.target.value)}/>
                    <label className="match-all-toggle" htmlFor="match-all-input">
                        <input type="checkbox" id="match-all-input" checked={matchAll} onChange={(e) => setMatchAll(e.target.checked)} />
                        <span>Show only recipes that match all ingredients</span>
                    </label>
                    <label htmlFor="recipe-name-input">Search by recipe name</label>
                    <input type="text" id="recipe-name-input" name="recipe-name-input" placeholder="Search for recipes..." value={query} onChange={(e) => setQuery(e.target.value)}/>
                    <label htmlFor="exclude-ingredient-input">Exclude ingredients (separate with commas)</label>
                    <input type="text" id="exclude-ingredient-input" name="exclude-ingredient-input" placeholder="Nuts, gluten" value={excludeText} onChange={(e) => setExcludeText(e.target.value)}/>
                    
                    <div className="recipe-filters">
                        <div className="category-filter">
                            <label htmlFor="category">Category</label>
                            <select id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
                                <option value="">All</option>
                                {categories.map((c) => (
                                    <option key={c} value={c}>{c}</option>
                                ))}
                            </select>
                        </div>
                        
                        <div className="area-filter">
                            <label htmlFor="area">Cuisine / Region</label>
                            <select id="area" value={area} onChange={(e) => setArea(e.target.value)}>
                                <option value="">All</option>
                                {areas.map((a) => (
                                    <option key={a} value={a}>{a}</option>
                                ))}
                            </select>
                        </div>
                        
                    </div>
                    

                    <div className="chosen-filters">
                        <strong>Selected filters:</strong>{' '}
                        {query || includeText || category || area ? (
                            <span>{`${query ? query + ' ' : ''}${includeText ? 'Ingredients: ' + includeText + ' ' : ''}${excludeText ? 'Exclude: ' + excludeText + ' ' : ''}${category ? 'Category: ' + category + ' ' : ''}${area ? 'Cuisine: ' + area + ' ' : ''}`}</span>
                        ) : (
                            <span>None</span>
                        )}
                    </div>
                    {error && <div className="error-message">{error}</div>}
                    <button type="submit" disabled={loading}>{loading ? 'Searching...' : 'Search'}</button>
                </form>
            </div>
        </>
    );
}