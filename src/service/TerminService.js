

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
 static buchenApi(phone,code,body){
  return axios.post("/termin/verfyphone" + phone +"/" +  code,body)
}
}

export default TerminService