import { Link } from "react-router-dom";

export default function Breadcrumbs({ backTarget, backLabel, currentLabel }) {
    return (
        <nav className="w-full" aria-label="Breadcrumb">
            <ol className="m-0 flex list-none items-center gap-2 p-0 text-sm text-text-secondary">
                <li>
                    <Link
                        to={backTarget}
                        className="font-semibold text-primary no-underline transition-colors hover:text-primary-dark"
                    >
                        {backLabel}
                    </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="max-w-full truncate text-text-main" aria-current="page">
                    {currentLabel}
                </li>
            </ol>
        </nav>
    );
}
