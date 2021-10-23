

import axios from "axios";
class TerminService {

    static imagesApi() {
        return axios.get("/imagesHome")
      }
  
     static RegisterApi=(body)=>{
        return axios.post("/register/signup",body)
   }
  

   static loginApi(body) {
    return axios.post("/register/login", body)
  }
  
  
  static getbehandlung() {
    return axios.get("/termin/behandlungen")
  }
 static getAvalable(){
   return axios.get("/termin/")
 }
 static getBestätigungsTermin(phone) {
  return axios.get("/termin/verfyPhone/" + phone)
}
 static buchen(phone,code){
  return axios.get("/termin/verfyphone" + phone +"/" +  code)
}
}

export default TerminService