import { FaSquareInstagram, FaSquareFacebook, FaLinkedin } from "react-icons/fa6";



export default function Footer() {
    return (
        <footer className="mt-auto flex w-full flex-col items-center justify-around gap-6 bg-text-main px-8 py-12 text-center text-[0.9rem] text-white/70 md:flex-row md:flex-wrap">
            <div className="flex flex-col items-center justify-center gap-3 md:flex-row md:gap-6">
                <a href="/about" className="text-[0.9rem] font-medium text-accent/70 transition-colors duration-200 hover:text-accent">
                    About
                </a>
                <a href="/contact" className="text-[0.9rem] font-medium text-accent/70 transition-colors duration-200 hover:text-accent">
                    Contact
                </a>
                <a href="/privacy" className="text-[0.9rem] font-medium text-accent/70 transition-colors duration-200 hover:text-accent">
                    Terms &amp; Privacy
                </a>
            </div>
            <p className="text-[0.85rem] text-white/50">&copy; {new Date().getFullYear()} PantryPioneer. All rights reserved.</p>
            <div className="flex gap-4">
                <a href="#" aria-label="Facebook">
                    <FaSquareFacebook className="h-9 w-9 text-accent opacity-70 transition-all duration-200 hover:-translate-y-0.5 hover:opacity-100" />
                </a>
                <a href="#" aria-label="Instagram">
                    <FaSquareInstagram className="h-9 w-9 text-accent opacity-70 transition-all duration-200 hover:-translate-y-0.5 hover:opacity-100" />
                </a>
                <a href="#" aria-label="LinkedIn">
                    <FaLinkedin className="h-9 w-9 text-accent opacity-70 transition-all duration-200 hover:-translate-y-0.5 hover:opacity-100" />
                </a>
            </div>
        </footer>
    )
}