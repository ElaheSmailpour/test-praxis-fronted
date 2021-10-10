

import axios from "axios";
class TerminService {

    static imagesApi() {
        return axios.get("/imagesHome")
      }
  
     static RegisterApi=(body)=>{
        return axios.post("/register/signup",body)
   }
  
   static loginApi(email, password) {
    return axios.post("/register/login", { email, password })
  }
  static getbehandlung() {
    return axios.get("/termin/behandlungen")
  }
 
}

export default TerminService