import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}

export default function Layout() {
    return (
        <>
            <ScrollToTop />
            <a
                href="#main-content"
                className="absolute -top-full left-4 z-200 rounded-sm bg-primary px-6 py-3 font-semibold text-white transition-[top] duration-200 focus:top-3"
            >
                Skip to content
            </a>
            <Header />
            <main id="main-content">
                <Outlet />
            </main>
            <Footer />
        </>
    );
}
