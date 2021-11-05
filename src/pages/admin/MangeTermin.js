


import "./mangeTermin.scss"
import { useState, useEffect } from 'react';
import adminService from "../../service/adminService"
import moment from "moment"
const MangeTermin = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [terminList, setTerminList] = useState([])
    useEffect(() => {
        adminService.getTerminApi(currentPage).then((res) => {
            const newlist = [...terminList]
            newlist.push(...res.data)
            setTerminList(newlist)
        }).catch((error) => {
            console.log(error)
        })
    }, [currentPage])
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
    const handleChangeMore = () => {
        setCurrentPage(currentPage + 1)
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
                                    {hourItem.free === "free" && <button onClick={() => handleChange(hourItem.hour, item.date)}>RemoveHour</button>}
                                    {hourItem.free === "block" && <button onClick={() => makefree(hourItem.hour, item.date)}>makeHour</button>}
                                </div>
                            </td>)}
                        </tr>)}
                    </tbody>
                </table>
                <button onClick={handleChangeMore} >more</button>
            </div>

        </div>
    )
}


export default MangeTermin;
