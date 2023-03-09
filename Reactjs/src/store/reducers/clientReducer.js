import actionTypes from '../actions/actionTypes';

const initialState = {
    clientIsLoggedIn: false,
    clientInfor: null
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CLIENT_LOGIN_SUCCESS:
            return {
                ...state,
                clientIsLoggedIn: true,
                 clientInfor: action.clientInfor
               
            }
        case actionTypes.ClIENT_LOGIN_FAIL:
            return {
                ...state,
                clientIsLoggedIn: false,
                clientInfor: null
            }
        case actionTypes.CLIENT_PROCESS_LOGOUT:
            return {
                ...state,
                clientIsLoggedIn: false,
                clientInfor: null
           }
        // case actionTypes.GET_INFOR_CLIENT:
        //     return {
        //         ...state,
        //         clientIsLoggedIn: true,
        //         clientInfo: null
        //    }
        
        default:
            return state;
    }
}

export default appReducer;