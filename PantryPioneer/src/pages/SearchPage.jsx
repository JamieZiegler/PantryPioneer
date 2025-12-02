// Receptsökaren
import RecipeSearchForm from "../components/search/RecipeSearchForm.jsx";
import RecipeResults from "../components/search/RecipeResults.jsx";
export default function SearchPage() {
    return (
        <>
        <div className="search-page">
            <h2>Receptsökaren</h2>
            <div className="search-introduction">
                <p>
                    I receptsökaren kan du söka efter recept genom att välja de ingredienser 
                    du har hemma, eller vill använda, i formuläret. Det går också bra att 
                    fritextsöka om någon ingrediens saknas. Om du bara är ute efter ett specifikt
                    recept kan du också söka på receptnamnet.
                </p>
                <p>
                    Som inloggad användare kan du även söka efter recept med delar av, eller hela,
                    ditt personliga skafferi. Samt spara favoritrecept för snabb åtkomst senare.
                </p>
            </div>
            <RecipeSearchForm />
            <RecipeResults />
        </div>
        </>
    )
}