import HeaderMenuItem from "./HeaderMenuItem";
import search from '../../assets/images/icons/Search.svg';
import login from '../../assets/images/icons/Log-in.svg';
import logo1 from '../../assets/images/icons/Logotyp.svg';

export default function Header() {
    return (
        <header className="header">
            <nav className="nav">
                <ul className="nav-links">
                    <HeaderMenuItem 
                        text="Search" 
                        link="/search" 
                        iconSrc={search} 
                    />
                    <HeaderMenuItem 
                        text="Home" 
                        link="/" 
                        iconSrc={logo1}
                        iconClass="home-icon"
                    />
                    <HeaderMenuItem 
                        text="Log in" 
                        link="/login" 
                        iconSrc={login} 
                    />
                </ul>
            </nav>
        </header>
    )
}