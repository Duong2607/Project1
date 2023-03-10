import axios from "../axios"
const handleLoginApi = (userEmail, userPassword) => {
    return axios.post('/api/login', { email: userEmail, password: userPassword});
}

const handleCreatNewAdmin = (data) => {
    return axios.post('/api/creat-new-user', data)
}

const handleLoginClientApi = (userEmail, userPassword) => {
    return axios.post('/api/login-client', { email: userEmail, password: userPassword});
}

const getAllUser = () => {
    return axios.get('api/get-all-user');
}

const deleteUser = (id) => {
    return axios.delete('/api/delete-user', {
        data: {
            id: id,
          }
    })
}
export { handleLoginApi,handleLoginClientApi, handleCreatNewAdmin, getAllUser, deleteUser }
