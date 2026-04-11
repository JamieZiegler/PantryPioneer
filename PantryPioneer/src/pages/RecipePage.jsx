import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRecipeInformation } from "../api/themealdb.js";
import Placeholder from "../assets/images/placeholder.webp";
import FavoriteButton from "../components/recipe/FavoriteButton.jsx";

export default function RecipePage() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!id) return;
        let cancelled = false;

        async function loadRecipe() {
            setLoading(true);
            setError("");
            try {
                const r = await getRecipeInformation(id);
                if (!cancelled) setRecipe(r);
            } catch (err) {
                console.error("Failed to load recipe", err);
                if (!cancelled) setError("Could not fetch the recipe.");
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
            <div className="mx-auto mb-16 flex w-full max-w-(--max-width) animate-[fadeInUp_0.4s_ease-out_both] flex-col items-center gap-4 p-8 text-center">
                <h2 className="m-0 font-display text-[2rem] text-text-main">
                    No recipe selected
                </h2>
                <p className="m-0 text-text-secondary">
                    This is a fallback page. Click on a recipe to view details.
                </p>
            </div>
        );
    }

    if (loading)
        return (
            <div className="mx-auto w-full max-w-(--max-width) animate-[fadeInUp_0.4s_ease-out_both] p-8 text-center font-body text-text-secondary">
                Loading recipe...
            </div>
        );
    if (error)
        return (
            <div className="mx-auto w-full max-w-(--max-width) animate-[fadeInUp_0.4s_ease-out_both] p-8 text-center font-body text-error-700">
                {error}
            </div>
        );
    if (!recipe) return null;

    let instructionSteps = [];

    function cleanLine(raw) {
        if (!raw && raw !== 0) return null;
        let s = String(raw).trim();
        if (!s) return null;

        s = s
            .replace(
                /^[\s\-•\u2022\u25A0-\u25FF\u2610\u2611\u2713\u2714[\]()]+/,
                "",
            )
            .trim();
        s = s
            .replace(
                /[\s\-•\u2022\u25A0-\u25FF\u2610\u2611\u2713\u2714[\]()]+$/,
                "",
            )
            .trim();

        if (!s || /^[^\w\d]+$/.test(s)) return null;
        if (/^(?:step|steg)\b[\s.:]*\d+[\s.:]*$/i.test(s)) return null;
        if (/^\d+[\s.)]*$/i.test(s)) return null;

        s = s.replace(/^((?:\d+)[.)\s]+)+/, "").trim();

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
            } else if (typeof section === "string") {
                const clean = cleanLine(section);
                if (clean) instructionSteps.push(clean);
            }
        });
    } else if (typeof recipe.instructions === "string") {
        instructionSteps = recipe.instructions
            .split(/\r?\n/)
            .map((l) => cleanLine(l))
            .filter(Boolean);
    }

    const cleanImageUrl = recipe.image
        ? recipe.image.replace(/^https?:\/\//, "")
        : "";

    const optimizedImage = recipe.image
        ? `https://wsrv.nl/?url=${encodeURIComponent(cleanImageUrl)}&w=300&h=300&fit=cover&q=60&output=webp`
        : Placeholder;

    return (
        <div className="mx-auto mb-16 flex w-full max-w-(--max-width) animate-[fadeInUp_0.4s_ease-out_both] flex-wrap gap-8 p-4 sm:p-8">
            <div className="flex w-full flex-col items-center justify-center gap-4 pt-4 text-center text-text-main">
                <h1 className="m-0 w-full font-display text-[clamp(2rem,4vw,3rem)] leading-tight text-text-main">
                    {recipe.title}
                </h1>

                <div className="flex items-center justify-center gap-6">
                    <div className="text-[1rem] text-text-secondary">
                        <strong>Cuisine:</strong>{" "}
                        {recipe.cuisines?.length
                            ? recipe.cuisines.join(", ")
                            : "Okänt"}
                    </div>
                    <FavoriteButton recipeId={id} />
                </div>
            </div>

            <div className="mt-4 flex w-full flex-wrap justify-center gap-6">
                <div className="flex min-w-75 flex-1 items-start justify-center">
                    <img
                        className="h-auto w-full max-w-75 min-w-50 rounded-lg object-cover shadow-lg"
                        src={optimizedImage}
                        alt={recipe.title || "Receptbild"}
                        width="300"
                        height="300"
                        loading="eager"
                        decoding="async"
                        fetchPriority="high"
                    />
                </div>

                <div className="flex min-w-70 grow flex-col rounded-lg border border-border bg-surface p-6 leading-loose shadow-sm">
                    <h3 className="mb-2 border-b-2 border-primary-subtle pb-2 text-left font-display text-[1.5rem] text-primary-dark">
                        Ingredients
                    </h3>
                    <ul className="m-0 list-none p-0">
                        {(recipe.ingredients || []).map((ing, idx) => (
                            <li
                                key={idx}
                                className="border-b border-border-light py-1 last:border-none"
                            >
                                {ing}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="flex min-w-70 grow items-start justify-center rounded-lg bg-linear-to-br from-primary-dark to-primary p-6 text-white shadow-md">
                    <table className="w-full text-left">
                        <thead>
                            <tr>
                                <th colSpan="2" className="pb-2">
                                    <h3 className="m-0 font-display text-[1.5rem] text-white">
                                        Unit conversion
                                    </h3>
                                </th>
                            </tr>
                            <tr className="border-b border-white/20">
                                <th className="py-2 pr-4 font-body font-semibold">
                                    Imperial
                                </th>
                                <th className="py-2 font-body font-semibold">
                                    Metric
                                </th>
                            </tr>
                        </thead>
                        <tbody className="opacity-90">
                            <tr>
                                <td className="py-1 pr-4">1 teaspoon (tsp)</td>
                                <td className="py-1">5 ml</td>
                            </tr>
                            <tr>
                                <td className="py-1 pr-4">
                                    1 tablespoon (tbsp)
                                </td>
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
                                <td className="py-1 pr-4">
                                    1 fluid ounce (fl oz)
                                </td>
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

            <div className="mt-2 flex w-full flex-col rounded-lg border border-border bg-surface p-6 leading-relaxed shadow-sm sm:p-8">
                <h3 className="mb-4 border-b-2 border-primary-subtle pb-2 text-left font-display text-[1.5rem] text-primary-dark">
                    Instructions
                </h3>
                {instructionSteps.length ? (
                    <ol className="m-0 list-decimal pl-6 marker:font-bold marker:text-primary">
                        {instructionSteps.map((s, i) => (
                            <li
                                key={i}
                                className="mb-4 pl-2 text-text-secondary"
                            >
                                {s}
                            </li>
                        ))}
                    </ol>
                ) : (
                    <p className="text-text-secondary">
                        No instructions available.
                    </p>
                )}
            </div>
        </div>
    );
}
