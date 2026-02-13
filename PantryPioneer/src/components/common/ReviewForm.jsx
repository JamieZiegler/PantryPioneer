
export default function ReviewForm() {
    return (
        <form className="review-form">
            <fieldset>
                <legend>Share Your Experience</legend>
                <label htmlFor="review-title">Review Title</label>
                <input type="text" id="review-title" name="review-title" placeholder="Give your review a title" required />
                <label htmlFor="review-rating">Rating</label>
                <div className="radio-select">
                    <div className="star-group">
                        <input type="radio" id="star5" name="review-rating" value="5" />
                        <label className="star-label" htmlFor="star5">&#9733;&#9733;&#9733;&#9733;&#9733;</label>
                    </div>
                    <div className="star-group">
                        <input type="radio" id="star4" name="review-rating" value="4" />
                        <label className="star-label" htmlFor="star4">&#9733;&#9733;&#9733;&#9733;</label>
                    </div>
                    <div className="star-group">
                        <input type="radio" id="star3" name="review-rating" value="3" />
                        <label className="star-label" htmlFor="star3">&#9733;&#9733;&#9733;</label>
                    </div>
                    <div className="star-group">
                        <input type="radio" id="star2" name="review-rating" value="2" />
                        <label className="star-label" htmlFor="star2">&#9733;&#9733;</label>
                    </div>
                    <div className="star-group">
                        <input type="radio" id="star1" name="review-rating" value="1" />
                        <label className="star-label" htmlFor="star1">&#9733;</label>
                    </div>
                </div>
                <label htmlFor="review-content">Your Review</label>
                <textarea id="review-content" name="review-content" rows="4" placeholder="Tell us about your experience..." required></textarea>
                <label htmlFor="reviewer-name">Name</label>
                <input type="text" id="reviewer-name" name="reviewer-name" placeholder="Your name" required />
                <label htmlFor="reviewer-email">Email</label>
                <input type="email" id="reviewer-email" name="reviewer-email" placeholder="your@email.com" required />
                <button type="submit">Submit Review</button>
            </fieldset>
        </form>
    )
}