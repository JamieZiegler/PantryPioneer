import placeholder from '../../assets/images/placeholder.png';
import Button from '../common/Button.jsx';

export default function HowTo() {
    return (
        <section className="mx-auto flex w-full max-w-(--max-width) flex-col items-center gap-10 px-8 py-20">
            <h2 className="mb-4 text-center text-[clamp(2rem,4vw,3rem)] text-text-main">
                How It Works
            </h2>
            <div className="flex w-full max-w-175 animate-[fadeInUp_0.5s_ease-out_both] flex-col items-center gap-8 rounded-lg bg-surface p-6 text-center shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md sm:flex-row sm:text-left">
                <img src={placeholder} alt="" className="h-20 w-20 shrink-0 rounded-md object-cover" />
                <span className="text-[1.05rem] leading-relaxed text-text-secondary">
                    <strong>1.</strong> Enter the ingredients you have at home or are willing to buy
                </span>
            </div>
            <div className="flex w-full max-w-175 animate-[fadeInUp_0.5s_ease-out_both] [animation-delay:0.1s] flex-col items-center gap-8 rounded-lg bg-surface p-6 text-center shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md sm:flex-row sm:text-left">
                <img src={placeholder} alt="" className="h-20 w-20 shrink-0 rounded-md object-cover" />
                <span className="text-[1.05rem] leading-relaxed text-text-secondary">
                    <strong>2.</strong> Choose the type of recipes you're looking for
                </span>
            </div>
            <div className="flex w-full max-w-175 animate-[fadeInUp_0.5s_ease-out_both] [animation-delay:0.2s] flex-col items-center gap-8 rounded-lg bg-surface p-6 text-center shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md sm:flex-row sm:text-left">
                <img src={placeholder} alt="" className="h-20 w-20 shrink-0 rounded-md object-cover" />
                <span className="text-[1.05rem] leading-relaxed text-text-secondary">
                    <strong>3.</strong> Filter out ingredients or set dietary preferences
                </span>
            </div>
            <div className="flex w-full max-w-175 animate-[fadeInUp_0.5s_ease-out_both] [animation-delay:0.3s] flex-col items-center gap-8 rounded-lg bg-surface p-6 text-center shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md sm:flex-row sm:text-left">
                <img src={placeholder} alt="" className="h-20 w-20 shrink-0 rounded-md object-cover" />
                <span className="text-[1.05rem] leading-relaxed text-text-secondary">
                    <strong>4.</strong> Browse results, save favorites, and start cooking!
                </span>
            </div>
            <Button />
        </section>
    )
}