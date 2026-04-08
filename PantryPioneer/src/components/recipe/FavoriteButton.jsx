import { useEffect, useState } from 'react';
import { Heart, HeartCrack } from 'lucide-react';
import { supabase } from '../../api/supabaseClient.js';
import { useAuth } from '../hooks/useAuth.js';

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
                .from('favorites')
                .select('*')
                .eq('user_id', user.id)
                .eq('recipe_id', recipeId)
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
            alert('You must be logged in to save favorites!');
            return;
        }
        if (!recipeId) {
            return;
        }

        const wasFavorite = isFavorite;
        setIsSubmitting(true);

        try {
            const request = wasFavorite
                ? supabase.from('favorites').delete().match({ user_id: user.id, recipe_id: recipeId })
                : supabase.from('favorites').insert([{ user_id: user.id, recipe_id: recipeId }]);

            const { error } = await request;
            if (error) {
                throw error;
            }

            setIsFavorite(!wasFavorite);
        } catch (error) {
            console.error(wasFavorite ? 'Failed to remove favorite' : 'Failed to save favorite', error);
            alert(wasFavorite ? 'Failed to remove favorite. Please try again.' : 'Failed to save favorite. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const buttonLabel = isSubmitting
        ? (isFavorite ? 'Removing...' : 'Saving...')
        : (isFavorite ? 'Saved Favorite' : 'Save Favorite');

    const buttonTitle = isSubmitting
        ? (isFavorite ? 'Removing...' : 'Saving...')
        : (isFavorite && isHovering ? 'Remove Favorite' : buttonLabel);

    return (
        <button
            onClick={handleToggleFavorite}
            disabled={isSubmitting}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            aria-label={buttonLabel}
            title={buttonTitle}
            className="inline-flex min-w-43 items-center justify-center gap-2 whitespace-nowrap rounded-full border border-primary/20 bg-primary-subtle/60 px-4 py-2 text-sm font-semibold text-primary-dark transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:bg-primary/10 hover:text-primary-dark disabled:cursor-not-allowed disabled:opacity-70"
        >
            {isSubmitting ? (
                <span className="animate-pulse">...</span>
            ) : isFavorite ? (
                isHovering ? <HeartCrack size={20} /> : <Heart size={20} fill="currentColor" />
            ) : (
                <Heart size={20} />
            )}
            <span>{buttonLabel}</span>
        </button>
    );
}