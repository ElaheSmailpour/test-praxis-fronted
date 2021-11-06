import axios from "axios";
class TerminService {

  static getTerminApi(page) {
    return axios.get("/admin/gettermin?page=" + page,{
        headers:{
            token:localStorage.getItem("loginToken")
        }
    })
  }


  static searchDateApi(start,end) {
    return axios.get("/admin/getTermin?startDate=" + start + "&endDate=" + end, {
      headers: {
        token: localStorage.getItem("loginToken")
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