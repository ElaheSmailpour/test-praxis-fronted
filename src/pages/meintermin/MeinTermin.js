import { useState, useEffect } from 'react';
import TerminService from "../../service/TerminService"
const MeinTermin = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        TerminService.terminListApi().then(res => {
            console.log("res=", res)
            setData(res.data)

        }).catch(err => {
            console.log("errorTerminService=", err)
        })
    }, [])
    const removeTermin = (id, index) => {
        TerminService.terminRemoveApi(id).then(res => {
            alert("Ihre Termin gelöscht.")
            const newdata = [...data]
            newdata.splice(index, 1)
            setData(newdata)
        }).catch(err => {

            console.log("removeTermin=", err)
        })
    }
    return (
        <div className="meinTermin">
            <ul>
                {data.map((item, index) => {
                    return <li key={index}>Ihr Termin ist am {item.date} um {item.time} :00 Uhr.
                        <button onClick={() => removeTermin(item._id, index)}>RemoveTermin</button>
                    </li>
                })}
            </ul>
        </div>
    )
}


export default MeinTermin;
