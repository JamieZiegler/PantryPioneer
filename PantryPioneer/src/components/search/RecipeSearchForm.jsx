export default function RecipeSearchForm() {
    return (
        <>
        <div className="search-form">
            <form id="recipe-search-form" action="">
                <details className="collapsible">
                    <summary className="collapsible-summary">Avancerad sökning</summary>
                    
                    {/* collaspible content */}
                    <div className="collapsible-content">
                        <label htmlFor="text-search">Sök i skafferiet</label>
                        <input type="text" id="text-search" name="text-search" placeholder="Sök efter ingredienser, separera med kommatecken..." />
                        <label htmlFor="search-with-pantry">Mitt skafferi</label>
                        <div className="checkbox-group">
                            <label className="item-name">
                                <input type="checkbox" name="search-with-pantry" value="alla" /> Alla
                            </label>
                            <label className="item-name">
                                <input type="checkbox" name="search-with-pantry" value="lök" /> Lök
                            </label>
                            <label className="item-name">
                                <input type="checkbox" name="search-with-pantry" value="tomat" /> Tomat
                            </label>
                            <label className="item-name">
                                <input type="checkbox" name="search-with-pantry" value="vitlök" /> Vitlök
                            </label>
                            <label className="item-name">
                                <input type="checkbox" name="search-with-pantry" value="kyckling" /> Kyckling
                            </label>
                            <label className="item-name">
                                <input type="checkbox" name="search-with-pantry" value="fisk" /> Fisk
                            </label>
                            <label className="item-name">
                                <input type="checkbox" name="search-with-pantry" value="ris" /> Ris
                            </label>
                            <label className="item-name">
                                <input type="checkbox" name="search-with-pantry" value="pasta" /> Pasta
                            </label>
                            <label className="item-name">
                                <input type="checkbox" name="search-with-pantry" value="potatis" /> Potatis
                            </label>
                            <label className="item-name">
                                <input type="checkbox" name="search-with-pantry" value="morot" /> Morot
                            </label>
                            <label className="item-name">
                                <input type="checkbox" name="search-with-pantry" value="paprika" /> Paprika
                            </label>
                            <label className="item-name">
                                <input type="checkbox" name="search-with-pantry" value="svamp" /> Svamp
                            </label>
                            <label className="item-name">
                                <input type="checkbox" name="search-with-pantry" value="ost" /> Ost
                            </label>
                            <label className="item-name">
                                <input type="checkbox" name="search-with-pantry" value="ägg" /> Ägg
                            </label>
                            <label className="item-name">
                                <input type="checkbox" name="search-with-pantry" value="mjölk" /> Mjölk
                            </label>
                            <label className="item-name">
                                <input type="checkbox" name="search-with-pantry" value="smör" /> Smör
                            </label>
                            <label className="item-name">
                                <input type="checkbox" name="search-with-pantry" value="mjöl" /> Mjöl
                            </label>
                            <label className="item-name">
                                <input type="checkbox" name="search-with-pantry" value="socker" /> Socker
                            </label>
                            <label className="item-name">
                                <input type="checkbox" name="search-with-pantry" value="salt" /> Salt
                            </label>
                            <label className="item-name">
                                <input type="checkbox" name="search-with-pantry" value="peppar" /> Peppar
                            </label>
                            <label className="item-name">
                                <input type="checkbox" name="search-with-pantry" value="örter" /> Örter
                            </label>
                            <label className="item-name">
                                <input type="checkbox" name="search-with-pantry" value="kryddor" /> Kryddor
                            </label>
                            <label className="item-name">
                                <input type="checkbox" name="search-with-pantry" value="bönor" /> Bönor
                            </label>
                            <label className="item-name">
                                <input type="checkbox" name="search-with-pantry" value="linser" /> Linser
                            </label>
                            <label className="item-name">
                                <input type="checkbox" name="search-with-pantry" value="nötter" /> Nötter
                            </label>
                            <label className="item-name">
                                <input type="checkbox" name="search-with-pantry" value="frön" /> Frön
                            </label>
                            <label className="item-name">
                                <input type="checkbox" name="search-with-pantry" value="frukt" /> Frukt
                            </label>
                            <label className="item-name">
                                <input type="checkbox" name="search-with-pantry" value="grönsaker" /> Grönsaker
                            </label>
                            <label className="item-name">
                                <input type="checkbox" name="search-with-pantry" value="skaldjur" /> Skaldjur
                            </label>
                            <label className="item-name">
                                <input type="checkbox" name="search-with-pantry" value="nötkött" /> Nötkött
                            </label>
                            <label className="item-name">
                                <input type="checkbox" name="search-with-pantry" value="fläskkött" /> Fläskkött
                            </label>
                        </div>
                        <label htmlFor="ingredient-select">Alla ingredienser</label>
                        <div className="checkbox-group">
                            <label className="item-name">
                                <input type="checkbox" name="ingredient-select" value="tomato" /> Tomat
                            </label>
                            <label className="item-name">
                                <input type="checkbox" name="ingredient-select" value="onion" /> Lök
                            </label>
                            <label className="item-name">
                                <input type="checkbox" name="ingredient-select" value="garlic" /> Vitlök
                            </label>
                            <label className="item-name">
                                <input type="checkbox" name="ingredient-select" value="chicken" /> Kyckling
                            </label>
                            <label className="item-name">
                                <input type="checkbox" name="ingredient-select" value="rice" /> Ris
                            </label>
                            <label className="item-name">
                                <input type="checkbox" name="ingredient-select" value="pasta" /> Pasta
                            </label>
                            <label className="item-name">
                                <input type="checkbox" name="ingredient-select" value="potato" /> Potatis
                            </label>
                            <label className="item-name">
                                <input type="checkbox" name="ingredient-select" value="carrot" /> Morot
                            </label>
                            <label className="item-name">
                                <input type="checkbox" name="ingredient-select" value="bell-pepper" /> Paprika
                            </label>
                            <label className="item-name">
                                <input type="checkbox" name="ingredient-select" value="mushroom" /> Svamp
                            </label>
                            <label className="item-name">
                                <input type="checkbox" name="ingredient-select" value="cheese" /> Ost
                            </label>
                            <label className="item-name">
                                <input type="checkbox" name="ingredient-select" value="eggs" /> Ägg
                            </label>
                            <label className="item-name">
                                <input type="checkbox" name="ingredient-select" value="milk" /> Mjölk
                            </label>
                            <label className="item-name"> 
                                <input type="checkbox" name="ingredient-select" value="butter" /> Smör
                            </label>
                            <label className="item-name">
                                <input type="checkbox" name="ingredient-select" value="flour" /> Mjöl
                            </label>
                            <label className="item-name">
                                <input type="checkbox" name="ingredient-select" value="sugar" /> Socker
                            </label>
                            <label className="item-name">
                                <input type="checkbox" name="ingredient-select" value="salt" /> Salt
                            </label>
                            <label className="item-name">
                                <input type="checkbox" name="ingredient-select" value="pepper" /> Peppar
                            </label>
                            <label className="item-name">
                                <input type="checkbox" name="ingredient-select" value="herbs" /> Örter
                            </label>
                            <label className="item-name">
                                <input type="checkbox" name="ingredient-select" value="spices" /> Kryddor
                            </label>
                            <label className="item-name">
                                <input type="checkbox" name="ingredient-select" value="beans" /> Bönor
                            </label>
                            <label className="item-name">
                                <input type="checkbox" name="ingredient-select" value="lentils" /> Linser
                            </label>
                            <label className="item-name">
                                <input type="checkbox" name="ingredient-select" value="nuts" /> Nötter
                            </label>
                            <label className="item-name">
                                <input type="checkbox" name="ingredient-select" value="seeds" /> Frön
                            </label>
                            <label className="item-name">
                                <input type="checkbox" name="ingredient-select" value="fruits" /> Frukt
                            </label>
                            <label className="item-name">
                                <input type="checkbox" name="ingredient-select" value="vegetables" /> Grönsaker
                            </label>
                            <label className="item-name">
                                <input type="checkbox" name="ingredient-select" value="seafood" /> Skaldjur
                            </label>
                            <label className="item-name">
                                <input type="checkbox" name="ingredient-select" value="beef" /> Nötkött
                            </label>
                            <label className="item-name">
                                <input type="checkbox" name="ingredient-select" value="pork" /> Fläskkött
                            </label>
                            <label className="item-name">
                                <input type="checkbox" name="ingredient-select" value="lamb" /> Lammkött
                            </label>
                            <label className="item-name">
                                <input type="checkbox" name="ingredient-select" value="tofu" /> Tofu
                            </label>
                            <label className="item-name">
                                <input type="checkbox" name="ingredient-select" value="tempeh" /> Tempeh
                            </label>
                            <label className="item-name">
                                <input type="checkbox" name="ingredient-select" value="seitan" /> Seitan
                            </label>
                        </div>
                        <label htmlFor="dietary-preferences title">Kostpreferenser</label>
                        <div className="checkbox-group no-scroll">
                            <label className="diet-name">
                                <input type="checkbox" name="dietary-preferences" value="none" /> Inga
                            </label>
                            <label className="diet-name">
                                <input type="checkbox" name="dietary-preferences" value="vegetarian" /> Vegetarisk
                            </label>
                            <label className="diet-name">
                                <input type="checkbox" name="dietary-preferences" value="vegan" /> Vegan
                            </label>
                            <label className="diet-name">
                                <input type="checkbox" name="dietary-preferences" value="gluten-free" /> Glutenfri
                            </label>
                            <label className="diet-name">
                                <input type="checkbox" name="dietary-preferences" value="dairy-free" /> Laktosfri
                            </label>
                            <label className="diet-name">
                                <input type="checkbox" name="dietary-preferences" value="nut-free" /> Nötfri
                            </label>
                            <label className="diet-name">
                                <input type="checkbox" name="dietary-preferences" value="halal" /> Halal
                            </label>
                            <label className="diet-name">
                                <input type="checkbox" name="dietary-preferences" value="kosher" /> Kosher
                            </label>
                        </div>
                        <label htmlFor="type-of-recipe title">Typ av recept</label>
                        <div className="checkbox-group no-scroll">
                            <label className="recipe-type">
                                <input type="checkbox" name="type-of-recipe" value="all" /> Alla
                            </label>
                            <label className="recipe-type">
                                <input type="checkbox" name="type-of-recipe" value="bakery" /> Bakverk
                            </label>
                            <label className="recipe-type">
                                <input type="checkbox" name="type-of-recipe" value="breakfast" /> Frukost
                            </label>
                            <label className="recipe-type">
                                <input type="checkbox" name="type-of-recipe" value="dessert" /> Efterrätt
                            </label>
                            <label className="recipe-type">
                                <input type="checkbox" name="type-of-recipe" value="main-course" /> Huvudrätt
                            </label>
                            <label className="recipe-type">
                                <input type="checkbox" name="type-of-recipe" value="salad" /> Sallad
                            </label>
                            <label className="recipe-type">
                                <input type="checkbox" name="type-of-recipe" value="soup" /> Soppa
                            </label>
                        </div>
                        <div className="chosen-filters">
                            <strong>Valda filter:</strong> Inga
                        </div>
                        <button type="submit">Sök</button>
                    </div>
                    
                </details>

            </form>
            
            <form id="recipe-search-bar" action="">
                <details className="collapsible">
                    <summary className="collapsible-summary">Enkel sökning</summary>
                    <div className="collapsible-content">
                        <label htmlFor="search-bar-input">Sök med receptnamn</label>
                        <input type="text" id="search-bar-input" name="search-bar-input" placeholder="Sök efter recept..." />
                        <button type="submit">Sök</button>
                    </div>

                </details>

            </form>
        </div>
        </>
    )
}