import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'

const filter_reducer = (state, action) => {
  if(action.type===SET_GRIDVIEW){
    return {
      ...state,
      GridView:true
    }
  }
  if(action.type===SET_LISTVIEW){
    return {
      ...state,
      GridView:false
    }
  }
  if(action.type===LOAD_PRODUCTS){
    return {
      ...state,
      filtered_Products:[...action.payload],
      all_products:[...action.payload]
    }
  }
  if (action.type === UPDATE_SORT) {
    return {
      ...state,
      sortable: action.payload
    }
  }
   if (action.type === SORT_PRODUCTS) {
    const { filtered_Products, sortable } = state
    let tempproducts = [...filtered_Products]
    if (sortable === 'price-lowest') {
      tempproducts = filtered_Products.sort((a, b) => {
        return a.price - b.price
      })
    }
    if (sortable === 'price-highest') {
      tempproducts = filtered_Products.sort((a, b) => {
        return b.price - a.price
      })
    }
    if (sortable === 'name-a') {
      tempproducts = filtered_Products.sort((a, b) => {
        return a.name.localeCompare(b.name)
      })
    }
    if (sortable === 'name-z') {
      tempproducts = filtered_Products.sort((a, b) => {
        return b.name.localeCompare(a.name)
      })
    }  
    return {
      ...state,
      filtered_products:tempproducts
    }
  }
  
  return state
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default filter_reducer
