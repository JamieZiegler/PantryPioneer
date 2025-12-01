import placeholder from '../../assets/images/placeholder.png';
import Button from '../common/Button.jsx';
export default function HowTo() {
    return (
        <>
            <h2>Hur funkar det?</h2>
            <div className="how-to-steps">
                <div className="step">
                    <img src={placeholder} alt="Step 1" />
                    <span>
                        1. Ange de ingredienser du har hemma (eller är villig att handla hem)
                    </span>
                </div>
                <div className="step">
                    <span>
                        2. Välj vilken eller vilka typer av recept du är ute efter
                    </span>
                    <img src={placeholder} alt="Step 2" />
                </div>
                <div className="step">
                    <img src={placeholder} alt="Step 3" />
                    <span>
                        3. Bestäm om recepten får innehålla ingredienser som du inte har angett
                    </span>
                </div>
                <div className="step">
                    <span>
                        4. Bläddra bland resultaten, spara favoriter, och laga något riktigt gott!
                    </span>
                    <img src={placeholder} alt="Step 4" />
                </div>
                <Button/>
            </div>
        </>
    )
}