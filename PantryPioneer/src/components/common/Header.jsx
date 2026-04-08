import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, User, Heart, LogOut, ChevronsLeft, ChevronsRight, LogIn} from "lucide-react";
import { useAuth } from "../hooks/useAuth"; 
import logo1 from '../../assets/images/icons/logotyp.svg';

export default function Header() {
    const styles = {
        navLink: "group relative flex h-full items-center gap-3 px-3 min-[981px]:px-2 font-body font-light text-[0.95rem] !text-white transition-all duration-200 cursor-pointer after:content-[''] after:absolute after:bottom-0 after:inset-x-0 after:h-[3px] after:bg-accent after:z-10 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300",
        icon: "h-7 w-7 min-[981px]:h-6 min-[981px]:w-6 transition-transform duration-200",
        logoLink: "relative flex h-full items-center px-3 cursor-pointer after:content-[''] after:absolute after:bottom-0 after:inset-x-0 after:h-[3px] after:bg-accent after:z-10 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300",
        accountAction: "group relative flex h-full items-center gap-2.5 px-3 min-[981px]:px-2 font-body font-light text-[0.95rem] !text-white whitespace-nowrap transition-all duration-200 cursor-pointer after:content-[''] after:absolute after:bottom-0 after:inset-x-0 after:h-[3px] after:bg-accent after:z-10 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300",
        accountIcon: "h-6 w-6 min-[981px]:h-5 min-[981px]:w-5",
        toggleButton: "group relative flex h-full items-center px-4 min-[981px]:px-3 text-white/50 hover:text-white duration-200 transition-colors cursor-pointer",
        toggleIcon: "h-7 w-8 min-[981px]:h-6 min-[981px]:w-7 transition-transform duration-200 ease-out",
        slideContainer: "overflow-hidden transition-[max-width,opacity,transform] duration-400 ease-out",
        slideFavorites: "overflow-hidden transition-[max-width,opacity,transform] duration-400 ease-out",
        slideLogout: "overflow-hidden transition-[max-width,opacity,transform] duration-300 ease-out",
    };

    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [slideoutOpen, setSlideoutOpen] = useState(false);

    const handleLogout = async () => {
        await logout();
        setSlideoutOpen(false);
        navigate('/'); 
    };

    return (
        <header className="sticky top-0 z-100 h-16 flex w-full justify-center bg-primary-dark shadow-md">
            <nav className="mx-auto h-full w-full max-w-(--max-width) px-4 sm:px-8">
                <ul className="grid h-full w-full grid-cols-[1fr_auto_1fr] items-stretch"> 
                    <li className="flex h-full items-stretch justify-start">
                        <Link to="/search" className={styles.navLink}>
                            <Search className={styles.icon} />
                            <span className="max-[980px]:hidden">Search</span>
                        </Link>
                    </li>
                    <li className="flex h-full items-stretch justify-center">
                        <Link to="/" className={styles.logoLink}>
                            <img 
                                src={logo1} 
                                alt="Logo" 
                                className="h-12 w-auto min-w-12 object-contain relative z-0" 
                            />
                        </Link>
                    </li>
                    <li className="flex h-full items-stretch justify-end">
                        {!user ? (
                            <Link to="/login" className={styles.navLink}>
                                <LogIn className={styles.icon} />
                                <span className="max-[980px]:hidden">Log in</span>
                            </Link>
                        ) : (
                            <div className="flex h-full items-stretch justify-end">
                                <Link
                                    to="/account"
                                    className={styles.navLink}
                                    type="button"
                                    aria-expanded="false"
                                    aria-label="Expand account actions"
                                >
                                    <User className={styles.icon} />
                                    <span className="max-[980px]:hidden">Account</span>
                                </Link>

                                <div className={`${styles.slideContainer} ${slideoutOpen ? 'max-w-152 opacity-100 translate-x-0 delay-75' : 'max-w-0 opacity-0 translate-x-2 delay-0'}`}>
                                    <div className="flex h-full items-stretch">
                                        <div className={`${styles.slideFavorites} ${slideoutOpen ? 'max-w-48 opacity-100 translate-x-0 delay-75' : 'max-w-0 opacity-0 translate-x-2 delay-0'}`}>
                                            <Link to="/favorites" className={styles.accountAction}>
                                                <Heart className={styles.accountIcon} />
                                                <span className="max-[980px]:hidden">Favorites</span>
                                            </Link>
                                        </div>

                                        <div className={`${styles.slideLogout} ${slideoutOpen ? 'max-w-44 opacity-100 translate-x-0 delay-200' : 'max-w-0 opacity-0 translate-x-2 delay-0'}`}>
                                            <button
                                                onClick={handleLogout}
                                                className={styles.accountAction}
                                                type="button"
                                            >
                                                <LogOut className={styles.accountIcon} />
                                                <span className="max-[980px]:hidden">Log out</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => setSlideoutOpen(!slideoutOpen)}
                                    type="button"
                                    className={styles.toggleButton}
                                    aria-label={slideoutOpen ? "Collapse account actions" : "Expand account actions"}
                                >
                                    {slideoutOpen ? (
                                        <ChevronsRight className={`${styles.toggleIcon} group-hover:translate-x-1`} strokeWidth={1.5} />
                                    ) : (
                                        <ChevronsLeft className={`${styles.toggleIcon} group-hover:-translate-x-1`} strokeWidth={1.5} />
                                    )}
                                </button>
                            </div>
                        )}
                    </li>
                </ul>
            </nav>
        </header>
    );
}