import Review from "./Review.jsx";
import ReviewForm from "./ReviewForm.jsx";

export default function ReviewDisplay() {
    return (
        <>
            <div className="review-display">
                <h2>Kundrecensioner</h2>
                <div className="review-carousel">
                    <Review />
                    <Review />
                    <Review />
                    <Review />
                </div>
                <ReviewForm />
            </div>
        </>
    )


    // // https://codesandbox.io/p/sandbox/review-card-react-pd6r0?file=%2Fsrc%2FReview.js
}