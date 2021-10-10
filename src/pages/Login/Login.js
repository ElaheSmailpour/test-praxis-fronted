import TerminService from "../../service/TerminService"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState } from 'react';
import "./login.scss"
const Login = () => {
    const [error, setError] = useState("")
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
        TerminService.loginApi(login.email, login.password).then(res => {
            console.log("res=", res)
            toast.success("login");
            localStorage.setItem("loginToken", res.data.token)

            window.location.assign("/termin");

        }).catch(err => {
            setError("find not User!")

            console.log("errorTerminService=", err)
        })
    }



    return (
        <div className="login">
            <div className="login-Content">
                <h1>Login</h1>
                <lable>Email: <input type="text" value={login.email} name="email" placeholder="Email" onChange={HandleLogin} /></lable>
                <lable>Password:<input type="password" value={login.password} name="password" placeholder="password" onChange={HandleLogin} /></lable>
                <button onClick={HandleSubmit}>login</button>

            </div>
            {error && <div className="showError">
                <p>{error}</p>
            </div>}
        </div>

    )
}


export default Login;
