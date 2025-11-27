import HeaderMenuItem from "./HeaderMenuItem";
import logo from '../../assets/images/icons/Logotyp.svg';
import search from '../../assets/images/icons/Search.svg';
import login from '../../assets/images/icons/Log-in.svg';
import logo2 from '../../assets/images/icons/Logotyp2.svg';
export default function Header() {
    return (
        <>
            <header className="header">
                <nav className="nav">
                    <ul className="nav-links">
                        

                        <HeaderMenuItem 
                            text="Receptsök" 
                            link="/search" 
                            iconSrc={search} 
                        />
                        <HeaderMenuItem 
                            text="Hem" 
                            link="/" 
                            iconSrc={logo2}
                            iconClass="home-icon"
                        />
                        {/* <HeaderMenuItem text="Skafferi" link="/pantry" /> */}
                        <HeaderMenuItem 
                            text="Logga in" 
                            link="/login" 
                            iconSrc={login} 
                        />
                    </ul>
                </nav>
            </header>
        </>
    )
}