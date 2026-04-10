import AccountSettings from "../components/account/AccountSettings";

export default function Account() {
    return (
        <section className="w-full px-4 py-10 sm:px-6 sm:py-14">
            <div className="mx-auto w-full max-w-5xl animate-[fadeInUp_0.4s_ease-out_both] rounded-xl border border-border bg-surface-raised p-6 shadow-md sm:p-8">
                <AccountSettings />
            </div>
        </section>
    );
}
