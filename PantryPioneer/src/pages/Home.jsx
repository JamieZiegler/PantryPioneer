import HowTo from "../components/home/HowTo";
import Button from "../components/common/Button.jsx";
import ReviewDisplay from "../components/common/ReviewDisplay.jsx";
import heroImage from "../assets/images/marketing/pantry-jars.webp";

export default function Home() {
    return (
        <>
            <div className="relative h-[85vh] max-h-200 min-h-137.5 w-full overflow-hidden">
                <div
                    className="absolute inset-0 z-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${heroImage})` }}
                />
                <div className="absolute inset-0 z-1 bg-[linear-gradient(170deg,rgba(74,56,128,0.8)_0%,rgba(103,80,164,0.6)_40%,rgba(0,0,0,0.4)_100%)]" />
                <div className="absolute top-1/2 left-1/2 z-2 flex -translate-x-1/2 -translate-y-1/2 animate-[fadeIn_0.8s_ease-out_both] flex-col items-center gap-8 text-center">
                    <h1 className="m-0 font-display text-[clamp(2rem,10vw,6rem)] font-normal tracking-[0.02em] text-white [text-shadow:0_2px_20px_rgba(0,0,0,0.2)] md:text-[clamp(2.5rem,7vw,4.5rem)]">
                        Pantry Pioneer
                    </h1>
                    <p className="max-w-125 text-[clamp(1rem,2vw,1.25rem)] leading-relaxed text-white/85">
                        Discover delicious recipes with the ingredients you
                        already have at home.
                    </p>
                    <Button />
                </div>
            </div>
            <HowTo />
            <ReviewDisplay />
        </>
    );
}
