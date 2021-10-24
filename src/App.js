import "./app.scss"
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./components/header/Header"
import Home from "./pages/home/Home";
import Footer from "./components/footer/Footer"
import Login from "../src/pages/Login/Login"
import Kontakt from "../src/pages/kontakt/Kontakt"
import TerminVereinbaren from "../src/pages/termin-Vereinbaren/TerminVereinbaren"
import Signup from "./pages/signup/Signup";
import Störnieren from "./pages/störnieren/Störnieren"
function App() {

  return (
    <div className="App">
   <BrowserRouter>
   <Header/>
  
   <div className="app-content">
     <Switch>
   
     <Route path={"/signup"} component={Signup}></Route>
     <Route path={"/kontakt"} component={Kontakt}></Route>
    <Route path={"/login"} component={Login}></Route>
     <Route path={"/störnieren"} component={Störnieren}></Route>
     
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
