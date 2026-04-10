import { useContext, useState } from "react";
import { PantryContext } from "../../context/pantryContextDefinition";

const categories = [
    "Vegetables",
    "Fruit",
    "Dairy",
    "Meat",
    "Pantry",
    "Snacks & sweets",
    "Frozen",
    "Other",
];

export default function PantryTab() {
    const [itemName, setItemName] = useState("");
    const [category, setCategory] = useState("Other");
    const [formError, setFormError] = useState("");
    const [saving, setSaving] = useState(false);
    const { pantryItems, addItem, removeItem, pantryLoading, pantryError } =
        useContext(PantryContext);

    const handleAddItem = async (event) => {
        event.preventDefault();
        setFormError("");

        const nextName = itemName.trim();
        if (!nextName) {
            setFormError("Please enter an ingredient name.");
            return;
        }

        setSaving(true);
        try {
            await addItem({ name: nextName, category });
            setItemName("");
            setCategory("Other");
        } catch (error) {
            console.error("Could not save pantry item.", error);
            setFormError(error?.message || "Could not save pantry item.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="flex flex-col gap-6">
            <div>
                <h2 className="mb-2 text-left">Pantry</h2>
                <p className="text-sm text-text-secondary">
                    Add ingredients you usually keep at home.
                </p>
            </div>

            <form
                onSubmit={handleAddItem}
                className="grid gap-3 sm:grid-cols-[1fr_180px_auto]"
            >
                <input
                    value={itemName}
                    onChange={(event) => setItemName(event.target.value)}
                    placeholder="Add item"
                    className="form-input"
                />

                <select
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                    className="form-input"
                >
                    {categories.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>

                <button type="submit" className="btn-primary" disabled={saving}>
                    {saving ? "Saving..." : "Add"}
                </button>
            </form>

            {(formError || pantryError) && (
                <p className="form-error">{formError || pantryError}</p>
            )}

            {pantryLoading ? (
                <div className="rounded-lg border border-border bg-surface p-5 text-sm text-text-secondary shadow-sm">
                    Loading pantry items...
                </div>
            ) : null}

            <div className="grid gap-4">
                {categories.map((group) => (
                    <section
                        key={group}
                        className="rounded-lg border border-border bg-surface p-5 shadow-sm"
                    >
                        <h3 className="mb-3 text-left text-lg">{group}</h3>

                        {(() => {
                            const items = pantryItems.filter(
                                (item) => item.category === group,
                            );

                            if (items.length === 0) {
                                return (
                                    <p className="text-sm text-text-secondary">
                                        No items here yet.
                                    </p>
                                );
                            }

                            return (
                                <ul className="space-y-2">
                                    {items.map((item) => (
                                        <li
                                            key={item.id}
                                            className="flex items-center justify-between rounded-md border border-border px-3 py-2"
                                        >
                                            <span>{item.name}</span>
                                            <button
                                                type="button"
                                                onClick={async () => {
                                                    setFormError("");
                                                    try {
                                                        await removeItem(
                                                            item.id,
                                                        );
                                                    } catch (error) {
                                                        console.error(
                                                            "Could not remove pantry item.",
                                                            error,
                                                        );
                                                        setFormError(
                                                            error?.message ||
                                                                "Could not remove pantry item.",
                                                        );
                                                    }
                                                }}
                                                className="text-sm text-error-700"
                                            >
                                                Remove
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            );
                        })()}
                    </section>
                ))}
            </div>
        </div>
    );
}
