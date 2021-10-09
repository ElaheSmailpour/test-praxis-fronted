
import getAxios from './baseApi'
class TerminService {

    static imagesApi() {
        return getAxios().get("/imagesHome")
      }
    
     

     static RegisterApi=(signup)=>{
        return getAxios().post("/register/signup",signup)
   }

}

export default TerminService