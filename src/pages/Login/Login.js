

import "./login.scss"
import TerminService from "../../service/TerminService";
import { useState } from "react";

const Login = () => {

    const [login, setLogin] = useState({
        email: "",
        password: ""
    })

    const HandleLogin = (event) => {
        const newLogin = { ...login, [event.target.name]: event.target.value }
        setLogin(newLogin)
    }

    const HandleSubmit = (event) => {
        event.preventDefault()
        if (!login.email || !login.password) {
            alert("enter your email and Password")
            return;

        }

        const addsignup = {

            password: login.password,
            email: login.email

        }

        TerminService.loginApi(addsignup).then((res) => {
            console.log("res=", res)
            const token = res.data.token;
            const name = res.data.name;
            localStorage.setItem("token", token)
            localStorage.setItem("name", name)
            alert("signup submitted successfully")
            
            window.location.assign("/termin")


        }).catch((error) => {
            alert("enter your email and Password")
            console.log(error);
        })

    }



    return (
        <div className="login">
            <h1>Login</h1>
            <div className="login-content">
                <lable>Username: <input type="text" value={login.email} name="email" placeholder="Email" onChange={HandleLogin} /></lable>
                <lable>Password:<input type="password" value={login.password} name="password" placeholder="password" onChange={HandleLogin} /></lable>
                <button onClick={HandleSubmit}>login</button>
            </div>
        </div>
    )
}


export default Login;
