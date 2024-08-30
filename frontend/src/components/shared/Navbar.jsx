import { Link, useLocation } from "react-router-dom";
import { navLinks } from "../../constants";

const Navbar = () => {
    const { pathname } = useLocation();
    const component = pathname.split("/")[1] || "about";

    return (
        <nav className="navbar">
            <ul className="navbar-list">
                {navLinks.map(({ id, title, link }) => (
                    <li key={id} className="navbar-item">
                        <Link
                            className={`navbar-link ${
                                component === title.toLowerCase()
                                    ? "active"
                                    : ""
                            }`}
                            to={link}
                        >
                            {title}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Navbar;
