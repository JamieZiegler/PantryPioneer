import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
    Search,
    User,
    Heart,
    LogOut,
    ChevronsLeft,
    ChevronsRight,
    LogIn,
} from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import logo1 from "../../assets/images/icons/logotyp.svg";

export default function Header() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [slideoutOpen, setSlideoutOpen] = useState(false);

    const handleLogout = async () => {
        await logout();
        setSlideoutOpen(false);
        navigate("/");
    };

    return (
        <header className="sticky top-0 z-100 flex h-16 w-full justify-center bg-primary-dark shadow-md">
            <nav className="mx-auto h-full w-full max-w-(--max-width) px-4 sm:px-8">
                <ul className="grid h-full w-full grid-cols-[1fr_auto_1fr] items-stretch">
                    <li className="flex h-full items-stretch justify-start">
                        <NavLink
                            to="/search"
                            className={({ isActive }) =>
                                `nav-link${isActive ? " is-active" : ""}`
                            }
                        >
                            <Search className="nav-icon" />
                            <span className="hidden-tablet-down">Search</span>
                        </NavLink>
                    </li>
                    <li className="flex h-full items-stretch justify-center">
                        <NavLink
                            to="/"
                            end
                            className={({ isActive }) =>
                                `logo-link${isActive ? " is-active" : ""}`
                            }
                        >
                            <img
                                src={logo1}
                                alt="Logo"
                                className="relative z-0 h-12 w-auto min-w-12 object-contain"
                            />
                        </NavLink>
                    </li>
                    <li className="flex h-full items-stretch justify-end">
                        {!user ? (
                            <NavLink
                                to="/login"
                                className={({ isActive }) =>
                                    `nav-link${isActive ? " is-active" : ""}`
                                }
                            >
                                <LogIn className="nav-icon" />
                                <span className="hidden-tablet-down">
                                    Log in
                                </span>
                            </NavLink>
                        ) : (
                            <div className="flex h-full items-stretch justify-end">
                                <NavLink
                                    to="/account"
                                    className={({ isActive }) =>
                                        `nav-link${isActive ? " is-active" : ""}`
                                    }
                                    type="button"
                                    aria-expanded="false"
                                    aria-label="Expand account actions"
                                >
                                    <User className="nav-icon" />
                                    <span className="hidden-tablet-down">
                                        Account
                                    </span>
                                </NavLink>

                                <div
                                    className={`slide-container ${slideoutOpen ? "max-w-152 translate-x-0 opacity-100 delay-75" : "max-w-0 translate-x-2 opacity-0 delay-0"}`}
                                >
                                    <div className="flex h-full items-stretch">
                                        <div
                                            className={`slide-favorites ${slideoutOpen ? "max-w-48 translate-x-0 opacity-100 delay-75" : "max-w-0 translate-x-2 opacity-0 delay-0"}`}
                                        >
                                            <NavLink
                                                to="/favorites"
                                                className={({ isActive }) =>
                                                    `account-action${isActive ? " is-active" : ""}`
                                                }
                                            >
                                                <Heart className="account-icon" />
                                                <span className="hidden-tablet-down">
                                                    Favorites
                                                </span>
                                            </NavLink>
                                        </div>

                                        <div
                                            className={`slide-logout ${slideoutOpen ? "max-w-44 translate-x-0 opacity-100 delay-200" : "max-w-0 translate-x-2 opacity-0 delay-0"}`}
                                        >
                                            <button
                                                onClick={handleLogout}
                                                className="account-action"
                                                type="button"
                                            >
                                                <LogOut className="account-icon" />
                                                <span className="hidden-tablet-down">
                                                    Log out
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={() =>
                                        setSlideoutOpen(!slideoutOpen)
                                    }
                                    type="button"
                                    className="toggle-button group"
                                    aria-label={
                                        slideoutOpen
                                            ? "Collapse account actions"
                                            : "Expand account actions"
                                    }
                                >
                                    {slideoutOpen ? (
                                        <ChevronsRight
                                            className="toggle-icon group-hover:translate-x-1"
                                            strokeWidth={1.5}
                                        />
                                    ) : (
                                        <ChevronsLeft
                                            className="toggle-icon group-hover:-translate-x-1"
                                            strokeWidth={1.5}
                                        />
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
