import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
    Search,
    User,
    Package,
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
                            aria-label="Search recipes"
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
                            aria-label="Home"
                            className={({ isActive }) =>
                                `logo-link${isActive ? " is-active" : ""}`
                            }
                        >
                            <img
                                src={logo1}
                                alt="Logo"
                                width="52"
                                height="52"
                                className="relative z-0 h-12 w-auto min-w-12 object-contain"
                            />
                        </NavLink>
                    </li>
                    <li className="flex h-full items-stretch justify-end">
                        {!user ? (
                            <NavLink
                                to="/login"
                                aria-label="Log in | Register"
                                className={({ isActive }) =>
                                    `nav-link${isActive ? " is-active" : ""}`
                                }
                            >
                                <LogIn className="nav-icon" />
                                <span className="hidden-tablet-down">
                                    Log in | Register
                                </span>
                            </NavLink>
                        ) : (
                            <div className="flex h-full items-stretch justify-end">
                                <NavLink
                                    to="/pantry"
                                    aria-label="Pantry"
                                    className={({ isActive }) =>
                                        `nav-link${isActive ? " is-active" : ""}`
                                    }
                                >
                                    <Package className="nav-icon" />
                                    <span className="hidden-tablet-down">
                                        Pantry
                                    </span>
                                </NavLink>

                                <div
                                    className={`slide-container ${slideoutOpen ? "max-w-120 translate-x-0 opacity-100 delay-75" : "max-w-0 translate-x-2 opacity-0 delay-0"}`}
                                >
                                    <div className="flex h-full items-stretch">
                                        <div
                                            className={`slide-favorites ${slideoutOpen ? "max-w-44 translate-x-0 opacity-100 delay-75" : "max-w-0 translate-x-2 opacity-0 delay-0"}`}
                                        >
                                            <NavLink
                                                to="/account"
                                                aria-label="Account"
                                                className={({ isActive }) =>
                                                    `account-action${isActive ? " is-active" : ""}`
                                                }
                                            >
                                                <User className="account-icon" />
                                                <span className="hidden-tablet-down">
                                                    Account
                                                </span>
                                            </NavLink>
                                        </div>

                                        <div
                                            className={`slide-logout ${slideoutOpen ? "max-w-44 translate-x-0 opacity-100 delay-150" : "max-w-0 translate-x-2 opacity-0 delay-0"}`}
                                        >
                                            <button
                                                onClick={handleLogout}
                                                className="account-action"
                                                type="button"
                                                aria-label="Log out"
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
