import Placeholder from "../../assets/images/placeholder.png";
import { Link } from "react-router-dom";
import FavoriteButton from "../recipe/FavoriteButton.jsx";

export default function RecipeCard({ recipe = {}, showMatchInfo = true }) {
    const {
        id,
        title,
        image,
        ingredients = [],
        matchCount = 0,
    } = recipe;

    return (
        <div className="flex flex-col sm:flex-row w-full min-h-45 gap-5 p-3 rounded-md bg-surface border border-border transition-all duration-200 cursor-pointer hover:-translate-y-0.5 hover:shadow-md hover:border-primary-light focus-within:-translate-y-0.5 focus-within:shadow-md focus-within:border-primary-light group">            
            <img 
                className="h-45 sm:h-full w-full sm:w-50 shrink-0 rounded-sm object-cover" 
                src={image || Placeholder} 
                alt={title || 'Recipe'} 
            />
            
            <div className="flex flex-col lg:flex-row justify-between w-full flex-1 gap-4 py-2 sm:pr-2">
                
                <div className="flex flex-col text-left gap-1 lg:flex-1">
                    <h4 className="text-text-main text-[1.1rem] sm:text-[1.2rem] m-0 font-display leading-tight">
                        {title || 'Recipe name'}
                    </h4>
                    {showMatchInfo ? (
                        <p className="font-semibold text-primary-light text-[0.9rem] m-0">
                            {matchCount} of {ingredients.length} ingredients matched
                        </p>
                    ) : null}
                </div>

                <div className="flex flex-row justify-start lg:justify-center lg:items-end gap-3 sm:gap-4 text-[0.9rem] text-text-secondary lg:flex-1 whitespace-nowrap">
                    <p className="m-0"><strong>Cuisine:</strong> {recipe.cuisines?.length ? recipe.cuisines.join(', ') : 'Unknown'}</p>
                    <p className="m-0"><strong>Category:</strong> {recipe.category || 'Unknown'}</p>
                </div>

                <div className="mt-auto flex flex-col items-center justify-center gap-3 shrink-0 sm:flex-row lg:mt-0 lg:flex-1 lg:justify-end">
                    {id ? <FavoriteButton recipeId={id} /> : null}
                    {id ? (
                        <Link 
                            to={`/recipe/${id}`} 
                            className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-primary bg-primary px-4 py-2 text-sm font-semibold text-white no-underline transition-all duration-200 hover:-translate-y-0.5 hover:border-primary-dark hover:bg-primary-dark hover:text-white"
                        >
                            View Recipe
                        </Link>
                    ) : (
                        <span className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-border bg-surface px-4 py-2 text-sm font-semibold text-text-muted">
                            View Recipe
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}