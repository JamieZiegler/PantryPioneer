import Placeholder from "../../assets/images/placeholder.png";
import { Link } from "react-router-dom";
import FavoriteButton from "../recipe/FavoriteButton.jsx";

export default function RecipeCard({ recipe = {}, showMatchInfo = true }) {
    const { id, title, image, ingredients = [], matchCount = 0 } = recipe;

    return (
        <div className="group flex min-h-45 w-full cursor-pointer flex-col gap-5 rounded-md border border-border bg-surface p-3 transition-all duration-200 focus-within:-translate-y-0.5 focus-within:border-primary-light focus-within:shadow-md hover:-translate-y-0.5 hover:border-primary-light hover:shadow-md sm:flex-row">
            <img
                className="h-45 w-full shrink-0 rounded-sm object-cover sm:h-full sm:w-50"
                src={image || Placeholder}
                alt={title || "Recipe"}
                width="200"
                height="200"
                loading="lazy"
                decoding="async"
                fetchPriority="low"
            />

            <div className="flex w-full flex-1 flex-col justify-between gap-4 py-2 sm:pr-2 lg:flex-row">
                <div className="flex flex-col gap-1 text-left lg:flex-1">
                    <h4 className="m-0 font-display text-[1.1rem] leading-tight text-text-main sm:text-[1.2rem]">
                        {title || "Recipe name"}
                    </h4>
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
                    {id ? <FavoriteButton recipeId={id} /> : null}
                    {id ? (
                        <Link
                            to={`/recipe/${id}`}
                            className="inline-flex items-center gap-2 rounded-full border border-primary bg-primary px-4 py-2 text-sm font-semibold whitespace-nowrap text-white no-underline transition-all duration-200 hover:-translate-y-0.5 hover:border-primary-dark hover:bg-primary-dark hover:text-white"
                        >
                            View Recipe
                        </Link>
                    ) : (
                        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm font-semibold whitespace-nowrap text-text-muted">
                            View Recipe
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}
