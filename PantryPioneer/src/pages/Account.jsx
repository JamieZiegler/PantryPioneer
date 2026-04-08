export default function Account() {
    return (
        <div className="mx-auto flex w-full max-w-150 animate-[fadeInUp_0.4s_ease-out_both] flex-col items-center gap-6 px-8 py-24 text-center">
            <span
                className="text-[3.5rem] leading-none"
                role="img"
                aria-label="account"
            >
                👤
            </span>
            <h2>My Account</h2>
            <p className="max-w-105 leading-[1.7]">
                Manage your profile, preferences, and saved recipes all in one
                place. Coming soon!
            </p>
        </div>
    );
}
