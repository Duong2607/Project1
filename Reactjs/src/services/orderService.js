import axios from "../axios"
const addOrder = (data) => {
    return axios.post('/api/add-order', data);
}


const getAllOrder = () => {
    return axios.get('/api/get-all-orders', {});
}
export { addOrder,getAllOrder }
