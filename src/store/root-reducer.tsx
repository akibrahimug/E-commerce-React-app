import { Reducer, combineReducers } from 'redux'
import { userReducer } from './user/user.reducer'
import { categoriesReducer } from './categories/category.reducer'
import { cartReducer } from './cart/cart.reducer'
export const rootReducer: Reducer = combineReducers({
  user: userReducer,
  categories: categoriesReducer,
  cart: cartReducer,
}) as Reducer
