import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getRecipeInformation } from '../api/themealdb.js';
import Placeholder from '../assets/images/placeholder.png';
import FavoriteButton from '../components/recipe/FavoriteButton.jsx';

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
            <div className="max-w-(--max-width) w-full mx-auto flex flex-col items-center gap-4 p-8 mb-16 animate-[fadeInUp_0.4s_ease-out_both] text-center">
                <h2 className="font-display text-[2rem] text-text-main m-0">
                    No recipe selected
                </h2>
                <p className="text-text-secondary m-0">
                    This is a fallback page. Click on a recipe to view details.
                </p>
            </div>
        );
    }

    if (loading) return <div className="max-w-(--max-width) w-full mx-auto p-8 animate-[fadeInUp_0.4s_ease-out_both] text-center font-body text-text-secondary">
        Loading recipe...
    </div>;
    if (error) return <div className="max-w-(--max-width) w-full mx-auto p-8 animate-[fadeInUp_0.4s_ease-out_both] text-center font-body text-error-700">
        {error}
    </div>;
    if (!recipe) return null;

    let instructionSteps = [];

    function cleanLine(raw) {
        if (!raw && raw !== 0) return null;
        let s = String(raw).trim();
        if (!s) return null;

        s = s.replace(/^[\s\-•\u2022\u25A0-\u25FF\u2610\u2611\u2713\u2714[\]()]+/, '').trim();
        s = s.replace(/[\s\-•\u2022\u25A0-\u25FF\u2610\u2611\u2713\u2714[\]()]+$/,'').trim();
        
        if (!s || /^[^\w\d]+$/.test(s)) return null;
        if (/^(?:step|steg)\b[\s.:]*\d+[\s.:]*$/i.test(s)) return null;
        if (/^\d+[\s.)]*$/i.test(s)) return null;

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
        <div className="max-w-(--max-width) w-full mx-auto flex flex-wrap gap-8 p-4 sm:p-8 mb-16 animate-[fadeInUp_0.4s_ease-out_both]">
            <div className="w-full text-center flex flex-col justify-center items-center gap-4 text-text-main pt-4">
                <h1 className="w-full text-[clamp(2rem,4vw,3rem)] m-0 text-text-main font-display leading-tight">
                    {recipe.title}
                </h1>
                
                <div className="flex items-center justify-center gap-6">
                    <div className="text-[1rem] text-text-secondary">
                        <strong>Cuisine:</strong> {recipe.cuisines?.length ? recipe.cuisines.join(', ') : 'Okänt'}
                    </div>
                    <FavoriteButton recipeId={id} />
                </div>
            </div>

            <div className="flex flex-wrap gap-6 justify-center w-full mt-4">
                
                <div className="flex-1 flex justify-center items-start min-w-75">
                    <img 
                        className="w-full min-w-75 max-w-125 h-auto rounded-lg shadow-lg object-cover" 
                        src={recipe.image || Placeholder} 
                        alt={recipe.title || 'Receptbild'} 
                    />
                </div>
        
                <div className="flex flex-col min-w-70 grow leading-loose bg-surface p-6 rounded-lg border border-border shadow-sm">
                    <h3 className="text-left text-primary-dark mb-2 pb-2 border-b-2 border-primary-subtle text-[1.5rem] font-display">
                        Ingredients
                    </h3>
                    <ul className="list-none m-0 p-0">
                        {(recipe.ingredients || []).map((ing, idx) => (
                            <li key={idx} className="py-1 border-b border-border-light last:border-none">{ing}</li>
                        ))}
                    </ul>
                </div>
                    
                <div className="bg-linear-to-br from-primary-dark to-primary text-white rounded-lg flex justify-center items-start min-w-70 grow p-6 shadow-md">
                    <table className="w-full text-left">
                        <thead>
                            <tr>
                                <th colSpan="2" className="pb-2"><h3 className="text-white text-[1.5rem] font-display m-0">Unit conversion</h3></th>
                            </tr>
                            <tr className="border-b border-white/20">
                                <th className="py-2 pr-4 font-body font-semibold">Imperial</th>
                                <th className="py-2 font-body font-semibold">Metric</th>
                            </tr>
                        </thead>
                        <tbody className="opacity-90">
                            <tr>
                                <td className="py-1 pr-4">1 teaspoon (tsp)</td>
                                <td className="py-1">5 ml</td>
                            </tr>
                            <tr>
                                <td className="py-1 pr-4">1 tablespoon (tbsp)</td>
                                <td className="py-1">15 ml</td>
                            </tr>
                            <tr>
                                <td className="py-1 pr-4">1 cup</td>
                                <td className="py-1">240 ml</td>
                            </tr>
                            <tr>
                                <td className="py-1 pr-4">1 stick of butter</td>
                                <td className="py-1">113 grams (g)</td>
                            </tr>
                            <tr>
                                <td className="py-1 pr-4">1 ounce (oz)</td>
                                <td className="py-1">28 grams (g)</td>
                            </tr>
                            <tr>
                                <td className="py-1 pr-4">1 pound (lb)</td>
                                <td className="py-1">454 grams (g)</td>
                            </tr>
                            <tr>
                                <td className="py-1 pr-4">1 fluid ounce (fl oz)</td>
                                <td className="py-1">30 ml</td>
                            </tr>
                            <tr>
                                <td className="py-1 pr-4">1 pint (pt)</td>
                                <td className="py-1">473 ml</td>
                            </tr>
                            <tr>
                                <td className="py-1 pr-4">1 quart (qt)</td>
                                <td className="py-1">946 ml</td>
                            </tr>
                            <tr>
                                <td className="py-1 pr-4">1 gallon (gal)</td>
                                <td className="py-1">3.785 liters (L)</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
            </div>

            <div className="flex flex-col w-full leading-relaxed bg-surface p-6 sm:p-8 rounded-lg border border-border shadow-sm mt-2">
                <h3 className="text-left text-primary-dark mb-4 pb-2 border-b-2 border-primary-subtle text-[1.5rem] font-display">
                    Instructions
                </h3>
                {instructionSteps.length ? (
                    <ol className="pl-6 m-0 list-decimal marker:text-primary marker:font-bold">
                        {instructionSteps.map((s, i) => (
                            <li key={i} className="mb-4 pl-2 text-text-secondary">{s}</li>
                        ))}
                    </ol>
                ) : (
                    <p className="text-text-secondary">No instructions available.</p>
                )}
            </div>

        </div>
    );
}