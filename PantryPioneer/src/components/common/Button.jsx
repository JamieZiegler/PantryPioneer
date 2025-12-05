import { useNavigate } from "react-router-dom";

export default function Button() {
    const navigate = useNavigate();

    return (
        <button
            type="button"
            className="recipe btn"
            onClick={() => navigate('/search')}
        >
            Search Recipe
        </button>
    )
}