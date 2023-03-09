import actionTypes from './actionTypes';

// export const addclientSuccess = () => ({
//     type: actionTypes.ADD_CLIENT_SUCCESS
// })
export const setInforCart = (priceClothing, countClothing) => ({
    type: actionTypes.SET_INFOR_CART,
    priceClothing,
    countClothing
})

export const userNotLogin = () => ({
    type: actionTypes.USER_NOT_LOGIN,
    
})

// export const clientLoginSuccess = (clientInfor) => ({
//     type: actionTypes.CLIENT_LOGIN_SUCCESS,
//     clientInfor: clientInfor
// })

// // export const clientLoginFail = () => ({
// //     type: actionTypes.client_LOGIN_FAIL
// // })

// export const clientProcessLogout = () => ({
//     type: actionTypes.CLIENT_PROCESS_LOGOUT,
// })

// export const getInforClient = () => ({
//     type: actionTypes.GET_INFOR_CLIENT,
// })