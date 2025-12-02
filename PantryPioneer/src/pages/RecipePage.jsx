import IngredientList from '../components/recipe/IngredientList.jsx';
import InstructionList from '../components/recipe/InstructionList.jsx';
import NutrientInfo from '../components/recipe/NutrientInfo.jsx';
import SimilarRecipes from '../components/recipe/SimilarRecipes.jsx';
import Placeholder from '../assets/images/placeholder.png';

export default function RecipePage() {
    return (
        <>
        {/* Add breadcrumb navigation */}

            <div className="recipe-page">
                <div className="recipe-header">
                    <h1>Receptnamn</h1>
                    <strong>Portioner:</strong> 4
                    <strong>Tillagningstid:</strong> 30 minuter
                    <strong>Allergener:</strong> Inga
                </div>
                <div className="recipe-image">
                    <img src={Placeholder} alt="Receptbild" />
                </div>
                <IngredientList />
                <NutrientInfo />
                <InstructionList />
                <SimilarRecipes />
            </div>
        </>
    )
}