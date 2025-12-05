import Placeholder from "../../assets/images/placeholder.png";
import { Link } from "react-router-dom";

export default function RecipeCard({ recipe = {} }) {
    const {
        id,
        title,
        image,
        ingredients = [],
        matchCount = 0,
    } = recipe;

    return (
        <>
            <div className="recipe-card">
                <img className="recipe-image-preview" src={image || Placeholder} alt={title || 'Recipe'}/>
                <div className="recipe-card-content">

                    <div className="recipe-details">
                        <h4>{title || 'Recipe name'}</h4>
                        <p className="ingredient-count">{matchCount} of {ingredients.length} ingredients</p>
                    </div>

                    <div className="category-kitchen-info">
                        <p><strong>Cuisine:</strong> {recipe.cuisines && recipe.cuisines.length ? recipe.cuisines.join(', ') : 'Unknown'}</p>
                        <p><strong>Category:</strong> {recipe.category || 'Unknown'}</p>
                    </div>

                    <div className="cta-recipe">
                        <Link to={`/recipe/${id}`}>Go to recipe...</Link>
                    </div>

                </div>

            </div>
        </>
    );
}