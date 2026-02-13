import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <>
            <a href="#main-content" className="skip-link">Skip to content</a>
            <Header />
            <main id="main-content" className="page-content">
                <Outlet />
            </main>
            <Footer />
        </>
    )
}