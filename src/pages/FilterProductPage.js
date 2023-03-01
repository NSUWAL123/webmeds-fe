import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductItem from "../components/ProductItem";
import { getTokenFromLocalStorage } from "../utils/handleToken";

const FilterProductPage = () => {
  const { type } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "auth-token": getTokenFromLocalStorage(),
      },
    };

    (async () => {
      const response = await axios.get(
        `http://localhost:5000/category/${type}`
      );
      const { data } = response;
      setProducts(data);
      window.scrollTo(0, 0);
    })();
  }, [type]);

  console.log(products);

  return (
    <div className="w-[100%] flex flex-wrap justify-around gap-4 sm:gap-8 ">
      {products.map((product) => {
        return <ProductItem key={product._id} product={product} />;
      })}

      {products.length === 0 && (
        <div className="h-[300px] w-[90%] bg-white flex items-center justify-center rounded-md md:mt-6">
          <p className="text-xl md:text-2xl font-semibold text-gray-600">No products found in this category</p>
        </div>
      )}
    </div>
  );
};

export default FilterProductPage;
