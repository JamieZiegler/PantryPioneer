import { useEffect, useState } from "react";
import {
    addPantryItem,
    getPantryItems,
    removePantryItem,
} from "../api/pantry.js";
import { useAuth } from "../components/hooks/useAuth.js";
import { PantryContext } from "./pantryContextDefinition";

async function loadPantryItems({
    userId,
    setPantryItems,
    setPantryError,
    setPantryLoading,
}) {
    if (!userId) {
        setPantryItems([]);
        setPantryError("");
        setPantryLoading(false);
        return;
    }

    setPantryLoading(true);
    setPantryError("");

    try {
        setPantryItems(await getPantryItems(userId));
    } catch (error) {
        console.error("Failed to load pantry items", error);
        setPantryError("Could not load pantry items right now.");
    } finally {
        setPantryLoading(false);
    }
}

export const PantryProvider = ({ children }) => {
    const { user } = useAuth();
    const userId = user?.id;

    const [pantryItems, setPantryItems] = useState([]);
    const [pantryLoading, setPantryLoading] = useState(false);
    const [pantryError, setPantryError] = useState("");

    const refreshPantry = () =>
        loadPantryItems({
            userId,
            setPantryItems,
            setPantryError,
            setPantryLoading,
        });

    useEffect(() => {
        loadPantryItems({
            userId,
            setPantryItems,
            setPantryError,
            setPantryLoading,
        });
    }, [userId]);

    async function addItem({ name, category }) {
        if (!userId) {
            throw new Error("You must be logged in to add pantry items.");
        }

        const createdItem = await addPantryItem(userId, { name, category });

        setPantryItems((currentItems) =>
            currentItems.some((item) => item.id === createdItem.id)
                ? currentItems
                : [...currentItems, createdItem],
        );

        return createdItem;
    }

    async function removeItem(itemId) {
        if (!userId) {
            throw new Error("You must be logged in to remove pantry items.");
        }

        await removePantryItem(userId, itemId);
        setPantryItems((currentItems) =>
            currentItems.filter((item) => item.id !== itemId),
        );
    }

    return (
        <PantryContext.Provider
            value={{
                pantryItems,
                addItem,
                removeItem,
                pantryLoading,
                pantryError,
                refreshPantry,
            }}
        >
            {children}
        </PantryContext.Provider>
    );
};
