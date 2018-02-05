"user strict"
import { combineReducers} from 'redux';

// import  THE Shops/User/UserShop Reducers 
import { ShopsReducer } from './shopsReducers';
import { UserShopRed } from './userShopRed';
import { UserReducer } from './userReducers';


// combining the reducers
export default combineReducers({
    shops : ShopsReducer,
    liked : UserShopRed,
    user : UserReducer
})