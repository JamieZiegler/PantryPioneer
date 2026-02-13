import placeholder from '../../assets/images/placeholder.png';
import Button from '../common/Button.jsx';

export default function HowTo() {
    return (
        <section className="how-to-steps">
            <h2>How It Works</h2>
            <div className="step">
                <img src={placeholder} alt="" />
                <span>
                    <strong>1.</strong> Enter the ingredients you have at home or are willing to buy
                </span>
            </div>
            <div className="step">
                <img src={placeholder} alt="" />
                <span>
                    <strong>2.</strong> Choose the type of recipes you're looking for
                </span>
            </div>
            <div className="step">
                <img src={placeholder} alt="" />
                <span>
                    <strong>3.</strong> Filter out ingredients or set dietary preferences
                </span>
            </div>
            <div className="step">
                <img src={placeholder} alt="" />
                <span>
                    <strong>4.</strong> Browse results, save favorites, and start cooking!
                </span>
            </div>
            <Button />
        </section>
    )
}