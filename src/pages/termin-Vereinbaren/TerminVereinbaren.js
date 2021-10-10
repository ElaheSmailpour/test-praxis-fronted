import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useState, useEffect } from 'react';
import "./terminVereinbaren.scss"
import TerminService from "../../service/TerminService"
const TerminVereinbaren = () => {
    const [selectedbehandlung, setSelectedbehandung] = useState()
    const [behandungsList, setBehandungsList] = useState([])
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
         
          {behandungsList.map((item)=> <MenuItem value={item._id}>{item.title}</MenuItem>)}
         
         
        </Select>
      </FormControl>
            
     
            
        </div>
    )
}

export default TerminVereinbaren