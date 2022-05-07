import React, { useEffect, useContext, useReducer } from 'react'
import reducer from '../reducers/cart_reducer'
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  CLEAR_CART,
  COUNT_CART_TOTALS,
} from '../actions'

const initialState = {
  cart:[],
  total_amount:0,
  total_items:0,
  free_shipping:false
}

const CartContext = React.createContext()

export const CartProvider = ({ children }) => {
 const [state,dispatch]=useReducer(reducer,initialState)
 const addTocart=(id,amount,product,color)=>{
  
  dispatch({type:ADD_TO_CART,payload:{id,amount,product,color}})
 }
  return (
    <CartContext.Provider value={{...state,addTocart}}>{children}</CartContext.Provider>
  )
}
// make sure use
export const useCartContext = () => {
  return useContext(CartContext)
}
