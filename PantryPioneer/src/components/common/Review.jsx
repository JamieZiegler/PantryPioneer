import Placeholder from '../../assets/images/placeholder.png';

export default function Review() {
    return (
        <div className="review">
            <div className="review-content">
                <div className="review-header">
                    <img 
                        src={Placeholder}
                        alt=""
                        className="review-avatar"
                    />
                    <h3>&ldquo;Fantastic!&rdquo;</h3>
                </div>
                <div className="review-stars">
                    &#9733;&#9733;&#9733;&#9733;&#9734;
                </div>
                <div className="review-text">
                    <p>This is a fantastic service! Highly recommended for anyone looking to reduce food waste and try new recipes.</p>
                    <div className="reviewer-name">
                        <strong>&mdash; Jane Doe</strong>
                    </div>
                </div>
            </div>
        </div>
    )
}