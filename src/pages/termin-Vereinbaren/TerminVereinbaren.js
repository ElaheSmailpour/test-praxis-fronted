import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useState, useEffect } from 'react';
import TerminService from "../../service/TerminService"
import { Collapse } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import "./terminVereinbaren.scss"

const TerminVereinbaren = () => {
  const isLogin = localStorage.getItem("loginToken")
  const [userDetails, setUserDetails] = useState({
    name: "",
    telefonNummber: "",
    störnieren: false,
    datenSchutz: false,
    code: ""
  })
  const [currentPage, setCurrentPage] = useState(1)
 
  const [showTerminForm, setShowTermin] = useState(false);
  const [codeSenden, setCodeSenden] = useState();
  const [selectedbehandlung, setSelectedbehandung] = useState()
  const [selectedDate, setSelectedDateId] = useState();
  const [selectedHour, setSelectedHourId] = useState();
  const [behandungsList, setBehandungsList] = useState([])
  const [aktulleZeit, setAktulleZeit] = useState([])
  const history = useHistory()
  useEffect(() => {
    TerminService.getbehandlung().then(res => {
      console.log("res=", res)
      setBehandungsList(res.data)

    }).catch(err => {
      console.log("errorTerminService=", err)
    })
  }, [])



  useEffect(() => {
    TerminService.getAvalable(currentPage).then(res => {
      setAktulleZeit(res.data)
    })
      .catch(err => {
        console.log("errorgetAvalable=", err)
      })
  }, [currentPage])

  const handleChangeBehandung = (event) => {
    setSelectedbehandung(event.target.value);
  }
  const HandleSelectTime = (dateId, hourId) => {
    setSelectedDateId(dateId)
    setSelectedHourId(hourId)
  }
  const HandleChangeUserDetail = (event) => {
    let value;
    if (event.target.type === "checkbox")
      value = event.target.checked
    else
      value = event.target.value

    setUserDetails((olduserDetail) => {
      return { ...olduserDetail, [event.target.id]: value }
    })
  }
  const handleBestätigung = () => {
    TerminService.getBestätigungsTermin(userDetails.telefonNummber).then(res => {
      console.log("res=", res)
      setCodeSenden(true)
    }).catch(err => {
      console.log("errorTerminBestätigung=", err)
    })
  }

  const handleBuchen = () => {
    const body = {
      name: userDetails.name,
      time: selectedHour,
      date: selectedDate,
      behandlungen: selectedbehandlung
    }

    if (isLogin) {
      TerminService.eingelogteuserbuchen(body).then(res => {
        alert("vielen dank für ihre Termin")
        history.push("/")

      }).catch(err => {
        console.log("errorTerminBestätigung=", err)
      })

    }
    else {

      TerminService.buchenApi(userDetails.telefonNummber, userDetails.code, body).then(res => {
        localStorage.setItem("loginToken", res.data.token)
        localStorage.setItem("nameToken", res.data.name)
        alert("vielen dank für ihre Termin")
        window.location.assign("/")

      }).catch(err => {
        console.log("errorTerminBestätigung=", err)
      })
    }


  }
  const näschteseite = () => {
    setCurrentPage(currentPage + 1)
}
const letzeseite = () => {
    if (currentPage > 1) {
        setCurrentPage(currentPage - 1)
    }

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
                  {item.hours.map(hour => <li className={hour === selectedHour && item.date === selectedDate && "hourActive"} onClick={() => HandleSelectTime(item.date, hour)}>{hour + ":00"}</li>)}


                </ul>
              </div>
              <Collapse in={selectedDate === item.date} style={{ border: "3px solid red", padding: "4rem" }}>
                {isLogin ? <div className="show-termin">

                  <p> Termin für {behandungsList.find(item => item._id === selectedbehandlung)?.title} am {item.date} um {item.hours.find(hour => hour === selectedHour)} :00 Uhr.</p>
                  <p> Dr.Yas Sarab</p>
                  {!showTerminForm && <button onClick={() => setShowTermin(true)}>zum Termin </button>}
                  {showTerminForm && <label><input type="checkbox" id="störnieren" placeholder=" Termin störnieren" checked={userDetails.störnieren} onChange={HandleChangeUserDetail} />Sollen Sie Ihren Termin nicht wahrnehmen könnten,sagen Sie bitte 24 stunnden Vor Bescheid!</label>}
                  {userDetails.störnieren && <label><input type="checkbox" id="datenSchutz" placeholder=" datenSchutz" checked={userDetails.datenSchutz} onChange={HandleChangeUserDetail} />Ich Akzeptire die Datenschutz!</label>}

                  {userDetails.datenSchutz && <button onClick={handleBuchen}> Buchen </button>}
                </div> :

                  <div className="show-termin">

                    <p> Termin für {behandungsList.find(item => item._id === selectedbehandlung)?.title} am {item.date} um {item.hours.find(hour => hour === selectedHour)} :00 Uhr.</p>
                    <p> Dr.Yas Sarab</p>
                    {!showTerminForm && <button onClick={() => setShowTermin(true)}>zum Termin </button>}
                    {showTerminForm && <label>Name: <input type="text" id="name" placeholder="enter your name" value={userDetails.name} onChange={HandleChangeUserDetail} /></label>}
                    {userDetails.name.length > 4 && <label><input type="checkbox" id="störnieren" placeholder=" Termin störnieren" checked={userDetails.störnieren} onChange={HandleChangeUserDetail} />Sollen Sie Ihren Termin nicht wahrnehmen könnten,sagen Sie bitte 24 stunnden Vor Bescheid!</label>}
                    {userDetails.störnieren && <label>TelefonNummber <input type="number" id="telefonNummber" placeholder="enter your TelefonNummer" value={userDetails.telefonNummber} onChange={HandleChangeUserDetail} /></label>}
                    {userDetails.telefonNummber.length > 5 && <label><input type="checkbox" id="datenSchutz" placeholder=" datenSchutz" checked={userDetails.datenSchutz} onChange={HandleChangeUserDetail} />Ich Akzeptire die Datenschutz!</label>}

                    {userDetails.datenSchutz && !codeSenden && <button onClick={handleBestätigung}> Termin bestätigung </button>}

                    {codeSenden && <input type="text" placeholder="Code eingeben" value={userDetails.code} id="code" onChange={HandleChangeUserDetail} />}
                    {codeSenden && <button onClick={handleBuchen}> Buchen </button>}
                  </div>}
              </Collapse>
            
            </li>
          })}
        </ul>
      </Collapse>
      {selectedbehandlung && <div className="next">
                <button onClick={näschteseite}>näschte </button>
                {currentPage > 1 && <button onClick={letzeseite}>letze </button>}
            </div>}
    </div>
  )
}

export default TerminVereinbaren