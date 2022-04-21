import axios from 'axios'
import React, { useContext, useEffect, useReducer } from 'react'
import reducer from '../reducers/products_reducer'
import { products_url as url } from '../utils/constants'
import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from '../actions'

const initialState = {
  isSideBarOpen:false,
  products_loading:false,
  products_error:false,
  prodcuts:[],
  features_prodcuts:[],
  single_products_loading:false,
  single_products_error:false,
  single_product:{}
}

const ProductsContext = React.createContext()

export const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer,initialState)
  const SidebarOpen=()=>{
    dispatch({type:SIDEBAR_OPEN})
  }
  const SidebarClose=()=>{
    dispatch({type:SIDEBAR_CLOSE})
  }
  const fetchProducts= async ()=>{
    dispatch({type:GET_PRODUCTS_BEGIN})
    try{
      const result = await axios.get(url);
      const response=result.data
      dispatch({type:GET_PRODUCTS_SUCCESS,payload:response})
      
    }
    catch{
      dispatch({type:GET_PRODUCTS_ERROR})
    }
  }
  const fetchSingleProduct= async (url)=>{
    dispatch({type:GET_SINGLE_PRODUCT_BEGIN})
    try{
      const response= await axios.get(url) 
      const single_product =response.data
      dispatch({type:GET_SINGLE_PRODUCT_SUCCESS,payload:single_product})
    }
    catch(error){
      dispatch({type:GET_SINGLE_PRODUCT_ERROR})
    }
  }
  useEffect(() => {
    fetchProducts(url)
  }, [])
  return (
    <ProductsContext.Provider value={{...state,SidebarClose,SidebarOpen,fetchSingleProduct}}>
      {children}
    </ProductsContext.Provider>
  )
}
// make sure use
export const useProductsContext = () => {
  return useContext(ProductsContext)
}
