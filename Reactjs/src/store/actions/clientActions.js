import actionTypes from './actionTypes';

// export const addclientSuccess = () => ({
//     type: actionTypes.ADD_CLIENT_SUCCESS
// })



export const clientLoginSuccess = (clientInfor) => ({
    type: actionTypes.CLIENT_LOGIN_SUCCESS,
    clientInfor: clientInfor
})

// export const clientLoginFail = () => ({
//     type: actionTypes.client_LOGIN_FAIL
// })

export const clientProcessLogout = () => ({
    type: actionTypes.CLIENT_PROCESS_LOGOUT,
})

export const getInforClient = () => ({
    type: actionTypes.GET_INFOR_CLIENT,
})