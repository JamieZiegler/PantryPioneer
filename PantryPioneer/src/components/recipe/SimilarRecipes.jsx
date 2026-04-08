import RecipeCard from "../search/RecipeCard"

export default function SimilarRecipes() {
    return (
        <>
            <div className="flex w-full flex-col gap-5 rounded-lg border border-border bg-surface p-6 shadow-sm">
                <h3 className="text-left text-primary-dark">Liknande recept</h3>
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                    <RecipeCard />
                    <RecipeCard />
                    <RecipeCard />
                </div>
                
            </div>

        </>
    )
}