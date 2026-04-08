import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import RecipeCard from "../components/search/RecipeCard.jsx";
import LoadingSpinner from "../components/common/LoadingSpinner.jsx";
import { useAuth } from "../components/hooks/useAuth.js";
import { getFavoriteRecipes } from "../api/favorites.js";

export default function Favorites() {
    const { user } = useAuth();
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredRecipes = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();
        if (!query) {
            return recipes;
        }

        return recipes.filter((recipe) => {
            const title = (recipe.title || "").toLowerCase();
            const category = (recipe.category || "").toLowerCase();
            const cuisines = (recipe.cuisines || []).join(" ").toLowerCase();
            const ingredients = (recipe.ingredients || [])
                .join(" ")
                .toLowerCase();

            return (
                title.includes(query) ||
                category.includes(query) ||
                cuisines.includes(query) ||
                ingredients.includes(query)
            );
        });
    }, [recipes, searchQuery]);

    useEffect(() => {
        let cancelled = false;
        async function loadFavorites() {
            if (!user?.id) {
                setRecipes([]);
                setLoading(false);
                return;
            }
            setLoading(true);
            setError("");

            try {
                const favoriteRecipes = await getFavoriteRecipes(user.id);
                if (!cancelled) {
                    setRecipes(favoriteRecipes);
                }
            } catch (fetchError) {
                console.error("Failed to load favorites", fetchError);
                if (!cancelled) {
                    setError("Could not load your favorites right now.");
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        }

        loadFavorites();

        return () => {
            cancelled = true;
        };
    }, [user]);

    return (
        <div className="mx-auto w-full max-w-(--max-width) animate-[fadeInUp_0.4s_ease-out_both] px-4 py-8 sm:px-8 sm:py-12">
            <h2 className="m-0 mb-6 text-center font-display text-[clamp(2rem,4vw,3rem)] leading-tight text-text-main">
                My Favorites
            </h2>

            {!user ? (
                <div className="flex flex-col items-center gap-4 rounded-lg border border-border bg-surface p-8 text-center shadow-md">
                    <p className="max-w-105 text-text-secondary">
                        Log in to see the recipes you have saved as favorites.
                    </p>
                    <Link
                        to="/login"
                        className="inline-flex items-center justify-center rounded-full border border-primary bg-primary px-6 py-2 text-sm font-semibold text-text-on-primary transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary-dark"
                    >
                        Go to Login
                    </Link>
                </div>
            ) : loading ? (
                <LoadingSpinner message="Loading your favorites..." />
            ) : error ? (
                <div className="rounded-lg border border-error-200 bg-error-50 p-6 text-center text-error-700 shadow-sm">
                    {error}
                </div>
            ) : recipes.length === 0 ? (
                <div className="flex flex-col items-center gap-4 rounded-lg border border-border bg-surface p-8 text-center shadow-md">
                    <p className="max-w-105 text-text-secondary">
                        You have not saved any favorite recipes yet.
                    </p>
                    <Link
                        to="/search"
                        className="inline-flex items-center justify-center rounded-full border border-primary bg-primary px-6 py-2 text-sm font-semibold text-text-on-primary transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary-dark"
                    >
                        Find Recipes
                    </Link>
                </div>
            ) : (
                <>
                    <div className="mb-4 rounded-lg border border-border bg-surface p-4 shadow-sm">
                        <label htmlFor="favorites-search" className="sr-only">
                            Search favorites
                        </label>
                        <input
                            id="favorites-search"
                            type="search"
                            value={searchQuery}
                            onChange={(event) =>
                                setSearchQuery(event.target.value)
                            }
                            placeholder="Search favorites by title, cuisine, category, or ingredient"
                            className="w-full rounded-sm border-[1.5px] border-border bg-surface px-4 py-3 text-[0.95rem] text-text-main transition-[border-color,box-shadow] duration-200 outline-none placeholder:text-text-muted hover:border-primary-light focus:border-primary focus:ring-[3px] focus:ring-primary/15"
                        />
                    </div>

                    {filteredRecipes.length === 0 ? (
                        <div className="rounded-lg border border-border bg-surface p-6 text-center text-text-secondary shadow-sm">
                            No favorites matched your search.
                        </div>
                    ) : (
                        <div className="flex flex-col gap-4">
                            {filteredRecipes.map((recipe) => (
                                <RecipeCard
                                    key={recipe.id}
                                    recipe={recipe}
                                    showMatchInfo={false}
                                />
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
