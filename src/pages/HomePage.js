import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductItem from "../components/ProductItem";
import { useDispatch, useSelector } from "react-redux";
import { getTokenFromLocalStorage } from "../utils/handleToken";
import { populateUser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import Banners from "../components/Banners";
import Loading from '../components/Loading'

const HomePage = () => {
  // let productArray = [];
  const dispatch = useDispatch();
  let [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // const token = ;
  const config = {
    headers: {
      "Content-Type": "application/json",
      "auth-token": getTokenFromLocalStorage(),
    },
  };

  useEffect(() => {
    (async () => {
      //await getAllProducts()
      setLoading(true);
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/products/`);
      const { data } = response;
      setProducts(data);
      window.scrollTo(0, 0);
      const user = await axios.get(`${process.env.REACT_APP_BASE_URL}/user/getUser/`, config)
      dispatch(populateUser(user.data));
      setLoading(false);
    })();
  }, []);

  const user = useSelector(state => state.user)
  if (user.role === "admin") {
    navigate("/admin")
  }

  return (
    <div>
      <div className="md:my-4">
        <Banners/>
      </div>
      <div className="flex items-center justify-between mb-5 ">
        <h1 className="font-semibold lg:text-xl text-[#31D490]">
          ALL PRODUCTS
        </h1>
        <div className="w-[50%] sm:w-[70%] md:w-[80%] border-t h-0 border-[#AAAAAA]"></div>
      </div>
      
      <div className="w-[100%] flex flex-wrap justify-around gap-4 sm:gap-8 ">
        {products.map((product) => {
          return <ProductItem key={product._id} product={product} />;
        })}
      </div>
      {loading && <Loading/>}
    </div>
  );
};

export default HomePage;
