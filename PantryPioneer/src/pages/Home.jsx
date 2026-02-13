// Home page
import HowTo from "../components/home/HowTo"
import Button from "../components/common/Button.jsx";
import ReviewDisplay from "../components/common/ReviewDisplay.jsx";

export default function Home() {
    return (
        <>
            <div className="hero">
                <div className="hero-image" />
                <div className="hero-overlay" />
                <div className="hero-text">
                    <h1>Pantry Pioneer</h1>
                    <p>Discover delicious recipes with the ingredients you already have at home.</p>
                    <Button />
                </div>
            </div>
            <HowTo />
            <ReviewDisplay />
        </>
    )
}