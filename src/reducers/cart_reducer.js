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
   const tempItem= state.cart.find((item)=>item.id===id);
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
      max:product.stock
    }
    return {
      ...state,
      cart:[...state.cart,newItem]
    }
   }
   
  }
  return state
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default cart_reducer
