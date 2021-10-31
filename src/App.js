import "./app.scss"
import React from "react"
import { BrowserRouter, Route, Switch ,Redirect} from "react-router-dom";
import Header from "./components/header/Header"
import Home from "./pages/home/Home";
import Footer from "./components/footer/Footer"
import Login from "../src/pages/Login/Login"
import Kontakt from "../src/pages/kontakt/Kontakt"
import TerminVereinbaren from "../src/pages/termin-Vereinbaren/TerminVereinbaren"
import Signup from "./pages/signup/Signup";
import MangeTermin from "./pages/admin/MangeTermin";
import MeinTermin from "./pages/meintermin/MeinTermin";
function App() {

  return (
    <div className="App">
   <BrowserRouter>
   <Header/>
  
   <div className="app-content">
     <Switch>
     <Route path={"/admin"} component={MangeTermin}></Route>
     <Route path={"/signup"} component={Signup}></Route>
     <Route path={"/kontakt"} component={Kontakt}></Route>
    <Route path={"/login"} component={Login}></Route>
    <PrivateRoute path={"/meinTermin"} component={MeinTermin}></PrivateRoute>
   
     {/* <Route path={"/störnieren"} component={Störnieren}></Route> */}
    
    <Route path={"/termin"} component={TerminVereinbaren}></Route> 
       <Route path={"/"} component={Home}></Route>
     </Switch>
   </div>
   </BrowserRouter>
   <Footer/>
    </div>
  );
}

export default App;

const isAuth = () => !!localStorage.getItem("loginToken");
const PrivateRoute = ({component,path}) => {
    return <Route path={path} render={() => {
      // wenn  token ist da , bestimmte component rendern
        if (isAuth())
            return React.createElement(component)
        else return <Redirect to={"/login"}/>
    }}/>
}