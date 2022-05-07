import React, { useEffect, useContext, useReducer } from 'react'
import reducer from '../reducers/cart_reducer'
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  CLEAR_CART,
  COUNT_CART_TOTALS,
} from '../actions'

const getlocalStorageDdata=()=>{
  let cart=localStorage.getItem('cart');
  if(cart){
    return JSON.parse(localStorage.getItem('cart'))
  }
  else{
    return []
  }
}
const initialState = {
  cart:getlocalStorageDdata(),
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
 const removeItem=(id)=>{

 }
 const toggleAmount=(id,value)=>{

 }
 const clearCart=()=>{

 }
 useEffect(() => {
  localStorage.setItem('cart',JSON.stringify(state.cart))
}, [state.cart])
  return (
    <CartContext.Provider value={{...state,addTocart,removeItem,toggleAmount,clearCart}}>{children}</CartContext.Provider>
  )
}
// make sure use
export const useCartContext = () => {
  return useContext(CartContext)
}
