import "./header.scss"
import { Link } from "react-router-dom"
const Header = () => {
    return (
        <div className="header">
            <img src="/images/logo5.jpeg" alt="pic" />
            <nav>
                <ul>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/termin"> termin Vereinbaren</Link>
                    <ul>
                    <li><Link to="/störnieren">störnieren</Link></li>
                    <li><Link to="#">Termin 1</Link></li>
                    <li><Link to="#">Termin2</Link></li>
                    </ul>
                    </li>
                </ul>
            </nav>
        </div>
    )
}
export default Header