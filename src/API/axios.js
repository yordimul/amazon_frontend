import axios from 'axios';


const axiosinstance= axios.create({
    // baseURL: 'http://localhost:3000',
    baseURL:"https://amazone-api-deploy-vhh0.onrender.com/"
})
export {axiosinstance}
