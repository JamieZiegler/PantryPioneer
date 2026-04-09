import { useEffect, useState } from "react";
import { Heart, HeartCrack } from "lucide-react";
import { supabase } from "../../api/supabaseClient.js";
import { useAuth } from "../hooks/useAuth.js";

export default function FavoriteButton({ recipeId }) {
    const { user } = useAuth();
    const [isFavorite, setIsFavorite] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (!user || !recipeId) {
            setIsFavorite(false);
            return;
        }

        let isActive = true;
        setIsFavorite(false);

        (async () => {
            const { data, error } = await supabase
                .from("favorites")
                .select("*")
                .eq("user_id", user.id)
                .eq("recipe_id", recipeId)
                .maybeSingle();

            if (isActive && data && !error) {
                setIsFavorite(true);
            }
        })();

        return () => {
            isActive = false;
        };
    }, [recipeId, user]);

    const handleToggleFavorite = async () => {
        if (!user) {
            alert("You must be logged in to save favorites!");
            return;
        }
        if (!recipeId) {
            return;
        }

        const wasFavorite = isFavorite;
        setIsSubmitting(true);

        try {
            let request;
            if (wasFavorite) {
                request = supabase
                    .from("favorites")
                    .delete()
                    .match({ user_id: user.id, recipe_id: recipeId });
            } else {
                request = supabase
                    .from("favorites")
                    .insert([{ user_id: user.id, recipe_id: recipeId }]);
            }

            const { error } = await request;
            if (error) {
                throw error;
            }

            setIsFavorite(!wasFavorite);
        } catch (error) {
            console.error(
                wasFavorite
                    ? "Failed to remove favorite"
                    : "Failed to save favorite",
                error,
            );
            alert(
                wasFavorite
                    ? "Failed to remove favorite. Please try again."
                    : "Failed to save favorite. Please try again.",
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    let buttonLabel = "Save";
    if (isSubmitting && isFavorite) {
        buttonLabel = "Removing...";
    } else if (isSubmitting) {
        buttonLabel = "Saving...";
    } else if (isFavorite && isHovering) {
        buttonLabel = "Remove";
    } else if (isFavorite) {
        buttonLabel = "Saved";
    }

    let icon = <Heart size={20} />;
    if (isSubmitting) {
        icon = <span className="animate-pulse">...</span>;
    } else if (isFavorite && isHovering) {
        icon = <HeartCrack size={20} />;
    } else if (isFavorite) {
        icon = <Heart size={20} fill="currentColor" />;
    }

    return (
        <button
            onClick={handleToggleFavorite}
            disabled={isSubmitting}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            aria-label={buttonLabel}
            className="inline-flex min-w-30 items-center justify-center gap-2 rounded-full border border-primary/20 bg-primary-subtle/60 px-4 py-2 text-sm font-semibold whitespace-nowrap text-primary-dark transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:bg-primary/10 hover:text-primary-dark disabled:cursor-not-allowed disabled:opacity-70"
        >
            {icon}
            <span>{buttonLabel}</span>
        </button>
    );
}
