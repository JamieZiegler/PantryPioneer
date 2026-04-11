import { useId, useState } from "react";
import { Star } from "lucide-react";

export default function ReviewForm() {
    const ratingIdPrefix = useId();
    const ratingOptions = [5, 4, 3, 2, 1];
    const [submitMessage, setSubmitMessage] = useState("");

    const handleSubmit = (event) => {
        const form = event.currentTarget;

        if (!form.checkValidity()) {
            event.preventDefault();
            setSubmitMessage("Please complete all required fields.");
            form.reportValidity();
            return;
        }

        event.preventDefault();
        setSubmitMessage("Thanks. Your review is ready to submit.");
    };

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
        <form className="card-animated" onSubmit={handleSubmit}>
            <fieldset className="flex flex-col rounded-lg border border-border p-8 max-sm:p-5">
                <legend className="px-1 font-display text-[1.5rem] font-normal text-text-main">
                    Share Your Experience
                </legend>
                {submitMessage ? (
                    <p
                        className="mb-3 text-sm text-text-main"
                        role="status"
                        aria-live="polite"
                    >
                        {submitMessage}
                    </p>
                ) : null}
                <div className="rounded-md border border-error-200 bg-error-50 p-4 pt-2">
                    <p className="border-error-300 text-md mb-3 border-b-2 pb-0.5 text-center font-semibold text-error-700">
                        Please note!
                    </p>
                    <p className="text-error-800 text-sm">
                        This form is for demonstration purposes only and does
                        not actually submit reviews.
                    </p>
                </div>
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
                <fieldset className="mb-3 border-0 p-0">
                    <legend className="form-label">Rating</legend>
                    <div className="flex flex-row flex-wrap items-center justify-start gap-1 max-sm:flex-col max-sm:items-start">
                        {ratingOptions.map((rating) => {
                            const ratingId = `${ratingIdPrefix}-star-${rating}`;

                            return (
                                <label
                                    key={rating}
                                    className="flex cursor-pointer items-center gap-1 rounded-sm px-2 py-1 transition-colors duration-200 focus-within:outline focus-within:outline-primary hover:bg-primary-subtle"
                                    htmlFor={ratingId}
                                >
                                    <input
                                        className="h-4 w-4 cursor-pointer accent-primary"
                                        type="radio"
                                        id={ratingId}
                                        name="review-rating"
                                        value={rating}
                                        required={rating === 5}
                                    />
                                    <span className="sr-only">
                                        {rating} star{rating === 1 ? "" : "s"}
                                    </span>
                                    <span aria-hidden="true">
                                        {renderStars(rating)}
                                    </span>
                                </label>
                            );
                        })}
                    </div>
                </fieldset>
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
                    autoComplete="name"
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
                    autoComplete="email"
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
