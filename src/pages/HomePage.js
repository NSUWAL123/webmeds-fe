import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductItem from "../components/ProductItem";

const HomePage = () => {
  // let productArray = [];
  let [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      //await getAllProducts()
      const response = await axios.get("http://localhost:5000/products/");
      const { data } = response;
      setProducts(data);
      // console.log(data)
    })();
  }, []);

  console.log(products);

  return (
    <div>
      <div className="flex items-center justify-between mb-5 ">
        <h1 className="font-semibold lg:text-xl text-[#31D490]">ALL PRODUCTS</h1>
        <div className="w-[50%] sm:w-[70%] md:w-[80%] border-t h-0 border-[#AAAAAA]"></div>
      </div>
      <div className="w-[100%] flex flex-wrap justify-around sm:gap-8 ">
        {products.map((product) => {
          return (
            <ProductItem key={product._id} product={product} />
            //<p key={product._id}>{product.pname}</p>
          );
        })}
      </div>
    </div>
  );
};

export default HomePage;
