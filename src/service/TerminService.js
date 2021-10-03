import axios from "axios";

class TerminService {

    static imagesApi() {
        return axios.get("/imagesHome")
      }


}

export default TerminService