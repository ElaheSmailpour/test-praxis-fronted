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
  const [aktulleZeit, setAktulleZeit] = useState([{
    time: "Montag",
    hours: [{ id: 1, hour: "14:00" }, { id: 2, hour: "15:00" }, { id: 3, hour: "16:00" }]
  }, {
    time: "Diestag",
    hours: [{ id: 1, hour: "14:00" }, { id: 2, hour: "15:00" }, { id: 3, hour: "16:00" }]
  }
  ])
  useEffect(() => {
    TerminService.getbehandlung().then(res => {
      console.log("res=", res)
      setBehandungsList(res.data)

    }).catch(err => {
      console.log("errorTerminService=", err)
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
    <div className="TerminVereinbaren">


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
                <p>{item.time}</p>
                <ul>
                  {item.hours.map(hour => <li onClick={() => HandleSelectTime(item.id, hour.id)}>{hour.hour}</li>)}

        
                </ul>
              </div>
              <Collapse in={selectedDateId === item.id}>
                <div>
                  Dr.Yas Sarab
                Termine am {item.time} {item.hours.find(hour => hour.id === selectedHourId)?.hour} Uhr.
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