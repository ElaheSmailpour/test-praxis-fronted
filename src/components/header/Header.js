import "./header.scss"
import { Link } from "react-router-dom"
import { useRef, useState } from "react"
import Collapse from '@material-ui/core/Collapse';
import { useMediaQuery } from "@material-ui/core";
const Header = () => {
    const isLogin=localStorage.getItem("loginToken")
    const isAdmin=localStorage.getItem("role")==="admin"
    const [openSubMenuTermin, setOpenSubMenuTermin] = useState(false)
   
    const isMobileSize = useMediaQuery('(max-width:600px)');
    const menuBtnRef = useRef()
    const menuRef = useRef()
    const HandleClick = () => {
        menuBtnRef.current.classList.toggle("toggle")
        menuRef.current.classList.toggle("active")

    }
    const logout=()=>{
        localStorage.clear();
        window.location.assign("/login");
    }
    return (
        <div className="header">
            <img src="/images/logo5.jpeg" alt="pic" />
            
            {isLogin && <p> {localStorage.getItem("nameToken")} is login!</p>}
            <button ref={menuBtnRef} onClick={HandleClick} className="sidebar-btn">
                <span></span>
            </button>
            <nav ref={menuRef} >
                <ul>
                   {!isLogin && <li><Link to="/login">Login</Link></li>}
                   {isLogin && <li onClick={logout}>Logout</li>}
                   {!isAdmin &&   <li><Link to="/signup">Signup</Link></li>}
                   {!isAdmin &&   <li><Link to="/kontakt">Kontakt</Link> </li>}
                   {isAdmin &&  <li><Link to="/admin">Admin</Link> </li>}
                    {isLogin && !isAdmin && <li><Link to="/meinTermin">MeinTermin</Link> </li>}
                   { !isAdmin && <li onClick={() => setOpenSubMenuTermin(!openSubMenuTermin)}> Termin 
                        {isMobileSize ?
                            <Collapse in={openSubMenuTermin} style={{ width: "100%" }} classes={{ root: "collapse" }}>
                                <ul>
                                <li><Link to="/termin"> termin Vereinbaren</Link></li>


                                   
                                </ul>
                            </Collapse> :
                            <ul>
                                <li><Link to="/termin"> termin Vereinbaren</Link></li>

                               
                            </ul>
                        }
                    </li>}
                   
                </ul>
            </nav>
        </div>
    )
}
export default Header