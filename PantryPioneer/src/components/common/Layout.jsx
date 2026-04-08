import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <>
            <a href="#main-content" className="absolute left-4 -top-full z-200 rounded-sm bg-primary px-6 py-3 font-semibold text-white transition-[top] duration-200 focus:top-3">
                Skip to content
            </a>
            <Header />
            <main id="main-content">
                <Outlet />
            </main>
            <Footer />
        </>
    )
}