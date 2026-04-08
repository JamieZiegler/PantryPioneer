export default function Pantry() {
    return (
        <div className="mx-auto flex w-full max-w-150 animate-[fadeInUp_0.4s_ease-out_both] flex-col items-center gap-6 px-8 py-24 text-center">
            <span
                className="text-[3.5rem] leading-none"
                role="img"
                aria-label="pantry"
            >
                🥫
            </span>
            <h2>My Pantry</h2>
            <p className="max-w-105 leading-[1.7]">
                Track the ingredients you have at home and get instant recipe
                suggestions. Coming soon!
            </p>
        </div>
    );
}
