


import "./mangeTermin.scss"
import { useState, useEffect } from 'react';
import adminService from "../../service/adminService"
import moment from "moment"
const MangeTermin = () => {
    const [terminList, setTerminList] = useState([])
    useEffect(() => {
        adminService.getTerminApi().then((res) => {
            setTerminList(res.data)
        }).catch((error) => {
            console.log(error)
        })
    }, [])
    const getCurrentDate = (date) => {
        const day = moment(date, "DD-MM-YYYY").format("dddd")
        switch (day) {
            case "Thursday":
                return "Donnerstag"
            case "Friday":
                return "Freitag"
            case "Wednesday":
                return "Mittwoch"
            case "Tuesday":
                return "Dienstag"
            case "Monday":
                return "Montag"
            case "Saturday":
                return "Samstag"
            case "Sunday":
                return "Sonntag"

            default:
                return ""
        }
    }

    const handleChange = (time, hour) => {
        adminService.removeHourApi(time, hour).then(res => {
            console.log("res=", res)
            adminService.getTerminApi().then(res => {
                console.log("res=", res)

                setTerminList(res.data)

            }).catch(err => {
                console.log("errorgetTerminApi=", err)
            })


        }).catch(err => {
            console.log("errorremoveHourApi=", err)
        })
    }
    const makefree = (time, hour) => {
        adminService.makeFreeHourApi(time, hour).then(res => {
            console.log("res=", res)
            adminService.getTerminApi().then(res => {
                console.log("res=", res)

                setTerminList(res.data)

            }).catch(err => {
                console.log("errorgetTerminApi=", err)
            })


        }).catch(err => {
            console.log("errorremoveHourApi=", err)
        })
    }
    return (
        <div className="manage">
            <h1>Manage Termin</h1>
            <div className="manage-content">

                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>10</th>
                            <th>11</th>
                            <th>12</th>
                            <th>13</th>
                            <th>14</th>
                            <th>15</th>
                            <th>16</th>
                        </tr>
                    </thead>
                    <tbody>
                        {terminList.map((item) => <tr><td>{item.date + " " + getCurrentDate(item.date)}</td>
                            {item.hours.map(hourItem => <td>
                                <div>
                                    <p>{hourItem.free}</p>
                                    <p>{hourItem.krank}</p>
                                    <p> {hourItem.behandlungenTitle}</p>
                                    {hourItem.free ==="free" && <button onClick={() => handleChange(hourItem.hours, item.date)}>RemoveHour</button>}
                                    {hourItem.free ==="block" && <button onClick={() => makefree(hourItem.hours, item.date)}>makeHour</button>}
                                </div>
                            </td>)}
                        </tr>)}
                    </tbody>
                </table>

            </div>

        </div>
    )
}


export default MangeTermin;