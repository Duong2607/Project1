import axios from '../axios';


// const handleLoginApi = (userEmail, userPassword) => {
//     return axios.post('/api/login', { email: userEmail, password: userPassword});
// }

// const createNewUser = (data) => {
//     return axios.post('/api/sign-up', data)
// }
const handleLoginClientApi = (userEmail, userPassword) => {
    return axios.post('/api/login-client', { email: userEmail, password: userPassword});
}

const createNewUser = (data) => {
    return axios.post('/api/sign-up', data)
}

const getAllClient = () => {
    return axios.get('/api/get-all-client',{})
}
export { handleLoginClientApi, 
        createNewUser,
        getAllClient
     }
