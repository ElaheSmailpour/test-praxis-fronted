
import { Link } from "react-router-dom";
import "./home.scss"
import { useEffect, useState } from "react";
import TerminService from "../../service/TerminService"
const Home = () => {
  const [cover, setCover] = useState([])
  useEffect(() => {

    TerminService.imagesApi().then(res => {
      console.log("res=", res)
      setCover(res.data)
    }).catch(err => {
      console.log("errorTerminService=", err)
    })
  }, [])

  return (

    <div className="home-content">
      <div className="cover" style={{ backgroundImage: `url(${cover.img}) `}}>

      </div>
    
      {/* <img src={cover.img} alt="pic"></img> */}
      <div className="home-text">
        <h2>Ihre Zahnarztpraxis in der Düsseldorfer Innenstadt. </h2>
        <p>Seit dem 1. Juli 2020 kümmere ich mich als Zahnärztin M.Sc. in meiner Praxis mit meinem Team mitten in Düsseldorf mit Leidenschaft und Einfühlungsvermögen um meine Patienten. Dabei kann ich auf über 16 Jahre Erfahrung in einigen der renommiertesten zahnmedizinischen Einrichtungen der Welt zurückgreifen.
          Keine Wartezeiten und eine absolut sanfte Behandlung – das ist unser Versprechen an Sie.</p>

        <div className="öffnungzeiten-home">
          <span >Mo. &amp; Mi. &amp; Fr.</span>
          <span >8 – 18 Uhr</span>
          <span>Di. &amp; Do.</span>
          <span >9 – 19 Uhr</span>
          <p >und nach Vereinbarung</p>
          <p > in Notfällen außerhalb der Sprechzeiten rufen Sie bitte 01767777777 an</p >
          <button><Link to="/termin">Termin vereinbaren</Link></button>

        </div>
      </div>

    </div>


  )
}


export default Home;
