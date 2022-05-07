import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions'

const cart_reducer = (state, action) => {
  if(action.type===ADD_TO_CART){
   const {id,amount,product,color}=action.payload;
   const tempItem= state.cart.find((item)=>item.id===id+color);
   if(tempItem){
     const tempCart=state.cart.map((item)=>{
      if(item.id===id+color){
        let newAmount= item.amount+amount
        if(newAmount>item.max){
          newAmount=item.max
        }
        return {...item,amount:newAmount}
      }else{
        return item
      }
     })
     return {...state,cart:tempCart}
     
  }else{
    let newItem={
      id:id+color,
      name:product.name,
      amount,
      price:product.price,
      image:product.images[0].url,
      max:product.stock,
      color
    }
    return {
      ...state,
      cart:[...state.cart,newItem]
    }
   }
   
  }
  if (action.type === REMOVE_CART_ITEM) {
    const tempdata = state.cart.filter((cart) => cart.id !== action.payload)
    return {
      ...state,
      isAlert:true,
      cart: tempdata
    }

  }
  if (action.type === CLEAR_CART) {
    return {
      ...state,
      cart: []
    }

  }
  if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
    const { id, value } = action.payload;
    const tempCart = state.cart.map((item) => {
      console.log(item);
      if (item.id === id) {
        if (value === 'inc') {
          let newamount = item.amount + 1
          if (newamount > item.max) {
            newamount = item.max
          }
          return { ...item, amount:newamount,showAlert:true}
        }
        if (value === 'dec') {
          let newamount = item.amount - 1
          if (newamount <1) {
            newamount = 1
          }
          return { ...item, amount:newamount }
        }
      } else {
        return item 
      }
    })
    return {...state,cart:tempCart}
  }
  if(action.type===COUNT_CART_TOTALS){
    const {total_amount,total_items}=state.cart.reduce((total,currentItem)=>{
      const { amount, price } = currentItem
      total.total_items += amount
      total.total_amount += price * amount
      return total
    },{
      total_amount:0,
      total_items:0  
    })
    return {...state,total_amount,total_items}
  }
  return state
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default cart_reducer
