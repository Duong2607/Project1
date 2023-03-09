import {combineReducers} from 'redux';
import { connectRouter } from 'connected-react-router';

import appReducer from "./appReducer";
import userReducer from "./userReducer";
import clientReducer from "./clientReducer";
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import cartReducer from './cartReducer'
const persistCommonConfig = {
    storage: storage,
    stateReconciler: autoMergeLevel2,
};

const userPersistConfig = {
    ...persistCommonConfig,
    key: 'user',
    whitelist: ['isLoggedIn', 'userInfo']
};

const clientPersistConfig = {
    ...persistCommonConfig,
    key: 'client',
    whitelist: ['clientIsLoggedIn', 'clientInfor']
};

const cartPersistConfig = {
    ...persistCommonConfig,
    key: 'cart',
    whitelist: ['priceClothing', 'countClothing']
};

export default (history) => combineReducers({
    router: connectRouter(history),
    user: persistReducer(userPersistConfig, userReducer),
    client: persistReducer(clientPersistConfig, clientReducer),
    cart: persistReducer(cartPersistConfig, cartReducer),
    app: appReducer
})