import HeaderMenuItem from "./HeaderMenuItem";

export default function Header() {
    return (
        <>
            <h1>Header</h1>
            <header className="header">
                <nav>
                    <ul className="nav-links">
                        <HeaderMenuItem text="Hem" link="/" />
                        <HeaderMenuItem text="Receptsök" link="/search" />
                        <HeaderMenuItem text="Skafferi" link="/pantry" />
                        <HeaderMenuItem text="Logga in" link="/login" />
                    </ul>
                </nav>
            </header>
        </>
    )
}