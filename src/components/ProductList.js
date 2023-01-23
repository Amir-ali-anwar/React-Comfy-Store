import React from 'react'
import { useFilterContext } from '../context/filter_context'
import GridView from './GridView'
import ListView from './ListView'
import AuthWrapper from './AuthWrapper'
const ProductList = () => {
  const { filtered_Products: products, GridView:grid_view } = useFilterContext()
  if(products.length<1){
    return (
      <h5 style={{ textTransform: 'none' }}>
        Sorry, no products matched your search.
      </h5>
    ) 
  }
  if (grid_view === false) {
    return <ListView products={products} />
  }
  return <AuthWrapper Showdata="2000"><GridView products={products} /></AuthWrapper>
}

export default ProductList
