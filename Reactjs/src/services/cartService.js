import axios from "../axios";
const getCart = (user) => {
    return axios.post('/api/get-cart', user)
}

const addCart = (data) => {
    return axios.post('/api/add-clothing-to-cart',data)
}

const updateCart = (id, status) => {
    return axios.put('/api/update-cart', {

        data: {
          id: id,
          status: status
        }
      });
}

const deleteCart = (id) => {
    return axios.delete('/api/delete-cart', {

        data: {
          id: id,
        }
      });
}

const deleteAllCart = (idUser) => {
  return axios.delete('/api/delete-all-cart', {
    data: {
      idUser: idUser
    }
  })
}

const checkSumClothing = (sizeClothing, nameClothing) => {
  return axios.post('/api/check-sum-clothing', {
    
      sizeClothing: sizeClothing,
      nameClothing: nameClothing
    
      
    
  });
}
export {getCart, addCart, updateCart, deleteCart, deleteAllCart, checkSumClothing}