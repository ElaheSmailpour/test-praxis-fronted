import axios from "axios";
class TerminService {

  static getTerminApi() {
    return axios.get("/admin/gettermin",{
        headers:{
            token:localStorage.getItem("loginToken")
        }
    })
  }
  static removeHourApi(time,date) {
    return axios.post("/admin/removeHour",{time,date},{
        headers:{
            token:localStorage.getItem("loginToken")
        }
    })
  }
  
  static makeFreeHourApi(time,date) {
    return axios.post("/admin/makeFreeHour",{time,date},{
        headers:{
            token:localStorage.getItem("loginToken")
        }
    })
  }
}




export default TerminService