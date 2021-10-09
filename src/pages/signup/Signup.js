import "./signup.scss"
import { useState } from "react"
import TerminService from "../../service/TerminService"
const Signup = () => {
    const [form, setForm] = useState({
        name: "",
        password: "",
        phone: "",
        repeatpassword: "",
        email: ""
    })
    const handleChangeForm = (event) => {
        const newform = { ...form }
        newform[event.target.name] = event.target.value
        setForm(newform)
    }
    const Regestrieren = (event) => {
        event.preventDefault()
        // if (form.password !== form.repeatpassword) {
        //     alert("password is not equal repeatpassword")
        //     return;
        // }
        if (!form.password) {
            alert(" enter your password ")
            return;

        }
        const addsignup = {
            name: form.name,
            password: form.password,
            email: form.email,
            phone: form.phone
        }
        TerminService.RegisterApi(addsignup).then((res) => {
            alert("signup submitted successfully")
        }).catch((err) => {
            console.log(err)
        })

    }
    return (
        <div className="signup">
            <form className="signup-content" onSubmit={Regestrieren}>

<div className="register">
    <label for="name">Name:</label>
    <input type="text" id="name" name="name" value={form.name}
        onChange={e => handleChangeForm(e)} />
    <label for="phone">Phone:</label>
    <input type="text" id="phone" name="phone" value={form.phone}
        onChange={e => handleChangeForm(e)} />
    <label for="password">password:</label>
    <input type="password" id="password" name="password" value={form.password} 
        onChange={e => handleChangeForm(e)} />
    <label for="password"> Repeat Password:</label>
    <input type="password" id="password" name="repeatPassword" value={form.repeatPassword} 
        onChange={e => handleChangeForm(e)} />
    <label for="email">Email:</label>
    <input type="text" id="email" name="email" value={form.email} required
        onChange={e => handleChangeForm(e)} />
</div>
<button type="submit">Regestrieren</button>
</form>
        </div>
    )
}

export default Signup