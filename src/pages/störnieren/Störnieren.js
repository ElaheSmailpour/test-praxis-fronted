import { useState } from "react"
import "./störnieren.scss"
import TerminService from "../../service/TerminService"
import { useHistory } from "react-router-dom";
const Störnieren = () => {
    const history = useHistory()
    const [phone, setPhone] = useState()
    const [terminListData, setTerminListData] = useState([])

    const terminList = () => {
        TerminService.terminListApi(phone).then(res => {
            console.log("res=", res)
            setTerminListData(res.data)
        }).catch(err => {
            alert(err?.response?.data)
            console.log("terminList=", err)
        })
    }

    const HandlechangeInput = (event) => {
        setPhone(event.target.value)
    }
    const Terminstörnieren = (id) => {
        TerminService.terminRemoveApi(id).then(res => {
            alert("Ihre Termin gelöscht.")
            history.push("/")

        }).catch(err => {

            console.log("removeTermin=", err)
        })
    }
    return (
        <div className="störnieren">
            <div className="störnieren-content">
                <label>Geben Sie bitte Ihre TelefonNummer ein: <input type="text" placeholder="geben Sie bitte Ihre TelefonVummer ein!" value={phone} onChange={HandlechangeInput} /> </label>
                <button onClick={terminList}>submit  </button>
                </div>
                <ul>
                    {terminListData.map((item, index) => {
                        return <li key={index}>
                            <p>{item.userId.name} Ihr Termin ist am  {item.date}  um {item.time} Uhr.</p> <button onClick={() => Terminstörnieren(item._id)}>Termin störnieren </button> </li>
                    })}
                </ul>
            </div>
        
    )
}
export default Störnieren