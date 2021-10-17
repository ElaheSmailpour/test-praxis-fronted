import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useState, useEffect } from 'react';
import TerminService from "../../service/TerminService"
import { Collapse } from '@material-ui/core';

import "./terminVereinbaren.scss"

const TerminVereinbaren = () => {
  const [selectedbehandlung, setSelectedbehandung] = useState()
  const [selectedDateId, setSelectedDateId] = useState();
  const [selectedHourId, setSelectedHourId] = useState();
  const [behandungsList, setBehandungsList] = useState([])
  const [aktulleZeit, setAktulleZeit] = useState([
    //   {
    //   time: moment().format("dddd D.M.YYYY"),
    //   hours: [{ id: 1, hour: "14:00" }, { id: 2, hour: "15:00" }, { id: 3, hour: "16:00" }]
    // }, {
    //   time: moment().add(1,"days").format("dddd D.M.YYYY"),
    //   hours: [{ id: 1, hour: "14:00" }, { id: 2, hour: "15:00" }, { id: 3, hour: "16:00" }]
    // },

  ])
  useEffect(() => {
    TerminService.getbehandlung().then(res => {
      console.log("res=", res)
      setBehandungsList(res.data)

    }).catch(err => {
      console.log("errorTerminService=", err)
    })
  }, [])



  useEffect(() => {
    TerminService.getAvalable().then(res => {
      setAktulleZeit(res.data)


    }).catch(err => {
      console.log("errorgetAvalable=", err)
    })
  }, [])

  const handleChangeBehandung = (event) => {
    setSelectedbehandung(event.target.value);
  }
  const HandleSelectTime = (dateId, hourId) => {
    setSelectedDateId(dateId)
    setSelectedHourId(hourId)
  }
  return (
    <div className="termin">


      <FormControl className="termin-select">
        <InputLabel id="demo-simple-select-standard-label">Behandlung</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={selectedbehandlung}
          onChange={handleChangeBehandung}

        >

          {behandungsList.map((item) => <MenuItem value={item._id}>{item.title}</MenuItem>)}


        </Select>
      </FormControl>
      <Collapse in={selectedbehandlung} style={{ width: "100%" }} classes={{ root: "collapse" }}>
        <ul className="sprechstunden">
          {aktulleZeit.map(item => {
            return <li key={item.id}>
              <div className="time-hour">
                <p>{item.date}</p>
                <ul>
                  {item.hours.map(hour => <li onClick={() => HandleSelectTime(item.date, hour)}>{hour + ":00"}</li>)}


                </ul>
              </div>
              <Collapse in={selectedDateId === item.date} style={{border:"3px solid red" , padding:"4rem"}}>
                <div className="show-termin">
                 
                 <p> Termin für {behandungsList.find(item => item._id === selectedbehandlung)?.title} am {item.date} um {item.hours.find(hour => hour === selectedHourId)} :00 Uhr.</p>
                <p> Dr.Yas Sarab</p>
                </div>
              </Collapse>
            </li>
          })}
        </ul>
      </Collapse>

    </div>
  )
}

export default TerminVereinbaren