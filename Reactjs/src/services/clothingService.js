import axios from "../axios";
const getAllClothings = () => {
    return axios.get('/api/get-all-clothing', {})
}
const getClothing = (name) => {
    return axios.get(`/api/get-clothing-by-name?name=${name}`)
}

const getClothingByType = (type) => {
    return axios.get(`/api/get-clothing-by-type?type=${type}`)
}

const updateClothing = (data) => {
    return axios.put('/api/update-clothing', data)
}

const deleteClothing = (id) => {
    return axios.delete('/api/delete-clothing', {

        data: {
          id: id,
        }
      });
}

const creatClothing = (data) => {
    return axios.post('/api/creat-clothing', data)
}

export {getAllClothings,
        getClothing,
        getClothingByType,
        updateClothing,
        deleteClothing,
        creatClothing
}