

import axios from "axios";
class TerminService {

    static imagesApi() {
        return axios.get("/imagesHome")
      }
  
     static RegisterApi=(signup)=>{
        return axios.post("/register/signup",signup)
   }
  
   static loginApi(email, password) {
    return axios.post("/register/login", { email, password })
  }

}

export default TerminService