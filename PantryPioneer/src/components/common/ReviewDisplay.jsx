import Review from "./Review.jsx";
import ReviewForm from "./ReviewForm.jsx";

export default function ReviewDisplay() {
    return (
        <section className="flex w-full max-w-(--max-width) flex-col items-center gap-12 px-8 pt-12 pb-20">
            <div className="w-full animate-[fadeInUp_0.4s_ease-out_both] rounded-lg bg-primary-dark px-8 py-12 text-center shadow-lg">
                <h2 className="mb-8 text-white">What Our Users Say</h2>
                <div className="flex w-full snap-x snap-mandatory items-stretch justify-start gap-6 overflow-x-auto overflow-y-hidden p-2 [scrollbar-color:rgba(255,255,255,0.3)_transparent] [scrollbar-width:thin] [&::-webkit-scrollbar-thumb]:rounded-[3px] [&::-webkit-scrollbar-thumb]:bg-white/30 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar]:h-1.5">
                    <Review />
                    <Review />
                    <Review />
                    <Review />
                </div>
            </div>
            <ReviewForm />
        </section>
    )
}