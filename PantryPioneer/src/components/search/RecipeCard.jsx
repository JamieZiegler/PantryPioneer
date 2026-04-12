import Placeholder from "../../assets/images/placeholder.webp";
import { ChevronRight } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import FavoriteButton from "../recipe/FavoriteButton.jsx";

export default function RecipeCard({ recipe = {}, showMatchInfo = true }) {
    const { id, title, ingredients = [], matchCount = 0 } = recipe;
    const location = useLocation();
    const navigate = useNavigate();

    const cleanImageUrl = recipe.image
        ? recipe.image.replace(/^https?:\/\//, "")
        : "";

    const optimizedImage = recipe.image
        ? `https://wsrv.nl/?url=${encodeURIComponent(cleanImageUrl)}&w=200&h=200&fit=cover&q=45&output=webp`
        : Placeholder;

    const navigateToRecipe = () => {
        if (!id) {
            return;
        }
        navigate(`/recipe/${id}`, {
            state: {
                from: `${location.pathname}${location.search}${location.hash}`,
            },
        });
    };

    const handleCardClick = (event) => {
        if (!id) {
            return;
        }
        if (event.target.closest("[data-no-card-nav]")) {
            return;
        }
        navigateToRecipe();
    };

    const handleCardKeyDown = (event) => {
        if (!id || event.target.closest("[data-no-card-nav]")) {
            return;
        }
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            navigateToRecipe();
        }
    };

    return (
        <div
            className={`group flex min-h-45 w-full flex-col gap-5 rounded-md border border-border bg-surface p-3 transition-all duration-200 focus-within:-translate-y-0.5 focus-within:border-primary-light focus-within:shadow-md hover:-translate-y-0.5 hover:border-primary-light hover:shadow-md sm:flex-row ${
                id ? "cursor-pointer" : "cursor-default"
            }`}
            role={id ? "link" : undefined}
            tabIndex={id ? 0 : -1}
            onClick={handleCardClick}
            onKeyDown={handleCardKeyDown}
            aria-label={id ? `Open recipe: ${title || "Recipe"}` : undefined}
        >
            <img
                className="h-45 w-full shrink-0 rounded-sm object-cover sm:h-full sm:w-50"
                src={optimizedImage}
                alt={title || "Recipe"}
                width="200"
                height="200"
                loading="lazy"
                decoding="async"
                fetchPriority="low"
            />

            <div className="flex w-full flex-1 flex-col justify-between gap-4 py-2 sm:pr-2 lg:flex-row">
                <div className="flex flex-col gap-1 text-left lg:flex-1">
                    <h3 className="m-0 font-display text-[1.1rem] leading-tight text-text-main sm:text-[1.2rem]">
                        {title || "Recipe name"}
                    </h3>
                    {showMatchInfo ? (
                        <p className="m-0 text-[0.9rem] font-semibold text-primary-light">
                            {matchCount} of {ingredients.length} ingredients
                            matched
                        </p>
                    ) : null}
                </div>

                <div className="flex flex-row justify-start gap-3 text-[0.9rem] whitespace-nowrap text-text-secondary sm:gap-4 lg:flex-1 lg:items-end lg:justify-center">
                    <p className="m-0">
                        <strong>Cuisine:</strong>{" "}
                        {recipe.cuisines?.length
                            ? recipe.cuisines.join(", ")
                            : "Unknown"}
                    </p>
                    <p className="m-0">
                        <strong>Category:</strong>{" "}
                        {recipe.category || "Unknown"}
                    </p>
                </div>

                <div className="mt-auto flex shrink-0 flex-col items-center justify-center gap-3 sm:flex-row lg:mt-0 lg:flex-1 lg:justify-end">
                    {id ? (
                        <div data-no-card-nav>
                            <FavoriteButton recipeId={id} />
                        </div>
                    ) : null}
                    <p className="m-0 inline-flex items-center gap-2 text-sm font-semibold whitespace-nowrap text-primary-dark transition-colors duration-200 group-focus-within:text-primary group-hover:text-primary">
                        {id ? "Open recipe" : "Recipe unavailable"}
                        <ChevronRight
                            aria-hidden="true"
                            size={20}
                            strokeWidth={2.5}
                            className="transition-transform duration-200 group-focus-within:translate-x-1 group-hover:translate-x-1"
                        />
                    </p>
                </div>
            </div>
        </div>
    );
}
