

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
  return axios.get("/termin/verfyPhone/" + phone,
  { headers: { token: localStorage.getItem("loginToken") } }
  )
}
static buchenApi(phone, code, body) {
  return axios.post("/termin/verfyPhone/" + phone + "/" + code, body,
  { headers: { token: localStorage.getItem("loginToken") }})
}

static terminListApi(phone){
  return axios.get("/termin/terminList/" + phone,
  { headers: { token: localStorage.getItem("loginToken") } }
  )
}

static terminRemoveApi(terminId) {
  return axios.get("/termin/terminRemove/" + terminId,
  { headers: { token: localStorage.getItem("loginToken") } }
  )
}
}

export default TerminService


