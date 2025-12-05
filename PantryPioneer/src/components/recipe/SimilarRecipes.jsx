import RecipeCard from "../search/RecipeCard"

export default function SimilarRecipes() {
    return (
        <>
            <div className="similar-recipes">
                <h3>Liknande recept</h3>
                <div className="recipe-cards">
                    <RecipeCard />
                    <RecipeCard />
                    <RecipeCard />
                </div>
                
            </div>

        </>
    )
}