import React, { useEffect, useState } from 'react'
import axios from 'axios';
import ProductItem from '../components/ProductItem';

const HomePage = () => {
 // let productArray = [];
  let [products, setProducts] = useState([])

  useEffect(() => {
    (async () => {
      //await getAllProducts()
      const response = await axios.get("http://localhost:5000/products/")
      const {data} = await response;
      setProducts(data)
     // console.log(data)
    })()
  }, [])

  console.log(products)
  const getAllProducts = async () => {
    // products = await axios.get("http://localhost:5000/products/")
    // setProducts(products)
    // console.log(products)
  }

  return (
    <div className=''>
      {products.map(product => {
        return (
          <ProductItem key={product._id} product={product}/>
          //<p key={product._id}>{product.pname}</p>
        )
      })}
    </div>

    
  )
}

export default HomePage