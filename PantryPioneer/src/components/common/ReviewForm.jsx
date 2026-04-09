import { Star } from "lucide-react";

export default function ReviewForm() {
    const renderStars = (count) => (
        <span
            className="flex items-center gap-0.5 text-accent"
            aria-hidden="true"
        >
            {Array.from({ length: count }).map((_, idx) => (
                <Star
                    key={idx}
                    size={18}
                    fill="currentColor"
                    strokeWidth={1.8}
                />
            ))}
        </span>
    );

    return (
        <form className="card-animated">
            <fieldset className="flex flex-col rounded-lg border border-border p-8 max-sm:p-5">
                <legend className="px-1 font-display text-[1.5rem] font-normal text-text-main">
                    Share Your Experience
                </legend>
                <label className="form-label" htmlFor="review-title">
                    Review Title
                </label>
                <input
                    className="form-input mb-1"
                    type="text"
                    id="review-title"
                    name="review-title"
                    placeholder="Give your review a title"
                    required
                />
                <label className="form-label" htmlFor="review-rating">
                    Rating
                </label>
                <div className="mb-3 flex flex-row flex-wrap items-center justify-start gap-1 max-sm:flex-col max-sm:items-start">
                    <div className="flex cursor-pointer items-center gap-1 rounded-sm px-2 py-1 transition-colors duration-200 hover:bg-primary-subtle">
                        <input
                            className="h-4 w-4 cursor-pointer accent-primary"
                            type="radio"
                            id="star5"
                            name="review-rating"
                            value="5"
                        />
                        <label className="cursor-pointer" htmlFor="star5">
                            {renderStars(5)}
                        </label>
                    </div>
                    <div className="flex cursor-pointer items-center gap-1 rounded-sm px-2 py-1 transition-colors duration-200 hover:bg-primary-subtle">
                        <input
                            className="h-4 w-4 cursor-pointer accent-primary"
                            type="radio"
                            id="star4"
                            name="review-rating"
                            value="4"
                        />
                        <label className="cursor-pointer" htmlFor="star4">
                            {renderStars(4)}
                        </label>
                    </div>
                    <div className="flex cursor-pointer items-center gap-1 rounded-sm px-2 py-1 transition-colors duration-200 hover:bg-primary-subtle">
                        <input
                            className="h-4 w-4 cursor-pointer accent-primary"
                            type="radio"
                            id="star3"
                            name="review-rating"
                            value="3"
                        />
                        <label className="cursor-pointer" htmlFor="star3">
                            {renderStars(3)}
                        </label>
                    </div>
                    <div className="flex cursor-pointer items-center gap-1 rounded-sm px-2 py-1 transition-colors duration-200 hover:bg-primary-subtle">
                        <input
                            className="h-4 w-4 cursor-pointer accent-primary"
                            type="radio"
                            id="star2"
                            name="review-rating"
                            value="2"
                        />
                        <label className="cursor-pointer" htmlFor="star2">
                            {renderStars(2)}
                        </label>
                    </div>
                    <div className="flex cursor-pointer items-center gap-1 rounded-sm px-2 py-1 transition-colors duration-200 hover:bg-primary-subtle">
                        <input
                            className="h-4 w-4 cursor-pointer accent-primary"
                            type="radio"
                            id="star1"
                            name="review-rating"
                            value="1"
                        />
                        <label className="cursor-pointer" htmlFor="star1">
                            {renderStars(1)}
                        </label>
                    </div>
                </div>
                <label className="form-label" htmlFor="review-content">
                    Your Review
                </label>
                <textarea
                    className="form-input mb-1"
                    id="review-content"
                    name="review-content"
                    rows="4"
                    placeholder="Tell us about your experience..."
                    required
                ></textarea>
                <label className="form-label" htmlFor="reviewer-name">
                    Name
                </label>
                <input
                    className="form-input mb-1"
                    type="text"
                    id="reviewer-name"
                    name="reviewer-name"
                    placeholder="Your name"
                    required
                />
                <label className="form-label" htmlFor="reviewer-email">
                    Email
                </label>
                <input
                    className="form-input mb-1"
                    type="email"
                    id="reviewer-email"
                    name="reviewer-email"
                    placeholder="your@email.com"
                    required
                />
                <button
                    className="mt-4 w-fit cursor-pointer rounded-sm border-none bg-primary px-8 py-3 font-body text-[0.95rem] font-semibold tracking-[0.02em] text-text-on-primary transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary-dark hover:shadow-md active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
                    type="submit"
                >
                    Submit Review
                </button>
            </fieldset>
        </form>
    );
}
