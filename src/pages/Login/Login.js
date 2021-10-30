import TerminService from "../../service/TerminService"
import "./login.scss"

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
            localStorage.setItem("loginToken", res.data.token)
            localStorage.setItem("emailToken", res.data.email)
            localStorage.setItem("nameToken", res.data.name)
            localStorage.setItem("role", res.data.role)
            alert("Login  successfully")
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