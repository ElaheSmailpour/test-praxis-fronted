import "./header.scss"
import { Link } from "react-router-dom"
import { useRef, useState } from "react"
import Collapse from '@material-ui/core/Collapse';
import { useMediaQuery } from "@material-ui/core";
const Header = () => {
    const [openSubMenuTermin, setOpenSubMenuTermin] = useState(false)
 
    const isMobileSize = useMediaQuery('(max-width:600px)');
    const menuBtnRef = useRef()
    const menuRef = useRef()
    const HandleClick = () => {
        menuBtnRef.current.classList.toggle("toggle")
        menuRef.current.classList.toggle("active")

    }
    return (
        <div className="header">
            <img src="/images/logo5.jpeg" alt="pic" />
            <button ref={menuBtnRef} onClick={HandleClick} className="sidebar-btn">
                <span></span>
            </button>
            <nav ref={menuRef} >
                <ul>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/kontakt">Kontakt</Link> </li>
                    <li onClick={() => setOpenSubMenuTermin(!openSubMenuTermin)}><Link to="/termin"> Termin Vereinbaren</Link>
                        {isMobileSize ?
                            <Collapse in={openSubMenuTermin} style={{ width: "100%" }} classes={{ root: "collapse" }}>
                                <ul>
                                    <li><Link to="/termin"> termin Vereinbaren</Link></li>

                                    <li><Link to="/störnieren"> Termin störnieren</Link></li>
                                </ul>
                            </Collapse> :
                            <ul>
                                <li><Link to="/termin"> termin Vereinbaren</Link></li>

                                <li><Link to="/störnieren"> Termin störnieren</Link></li>
                            </ul>
                        }
                    </li>
                   
                </ul>
            </nav>
        </div>
    )
}
export default Header