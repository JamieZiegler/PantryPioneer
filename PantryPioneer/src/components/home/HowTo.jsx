import placeholder from '../../assets/images/placeholder.png';
import Button from '../common/Button.jsx';
export default function HowTo() {
    return (
        <>
            <h2>How does it work?</h2>
            <div className="how-to-steps">
                <div className="step">
                    <img src={placeholder} alt="Step 1" />
                    <span>
                        1. Enter the ingredients you have at home (or are willing to buy)
                    </span>
                </div>
                <div className="step">
                    <span>
                        2. Choose the type(s) of recipes you are looking for
                    </span>
                    <img src={placeholder} alt="Step 2" />
                </div>
                <div className="step">
                    <img src={placeholder} alt="Step 3" />
                    <span>
                        3. Decide if you want to exclude certain ingredients or dietary preferences
                    </span>
                </div>
                <div className="step">
                    <span>
                        4. Browse the results, save favorites, and cook something really delicious!
                    </span>
                    <img src={placeholder} alt="Step 4" />
                </div>
                <Button/>
            </div>
        </>
    )
}