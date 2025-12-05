import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getRecipeInformation } from '../api/themealdb.js';
import Placeholder from '../assets/images/placeholder.png';

export default function RecipePage() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!id) return;
        let cancelled = false;

        async function loadRecipe() {
            setLoading(true);
            setError('');
            try {
                const r = await getRecipeInformation(id);
                if (!cancelled) setRecipe(r);
            } catch (err) {
                console.error('Failed to load recipe', err);
                if (!cancelled) setError('Could not fetch the recipe.');
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        loadRecipe();
        return () => {
            cancelled = true;
        };
    }, [id]);

    if (!id) {
        return (
            <div className="recipe-page">
                <h2>No recipe selected</h2>
                <p>This is a fallback page. Click on a recipe to view details.</p>
            </div>
        );
    }

    if (loading) return <div className="recipe-page">Loading recipe...</div>;
    if (error) return <div className="recipe-page">{error}</div>;
    if (!recipe) return null;

    let instructionSteps = [];

    function cleanLine(raw) {
        if (!raw && raw !== 0) return null;
        let s = String(raw).trim();
        if (!s) return null;

        // Trimmar bort checkbox-symboler från början och slut: ▢ ▪ □ ■ ◻ ◼ ☐ ☑ ✓ ✔
        s = s.replace(/^[\s\-•\u2022\u25A0-\u25FF\u2610\u2611\u2713\u2714[\]()]+/, '').trim();
        s = s.replace(/[\s\-•\u2022\u25A0-\u25FF\u2610\u2611\u2713\u2714[\]()]+$/,'').trim();
        
        if (!s || /^[^\w\d]+$/.test(s)) return null;
        if (/^(?:step|steg)\b[\s.:]*\d+[\s.:]*$/i.test(s)) return null;
        if (/^\d+[\s.)]*$/i.test(s)) return null;

        // Ta bort upprepad radnumrering som "1. ", "1. 1. ", "1) ", etc.
        // Behåller den läsbara texten och renderar numrering via mina <ol> istället.
        s = s.replace(/^((?:\d+)[.)\s]+)+/, '').trim();

        return s || null;
    }

    if (Array.isArray(recipe.instructions) && recipe.instructions.length > 0) {
        recipe.instructions.forEach((section) => {
            if (Array.isArray(section.steps)) {
                section.steps.forEach((s) => {
                    const raw = s && s.step ? s.step : s;
                    const clean = cleanLine(raw);
                    if (clean) instructionSteps.push(clean);
                });
            } else if (typeof section === 'string') {
                const clean = cleanLine(section);
                if (clean) instructionSteps.push(clean);
            }
        });
    } else if (typeof recipe.instructions === 'string') {
        instructionSteps = recipe.instructions
            .split(/\r?\n/)
            .map((l) => cleanLine(l))
            .filter(Boolean);
    }

    return (
        <div className="recipe-page">
            <div className="recipe-header">
                <h1>{recipe.title}</h1>
                <div>
                    <strong>Kök:</strong> {recipe.cuisines && recipe.cuisines.length ? recipe.cuisines.join(', ') : 'Okänt'}
                </div>
            </div>

            <div className="recipe-image">
                <img src={recipe.image || Placeholder} alt={recipe.title || 'Receptbild'} />
            </div>

            <div className="ingredient-list">
                <h3>Ingredienser</h3>
                <ul>
                    {(recipe.ingredients || []).map((ing, idx) => (
                        <li key={idx}>{ing}</li>
                    ))}
                </ul>
            </div>

            <div className="unit-conversion-info">
                <table>
                    <thead>
                        <tr>
                            <th colSpan="2"><h3>Unit conversion</h3></th>
                        </tr>
                        <tr>
                            <th>Imperial</th>
                            <th>Metric</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1 teaspoon (tsp)</td>
                            <td>5 ml</td>
                        </tr>
                        <tr>
                            <td>1 tablespoon (tbsp)</td>
                            <td>15 ml</td>
                        </tr>
                        <tr>
                            <td>1 cup</td>
                            <td>240 ml</td>
                        </tr>
                        <tr>
                            <td>1 stick of butter</td>
                            <td>113 grams (g)</td>
                        </tr>
                        <tr>
                            <td>1 ounce (oz)</td>
                            <td>28 grams (g)</td>
                        </tr>
                        <tr>
                            <td>1 pound (lb)</td>
                            <td>454 grams (g)</td>
                        </tr>
                        <tr>
                            <td>1 fluid ounce (fl oz)</td>
                            <td>30 ml</td>
                        </tr>
                        <tr>
                            <td>1 pint (pt)</td>
                            <td>473 ml</td>
                        </tr>
                        <tr>
                            <td>1 quart (qt)</td>
                            <td>946 ml</td>
                        </tr>
                        <tr>
                            <td>1 gallon (gal)</td>
                            <td>3.785 liters (L)</td>
                        </tr>

                    </tbody>
                </table>
            </div>

            <div className="instruction-list">
                <h3>Instructions</h3>
                {instructionSteps.length ? (
                    <ol>
                        {instructionSteps.map((s, i) => (
                            <li key={i}>{s}</li>
                        ))}
                    </ol>
                ) : (
                    <p>No instructions available.</p>
                )}
            </div>

        </div>
    );
}