import axios from "../axios"
const addOrder = (data) => {
    return axios.post('/api/add-order', data);
}


const getAllOrder = () => {
    return axios.get('/api/get-all-orders', {});
}

const getOrderById = (id) => {
    return axios.post('/api/get-orders-by-id', {
        id: id
    })
}
export { addOrder,getAllOrder, getOrderById }
