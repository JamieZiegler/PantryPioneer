import { supabase } from "./supabaseClient";

function normalizePantryItem(row) {
	if (!row) {
		return null;
	}

	return {
		id: row.id,
		name: row.name,
		category: row.category || "Other",
		createdAt: row.created_at || null,
	};
}

export async function getPantryItems(userId) {
	if (!userId) {
		return [];
	}

	const { data, error } = await supabase
		.from("pantry_items")
		.select("id, name, category, created_at")
		.eq("user_id", userId)
		.order("created_at", { ascending: true });

	if (error) {
		throw error;
	}

	return (data || []).map(normalizePantryItem).filter(Boolean);
}

export async function addPantryItem(userId, payload) {
	const name = String(payload?.name || "").trim();
	const category = String(payload?.category || "Other").trim() || "Other";

	if (!userId) {
		throw new Error("You must be logged in to add pantry items.");
	}

	if (!name) {
		throw new Error("Pantry item name is required.");
	}

	const { data, error } = await supabase
		.from("pantry_items")
		.insert({
			user_id: userId,
			name,
			category,
		})
		.select("id, name, category, created_at")
		.single();

	if (error) {
		throw error;
	}

	return normalizePantryItem(data);
}

export async function removePantryItem(userId, itemId) {
	if (!userId) {
		throw new Error("You must be logged in to remove pantry items.");
	}

	const { error } = await supabase
		.from("pantry_items")
		.delete()
		.eq("user_id", userId)
		.eq("id", itemId);

	if (error) {
		throw error;
	}
}