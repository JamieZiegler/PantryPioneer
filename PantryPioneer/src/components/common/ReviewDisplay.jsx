import Review from "./Review.jsx";
import ReviewForm from "./ReviewForm.jsx";

export default function ReviewDisplay() {
    return (
        <section className="reviews">
            <div className="review-display">
                <h2>What Our Users Say</h2>
                <div className="review-carousel">
                    <Review />
                    <Review />
                    <Review />
                    <Review />
                </div>
            </div>
            <ReviewForm />
        </section>
    )
}