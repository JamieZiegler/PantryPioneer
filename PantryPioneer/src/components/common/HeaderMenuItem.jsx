import {Link, useLocation } from 'react-router-dom';

export const HeaderMenuItem = ({ text, link, iconSrc, iconClass }) => {
    const location = useLocation();
    const isActive = location.pathname === link;

    return (
        <li>
            <Link
                to={link}
                className={`headeranchor ${isActive ? 'active' : ''}`}
                aria-label={text}
                title={text}
            >
                {iconSrc ? (
                    <img
                        src={iconSrc}
                        alt={text}
                        className={`menu-icon ${iconClass || ""}`}
                    />
                ) : text}
            </Link>
        </li>
    )
}

export default HeaderMenuItem;