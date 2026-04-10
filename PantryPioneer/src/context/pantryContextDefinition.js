import React, { createContext } from "react";

export const PantryContext = createContext({
    pantryItems: [],
    addItem: () => {},
    removeItem: () => {},
    pantryLoading: false,
    pantryError: "",
    refreshPantry: () => {},
});
