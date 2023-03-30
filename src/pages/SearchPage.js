import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductItem from "../components/ProductItem";
import ProductNotFound from "../components/ProductNotFound";

const SearchPage = () => {
  const { keyword } = useParams();
  //   const [searchText, setSearchText] = useState("");
  const [returnedProduct, setReturnedProduct] = useState([]);

  useEffect(() => {
    (async () => {
      let response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/products/search/${keyword}`
      );
      let { data } = response;
      setReturnedProduct(data);
    })();
  }, [keyword]);

  return (
    <div>
      <div className="w-[100%] flex flex-wrap justify-around gap-4 sm:gap-8 ">
        {returnedProduct.map((product) => {
          return <ProductItem key={product._id} product={product} />;
        })}
      </div>
      {returnedProduct.length===0 && (
        <div>
          <ProductNotFound/>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
