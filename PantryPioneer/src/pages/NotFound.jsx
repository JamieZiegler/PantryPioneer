import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="mx-auto flex w-full max-w-150 animate-[fadeInUp_0.4s_ease-out_both] flex-col items-center gap-6 px-8 py-32 text-center">
            <h1 className="m-0 text-[clamp(5rem,12vw,8rem)] leading-none text-primary-subtle">
                404
            </h1>
            <h2 className="m-0 text-[1.75rem]">Page Not Found</h2>
            <p className="max-w-100 leading-[1.7]">The page you're looking for doesn't exist or has been moved.</p>
            <Link 
                to="/" 
                className="inline-flex items-center gap-2 rounded-sm bg-primary px-8 py-3 font-body text-[0.95rem] font-semibold text-white no-underline transition-all duration-200 hover:-translate-y-px hover:bg-primary-dark hover:text-white hover:shadow-md"
            >
                Back to Home
            </Link>
        </div>
    )
}