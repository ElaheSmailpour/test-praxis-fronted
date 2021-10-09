import axios from 'axios';

const getAxios = () => {
    return axios.create({
        timeout: 10000,
        baseURL: "http://localhost:5000/"
      
    })
}

export default getAxios;