import React, { useEffect, useContext, useReducer } from 'react'
import reducer from '../reducers/filter_reducer'
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'
import { useProductsContext } from './products_context'

const initialState = {
  GridView:true,
  filtered_Products:[],
  all_products:[],
  sortable:'price-lowest',
  filter:{
    searchtext:'',
    categoryname:'all',
    companyname:'all',
    color:'all',
    min_price: 0,
    max_price: 0,
    price: 0,
    shipping: false,

  }
}

const FilterContext = React.createContext()
export const FilterProvider = ({ children }) => {
  const {prodcuts}=useProductsContext()
  const [state, dispatch] = useReducer(reducer, initialState)
  useEffect(() => {
    dispatch({type:LOAD_PRODUCTS,payload:prodcuts})
  }, [prodcuts])
  useEffect(() => {
    dispatch({type:SORT_PRODUCTS})
    dispatch({type:FILTER_PRODUCTS})
   }, [prodcuts,state.sortable,state.filter])
  const SetGridView=()=>{
    dispatch({type:SET_GRIDVIEW})
  }
  const SetListView=()=>{
   dispatch({type:SET_LISTVIEW})
 }
 const updateSort=(e)=>{
  const name=e.target.name;
  const value=e.target.value
 dispatch({type:UPDATE_SORT,payload:value})
}
const updatefilter = (e) => {
  let name = e.target.name
  let value = e.target.value
  console.log('value is',value)
  console.log('name is',name)
  if (name === 'categoryname') {
    value = e.target.textContent
  }
  if (name === 'color') {
    value = e.target.dataset.colores
  }
  if (name === 'price') {
    value = Number(value)
    console.log(value)
  }
  if (name === 'shipping') {
    value = e.target.checked
  }
  dispatch({ type: UPDATE_FILTERS, payload: { name, value } })
}
const clearfilter=()=>{  
  dispatch({type:CLEAR_FILTERS})
}

  return (
    <FilterContext.Provider value={{...state,SetGridView,SetListView,updateSort,updatefilter,clearfilter}}>
      {children}
    </FilterContext.Provider>
  )
}
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext)
}
