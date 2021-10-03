import "./app.scss"
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./components/header/Header"
import Home from "./pages/home/Home";
import Login from "../src/pages/Login/Login"
import TerminVereinbaren from "../src/pages/termin-Vereinbaren/TerminVereinbaren"
function App() {

  return (
    <div className="App">
   <BrowserRouter>
   <Header/>
   <div className="app-content">
     <Switch>

     <Route path={"/login"} component={Login}></Route>
     <Route path={"/termin"} component={TerminVereinbaren}></Route>
       <Route path={"/"} component={Home}></Route>
     </Switch>
   </div>
   </BrowserRouter>
    </div>
  );
}

export default App;
