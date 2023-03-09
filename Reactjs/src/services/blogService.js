import axios from "../axios";
const getBlog = () => {
    return axios.get('/api/get-blog', {})
}

export {getBlog}