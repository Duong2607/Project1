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

const deleteClient = (id) => {
    return axios.delete('/api/delete-client', {
        data: {
            id: id,
          }
    });
}
export { handleLoginClientApi, 
        createNewUser,
        getAllClient,
        deleteClient
     }
