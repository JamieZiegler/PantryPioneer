import React, { createContext } from 'react';

export const PantryContext = createContext({
    pantryItems: [], 
    favorites: [],
    addItem: () => {},
    removeItem: () => {},
});
