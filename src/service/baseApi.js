import axios from 'axios';

const getAxios = () => {
    return axios.create({
        timeout: 10000,
        baseURL: "http://localhost:5000/",
        headers:{
            token:localStorage.getItem("token")
        }
    })
}

export default getAxios;