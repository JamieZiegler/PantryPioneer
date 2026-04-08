export default function NutrientInfo() {
    return (
        <>
            <div className="flex min-w-70 grow flex-col rounded-lg bg-linear-to-br from-primary-dark to-primary p-6 text-white shadow-md">
                <h3 className="mb-2 text-left text-white">Näringsinformation</h3>
                <i className="mb-3 opacity-90">Per 100g färdig rätt</i>
                <ul className="m-0 list-none space-y-1 p-0 opacity-90">
                    <li><strong>Kalorier:</strong> 250 kcal</li>
                    <li><strong>Protein:</strong> 10 g</li>
                    <li><strong>Fett:</strong> 15 g</li>
                    <li><strong>Kolhydrater:</strong> 20 g</li>
                    <li><strong>Fiber:</strong> 5 g</li>
                </ul>
            </div>

        </>
    )
}