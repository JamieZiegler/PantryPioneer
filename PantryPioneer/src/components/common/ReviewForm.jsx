
export default function ReviewForm() {
    return (
        <>
            <form className="review-form">
                <fieldset>
                    <legend>
                        Want to share your thoughts?
                    </legend>
                    <label htmlFor="review-title">Review Title:</label>
                    <input type="text" id="review-title" name="review-title" placeholder="Write your review title here" required />
                    <label htmlFor="review-rating">Rating:</label>
                    <div className="radio-select">
                        <div className="star-group">
                            <input type="radio" id="star5" name="review-rating" value="5" />
                            <label className="star-label" htmlFor="star5">★★★★★</label>
                        </div>
                        <div className="star-group">
                            <input type="radio" id="star4" name="review-rating" value="4" />
                            <label className="star-label" htmlFor="star4">★★★★</label>
                        </div>
                        <div className="star-group">
                            <input type="radio" id="star3" name="review-rating" value="3" />
                            <label className="star-label" htmlFor="star3">★★★</label>
                        </div>
                        <div className="star-group">
                            <input type="radio" id="star2" name="review-rating" value="2" />
                            <label className="star-label" htmlFor="star2">★★</label>
                        </div>
                        <div className="star-group">
                            <input type="radio" id="star1" name="review-rating" value="1" />
                            <label className="star-label" htmlFor="star1">★</label>
                        </div>
                    </div>
                    <label htmlFor="review-content">Your Review:</label>
                    <textarea id="review-content" name="review-content" rows="4" placeholder="Write your review here..." required></textarea>
                    <label htmlFor="reviewer-name">Your Name:</label>
                    <input type="text" id="reviewer-name" name="reviewer-name" placeholder="Write your name here" required />
                    <label htmlFor="reviewer-email">Your Email:</label>
                    <input type="email" id="reviewer-email" name="reviewer-email" placeholder="Write your email here" required />
                    <button type="submit">Submit Review</button>
                </fieldset>
            </form>

        </>
    )

}