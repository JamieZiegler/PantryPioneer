import { useNavigate } from "react-router-dom";

export default function Button() {
    const navigate = useNavigate();

    return (
        <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg border-none bg-primary-subtle px-9 py-3.5 font-body text-[1.05rem] font-semibold tracking-[0.02em] text-primary shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary hover:text-text-on-primary hover:shadow-lg active:translate-y-0 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-3"
            onClick={() => navigate('/search')}
        >
            Find Recipes
        </button>
    )
}