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
  GridView:true
}

const FilterContext = React.createContext()
export const FilterProvider = ({ children }) => {
  const {prodcuts}=useProductsContext()
  const [state, dispatch] = useReducer(reducer, initialState)
  useEffect(() => {
    dispatch({type:LOAD_PRODUCTS,payload:prodcuts})
  }, [prodcuts])
  const SetGridView=()=>{
    dispatch({type:SET_GRIDVIEW})
  }
  const SetListView=()=>{
   dispatch({type:SET_LISTVIEW})
 }
  return (
    <FilterContext.Provider value={{...state,SetGridView,SetListView}}>
      {children}
    </FilterContext.Provider>
  )
}
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext)
}
