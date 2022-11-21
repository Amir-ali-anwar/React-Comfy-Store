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
  if (action.type === LOAD_PRODUCTS) {
    let maxPrice= action.payload.map((p)=>p.price)
    maxPrice=Math.max(...maxPrice)
    return {
      ...state,
      all_products: [...action.payload],
      filtered_Products: [...action.payload],
      filter: { ...state.filter, max_Price: maxPrice, price: maxPrice },
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
    let tempproducts = []
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
     if (sortable === "name-z") {
       tempproducts = filtered_Products.sort((a, b) => {
         return b.name.localeCompare(a.name);
       });
     }
     console.log("tempproducts", tempproducts);
    return { ...state, filtered_products: tempproducts };
  }
  if (action.type === FILTER_PRODUCTS) {
    const {all_products}= state
    let temp_products=[...all_products]
    const {searchtext,categoryname,companyname,color,shipping,price}=state.filter
    if (searchtext) {
      temp_products = temp_products.filter((product) =>
        product.name.toLowerCase().startsWith(searchtext)
      )
    }
    if (categoryname !== 'all') {
      temp_products = temp_products.filter(
        (product) => product.category === categoryname
      )
    }
    if (companyname !== 'all') {
      temp_products = temp_products.filter(
        (product) => product.company === companyname
      )
    }
    if(shipping){
      temp_products=temp_products.filter((product)=>product.shipping===true)
    }
    if(color !=='all'){
      temp_products=temp_products.filter((product)=> {
       return product.colors.find((c)=>c===color) 
      })
    }
    if(price){
      temp_products=temp_products.filter((product)=>product.price<price)
    }
    return { ...state,filtered_Products:temp_products }
  }
  if (action.type === UPDATE_FILTERS) {
    const { name, value } = action.payload
    return { ...state, filter: { ...state.filter, [name]: value } }
  }
  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      filter: {
        ...state.filters,
        text: '',
        companyname: 'all',
        categoryname: 'all',
        color: 'all',
        price: state.filter.max_price,
        shipping: false,
      },
    }
  }
  
  return state
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default filter_reducer
