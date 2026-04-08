import { supabase } from './supabaseClient.js';
import { getRecipeInformation } from './themealdb.js';

export async function getFavoriteRecipes(userId) {
    if (!userId) {
        return [];
    }   
    const { data, error } = await supabase
        .from('favorites')
        .select('recipe_id')
        .eq('user_id', userId); 
    if (error) {
        throw error;
    }   
    const uniqueRecipeIds = [...new Set((data || []).map((row) => row.recipe_id).filter(Boolean))]; 
    const recipes = await Promise.all(
        uniqueRecipeIds.map(async (recipeId) => {
            try {
                return await getRecipeInformation(recipeId);
            } catch (fetchError) {
                console.error(`Failed to load recipe ${recipeId}`, fetchError);
                return null;
            }
        })
    );  
    return recipes.filter(Boolean);
}