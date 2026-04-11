import Placeholder from "../../assets/images/placeholder.webp";
import { Star } from "lucide-react";

export default function Review() {
    return (
        <div className="flex max-w-[320px] min-w-70 snap-start flex-col rounded-md bg-surface p-7 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
            <div className="flex h-full flex-col gap-4">
                <div className="flex flex-col items-center gap-3">
                    <img
                        src={Placeholder}
                        alt=""
                        width="48"
                        height="48"
                        className="h-12 w-12 rounded-full border-2 border-primary-subtle object-cover"
                    />
                    <h3 className="text-[1.15rem] text-text-main">
                        &ldquo;Fantastic!&rdquo;
                    </h3>
                </div>
                <div className="flex items-center gap-0.5 text-accent">
                    <span className="sr-only">4 out of 5 stars</span>
                    <Star aria-hidden="true" size={18} fill="currentColor" strokeWidth={1.8} />
                    <Star aria-hidden="true" size={18} fill="currentColor" strokeWidth={1.8} />
                    <Star aria-hidden="true" size={18} fill="currentColor" strokeWidth={1.8} />
                    <Star aria-hidden="true" size={18} fill="currentColor" strokeWidth={1.8} />
                    <Star aria-hidden="true" size={18} strokeWidth={1.8} className="opacity-75" />
                </div>
                <div className="grow text-[0.95rem] leading-relaxed text-text-secondary italic">
                    <p className="text-[0.95rem] leading-relaxed text-text-secondary">
                        This is a fantastic service! Highly recommended for
                        anyone looking to reduce food waste and try new recipes.
                    </p>
                    <div className="text-text-main not-italic">
                        <strong>&mdash; Jane Doe</strong>
                    </div>
                </div>
            </div>
        </div>
    );
}
