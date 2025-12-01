import Placeholder from "../../assets/images/placeholder.png";

export default function RecipeCard() {
    return (
        <>
            <div className="recipe-card">
                <img className="recipe-image-preview" src={Placeholder} alt="Recipe" />
                <div className="recipe-card-content">
                    
                    <div className="recipe-details">
                        <h3>Receptnamn</h3>
                        <p className="ingredient-count">5 av 7 ingredienser</p>
                        <p className="recipe-summary">Kort beskrivning av receptet...</p>
                    </div>
                    
                    
                    <div className="allergen-and-diet-info">
                        <p>Allergener: Gluten, Nötter</p>
                        <p>Kost: Vegetarisk</p>
                    </div>

                    <div className="cta-recipe">
                        <a href="#">Gå till recept...</a>
                    </div>

                </div>
                
                
            </div>
        </>
    )
}