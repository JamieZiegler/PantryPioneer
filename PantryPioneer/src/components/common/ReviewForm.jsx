
export default function ReviewForm() {
    return (
        <>
            <form className="review-form">
                <fieldset>
                    <legend>
                        Vill du lämna en recension?
                    </legend>
                    <label htmlFor="review-title">Recensionstitel:</label>
                    <input type="text" id="review-title" name="review-title" placeholder="Skriv din recensionstitel här" required />
                    <label htmlFor="review-rating">Betyg:</label>
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
                    <label htmlFor="review-content">Din recension:</label>
                    <textarea id="review-content" name="review-content" rows="4" placeholder="Skriv din recension här..." required></textarea>
                    <label htmlFor="reviewer-name">Ditt namn:</label>
                    <input type="text" id="reviewer-name" name="reviewer-name" placeholder="Skriv ditt namn här" required />
                    <label htmlFor="reviewer-email">Din e-post:</label>
                    <input type="email" id="reviewer-email" name="reviewer-email" placeholder="Skriv din e-post här" required />
                    <button type="submit">Skicka recension</button>
                </fieldset>
            </form>

        </>
    )

}