import { Link } from "react-router-dom";
import "./Header.css"

const Header = () => {
    return (
        <header className="header">
            <div className="logo">
                <h1 className="site-title">Моніторинг клімату</h1>
            </div>

            <nav className="nav">
                <ul>
                    <li><Link to="/">Головна</Link></li>
                    <li><Link to="/map">Станції</Link></li>
                    <li><Link to="/stats">Статистика</Link></li>
                    <li><Link to="/predict">Прогнози</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;