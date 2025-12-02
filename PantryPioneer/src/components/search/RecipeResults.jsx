import RecipeCard from "./RecipeCard.jsx";

export default function RecipeResults() {
    return (
        <>
            <div className="recipe-results">
                <h3>Resultat:</h3>
                <RecipeCard />
                <RecipeCard />
                <RecipeCard />
                <RecipeCard />
                <RecipeCard />
            </div>
        </>
    )
}