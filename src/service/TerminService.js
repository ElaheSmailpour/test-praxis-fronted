
import getAxios from './baseApi'
class TerminService {

    static imagesApi() {
        return getAxios().get("/imagesHome")
      }
  
     static RegisterApi=(signup)=>{
        return getAxios().post("/register/signup",signup)
   }
   static loginApi=(body)=>{
    return getAxios().post("/register/login",body)
}
  

}

export default TerminService