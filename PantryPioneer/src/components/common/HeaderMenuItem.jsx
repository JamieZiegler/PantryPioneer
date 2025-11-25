import {Link, useLocation } from 'react-router-dom';

export const HeaderMenuItem = ({ text, link }) => {
    const location = useLocation();

    return (
        <li>
            <Link
                to={link}
                className={`headeranchor ${location.pathname === link ? 'active' : ''}`}
                >
                {text}
            </Link>
        </li>
    )
}

export default HeaderMenuItem;