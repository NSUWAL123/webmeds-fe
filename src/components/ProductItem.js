import React from 'react'

const ProductItem = (props) => {
    let {product} = props;
    console.log(product)
  return (
    <div>
        <img src={product.productPicURL} alt="" width="200px"/>
        <p>{product.pname}</p>
        <p>{product.price}</p>
        <p>{product.discountPct}</p>
        
    </div>
  )
}

export default ProductItem