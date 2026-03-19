const BASE = '/themealdb/api/json/v1';

function getKey() {
    return import.meta.env.VITE_MEALDB_KEY || '1';
}

function buildUrl(path, params = {}) {
    const key = getKey();
    const base = `${BASE}/${key}/${path}`;
    const search = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
        if (v === undefined || v === null || v === '') return;
        search.set(k, String(v));
    });
    const qs = search.toString();
    return qs ? `${base}?${qs}` : base;
}

function normalizeIngredientText(value) {
    return String(value || '')
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

async function listIngredients() {
    const url = buildUrl('list.php', { i: 'list' });
    const res = await fetch(url);
    if (!res.ok) throw new Error(`TheMealDB list ingredients failed: ${res.status}`);
    const json = await res.json();
    return (json.meals || []).map((m) => m.strIngredient).filter(Boolean);
}

async function getIngredientNameCache() {
    const cache = searchRecipes._ingredientNameCache;
    if (Array.isArray(cache) && cache.length) return cache;
    try {
        const names = await listIngredients();
        searchRecipes._ingredientNameCache = names;
        return names;
    } catch {
        searchRecipes._ingredientNameCache = [];
        return [];
    }
}

async function expandIngredientCandidates(term) {
    const normalizedTerm = normalizeIngredientText(term);
    if (!normalizedTerm) return [];

    const allIngredients = await getIngredientNameCache();
    if (!allIngredients.length) return [];

    const matches = allIngredients.filter((name) => {
        const normalizedName = normalizeIngredientText(name);
        return normalizedName.includes(normalizedTerm);
    });

    return matches.slice(0, 5);
}

function parseMeal(meal) {
    if (!meal) return null;
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        const ing = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ing && ing.trim()) {
            const text = measure && measure.trim() ? `${measure.trim()} ${ing.trim()}` : ing.trim();
            ingredients.push(text);
        }
    }

    return {
        id: meal.idMeal,
        title: meal.strMeal,
        image: meal.strMealThumb || null,
        readyInMinutes: null,
        servings: null,
        cuisines: meal.strArea ? [meal.strArea] : [],
        category: meal.strCategory || null,
        ingredients,
        instructions: meal.strInstructions || null,
    };
}

async function searchRecipes(filters = {}) {
    const { query, includeIngredients, excludeIngredients, category, area, matchAll } = filters;

    const excludes = (Array.isArray(excludeIngredients) ? excludeIngredients : (excludeIngredients ? [excludeIngredients] : []))
        .map((s) => String(s).toLowerCase().trim())
        .filter(Boolean);

    if (query) {
        const url = buildUrl('search.php', { s: query });
        const res = await fetch(url);
        if (!res.ok) throw new Error(`TheMealDB search failed: ${res.status}`);
        const json = await res.json();
        const meals = json.meals || [];
        let results = meals.map(parseMeal).filter(Boolean);
        if (Array.isArray(includeIngredients) && includeIngredients.length) {
            const includesLow = includeIngredients.map((i) => String(i).toLowerCase().trim()).filter(Boolean);
            if (includesLow.length) {
                results = results.filter((meal) => {
                    const ingLow = (meal.ingredients || []).map((i) => i.toLowerCase());
                    if (matchAll) {
                        return includesLow.every((ex) => ingLow.some((ing) => ing.includes(ex)));
                    }
                    return includesLow.some((ex) => ingLow.some((ing) => ing.includes(ex)));
                });
            }
        }
        if (excludes.length) {
            results = results.filter((meal) => {
                const ingLow = (meal.ingredients || []).map((i) => i.toLowerCase());
                return !excludes.some((ex) => ingLow.some((ing) => ing.includes(ex)));
            });
        }
        return { results, totalResults: results.length };
    }

    let candidateIds = null;

    async function idsFromFilter(path, paramName, value) {
        const url = buildUrl(path, { [paramName]: value });
        const res = await fetch(url);
        if (!res.ok) throw new Error(`TheMealDB filter failed: ${res.status}`);
        const json = await res.json();
        const meals = json.meals || [];
        return new Set(meals.map((m) => m.idMeal));
    }

    async function idsFromIngredientLoose(ingredient) {
        const directSet = await idsFromFilter('filter.php', 'i', ingredient);
        if (directSet.size > 0) return directSet;

        const candidates = await expandIngredientCandidates(ingredient);
        if (!candidates.length) return directSet;

        const merged = new Set();
        for (const candidate of candidates) {
            const candidateSet = await idsFromFilter('filter.php', 'i', candidate);
            for (const id of candidateSet) merged.add(id);
        }
        return merged;
    }

    if (Array.isArray(includeIngredients) && includeIngredients.length) {
        if (matchAll) {
            for (const ing of includeIngredients) {
                const set = await idsFromIngredientLoose(ing);
                if (candidateIds === null) candidateIds = set;
                else {
                    candidateIds = new Set(Array.from(candidateIds).filter((id) => set.has(id)));
                }
            }
        } else {
            candidateIds = new Set();
            for (const ing of includeIngredients) {
                const set = await idsFromIngredientLoose(ing);
                for (const id of set) candidateIds.add(id);
            }
        }
    }

    if (category) {
        const set = await idsFromFilter('filter.php', 'c', category);
        if (candidateIds === null) candidateIds = set;
        else candidateIds = new Set(Array.from(candidateIds).filter((id) => set.has(id)));
    }

    if (area) {
        const set = await idsFromFilter('filter.php', 'a', area);
        if (candidateIds === null) candidateIds = set;
        else candidateIds = new Set(Array.from(candidateIds).filter((id) => set.has(id)));
    }

    if (!candidateIds) {
        return { results: [], totalResults: 0 };
    }

    const lookupCache = searchRecipes._lookupCache || new Map();
    searchRecipes._lookupCache = lookupCache;

    const MAX_LOOKUPS = Number(import.meta.env.VITE_MEALDB_MAX_LOOKUPS) || 30;
    const CONCURRENCY = Number(import.meta.env.VITE_MEALDB_CONCURRENCY) || 5;

    const ids = Array.from(candidateIds).slice(0, MAX_LOOKUPS);
    const results = [];

    async function fetchAndParse(id) {
        if (lookupCache.has(id)) return lookupCache.get(id);
        try {
            const url = buildUrl('lookup.php', { i: id });
            const res = await fetch(url);
            if (!res.ok) return null;
            const json = await res.json();
            const meal = (json.meals && json.meals[0]) || null;
            const parsed = parseMeal(meal);
            if (parsed) lookupCache.set(id, parsed);
            return parsed;
        } catch {
            return null;
        }
    }

    for (let i = 0; i < ids.length; i += CONCURRENCY) {
        const batch = ids.slice(i, i + CONCURRENCY);
        const batchPromises = batch.map((id) => fetchAndParse(id));
        const batchResults = await Promise.all(batchPromises);
        for (const r of batchResults) {
            if (!r) continue;
            if (excludes.length) {
                const ingLow = (r.ingredients || []).map((i) => i.toLowerCase());
                if (excludes.some((ex) => ingLow.some((ing) => ing.includes(ex)))) {
                    continue; 
                }
            }
            results.push(r);
        }
    }

    return { results, totalResults: results.length };
}

async function getRecipeInformation(id) {
    const url = buildUrl('lookup.php', { i: id });
    const res = await fetch(url);
    if (!res.ok) throw new Error(`TheMealDB lookup failed: ${res.status}`);
    const json = await res.json();
    const meal = (json.meals && json.meals[0]) || null;
    return parseMeal(meal);
}

async function listCategories() {
    const url = buildUrl('list.php', { c: 'list' });
    const res = await fetch(url);
    if (!res.ok) throw new Error(`TheMealDB list categories failed: ${res.status}`);
    const json = await res.json();
    return (json.meals || []).map((m) => m.strCategory).filter(Boolean);
}

async function listAreas() {
    const url = buildUrl('list.php', { a: 'list' });
    const res = await fetch(url);
    if (!res.ok) throw new Error(`TheMealDB list areas failed: ${res.status}`);
    const json = await res.json();
    return (json.meals || []).map((m) => m.strArea).filter(Boolean);
}

export { searchRecipes, getRecipeInformation, listCategories, listAreas };
