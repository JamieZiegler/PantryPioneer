import { useSearchParams } from "react-router-dom";
import { Heart, Package } from "lucide-react";
import FavoritesTab from "../components/pantry/FavoritesTab";
import PantryTab from "../components/pantry/PantryTab";

const PANTRY_TAB_KEY = "pantry-active-tab";
const validTabs = ["pantry", "favorites"];

export default function Pantry() {
    const [searchParams, setSearchParams] = useSearchParams();

    const tabFromUrl = searchParams.get("tab");
    const savedTab = localStorage.getItem(PANTRY_TAB_KEY);
    const activeTab =
        tabFromUrl && validTabs.includes(tabFromUrl)
            ? tabFromUrl
            : savedTab && validTabs.includes(savedTab)
              ? savedTab
              : "pantry";

    const handleTabChange = (tab) => {
        localStorage.setItem(PANTRY_TAB_KEY, tab);
        if (tab === "pantry") {
            setSearchParams({});
            return;
        }
        setSearchParams({ tab });
    };

    return (
        <section className="w-full px-4 py-10 sm:px-6 sm:py-14">
            <div className="mx-auto w-full max-w-5xl animate-[fadeInUp_0.4s_ease-out_both] rounded-xl border border-border bg-surface-raised p-6 shadow-md sm:p-8">
                <div className="mb-6 border-b border-border">
                    <div className="flex gap-2">
                        <button
                            type="button"
                            className={
                                "flex flex-1 items-center justify-center border-b-2 py-3 text-sm font-semibold transition-colors " +
                                (activeTab === "pantry"
                                    ? "border-primary text-primary"
                                    : "border-transparent text-text-muted hover:text-text-main")
                            }
                            onClick={() => handleTabChange("pantry")}
                            aria-label="Pantry"
                            title="Pantry"
                        >
                            <Package className="h-8 w-8" />
                        </button>

                        <button
                            type="button"
                            className={
                                "flex flex-1 items-center justify-center border-b-2 py-3 text-sm font-semibold transition-colors " +
                                (activeTab === "favorites"
                                    ? "border-primary text-primary"
                                    : "border-transparent text-text-muted hover:text-text-main")
                            }
                            onClick={() => handleTabChange("favorites")}
                            aria-label="Favorites"
                            title="Favorites"
                        >
                            <Heart className="h-8 w-8" />
                        </button>
                    </div>
                </div>

                {activeTab === "pantry" ? <PantryTab /> : <FavoritesTab />}
            </div>
        </section>
    );
}
