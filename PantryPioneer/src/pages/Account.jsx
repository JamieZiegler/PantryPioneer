import { useState } from "react";
import AccountSettings from "../components/account/AccountSettings";
import PreferenceSettings from "../components/account/PreferenceSettings";

export default function Account() {
    const [activeTab, setActiveTab] = useState("account");

    return (
        <section className="w-full px-4 py-10 sm:px-6 sm:py-14">
            <div className="mx-auto w-full max-w-5xl animate-[fadeInUp_0.4s_ease-out_both] rounded-xl border border-border bg-surface-raised p-6 shadow-md sm:p-8">
                <div className="mb-6 border-b border-border">
                    <div className="flex gap-2">
                        <button
                            type="button"
                            className={`flex-1 border-b-2 py-3 font-body text-sm font-semibold tracking-[0.02em] transition-colors ${
                                activeTab === "account"
                                    ? "border-primary text-primary"
                                    : "border-transparent text-text-muted hover:text-text-main"
                            }`}
                            onClick={() => setActiveTab("account")}
                        >
                            Account
                        </button>
                        <button
                            type="button"
                            className={`flex-1 border-b-2 py-3 font-body text-sm font-semibold tracking-[0.02em] transition-colors ${
                                activeTab === "pantry"
                                    ? "border-primary text-primary"
                                    : "border-transparent text-text-muted hover:text-text-main"
                            }`}
                            onClick={() => setActiveTab("pantry")}
                        >
                            Pantry
                        </button>
                    </div>
                </div>

                {activeTab === "account" ? (
                    <AccountSettings />
                ) : (
                    <PreferenceSettings />
                )}
            </div>
        </section>
    );
}
