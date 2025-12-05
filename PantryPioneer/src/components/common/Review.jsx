import Placeholder from '../../assets/images/placeholder.png';

export default function Review() {
    return (
        <>
            <div className="review">
                <div className="review-content">
                    <div className="review-header">
                        <div className="review-title">
                            <h3>"Fantastic!"</h3>
                        </div>
                        <img 
                            src={Placeholder}
                            alt="User Avatar"
                            className="review-avatar"
                        />
                    </div>
                    <div className="review-stars">
                        ★★★★☆
                    </div>
                    <div className="review-text">
                        <div className="reviewer-name">
                            <strong>- Jane Doe</strong>
                        </div>
                        <p>This is a fantastic service! Highly recommended.</p>
                    </div>
                </div>
                
            </div>
        </>
    )
}