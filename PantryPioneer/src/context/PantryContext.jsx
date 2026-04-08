import { PantryContext } from "./pantryContextDefinition";

export const PantryProvider = ({ children }) => {
    return (
        <PantryContext.Provider
            value={{
                pantryItems: [],
                favorites: [],
                addItem: () => {},
                removeItem: () => {},
            }}
        >
            {children}
        </PantryContext.Provider>
    );
};
