// Huvudvy flr startsidan.
import HowTo from "../components/home/HowTo"
import Button from "../components/common/Button.jsx";
import ReviewDisplay from "../components/common/ReviewDisplay.jsx";
export default function Home() {
    return (
        <>
            <div className="hero">
                <div className="hero-text">
                    <h1>Pantry Pioneer</h1>
                    <Button />
                </div>
                <div className="hero-image">
                </div>
                <div className="hero-overlay">
                </div>
            </div>
            <HowTo />
            <ReviewDisplay />
        </>
    )
}