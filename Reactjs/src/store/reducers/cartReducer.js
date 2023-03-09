import actionTypes from '../actions/actionTypes';

const initialState = {
    priceClothing: 0,
   countClothing: null
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        
        case actionTypes.SET_INFOR_CART:
            return {
                ...state,
                priceClothing: action.priceClothing,
                countClothing: action.countClothing
            }
        case actionTypes.USER_NOT_LOGIN:
            return {
                ...state,
                priceClothing: 0,
                countClothing: null
            }
        
        
        default:
            return state;
    }
}

export default appReducer;