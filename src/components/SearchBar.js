import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import searchicon from "../pictures/icons/searchicon.svg";
import { clearForm } from "../utils/clearForm";
import cross from "../pictures/icons/close.svg";

const SearchBar = () => {
  const [searchText, setSearchText] = useState("");
  const [returnedProduct, setReturnedProduct] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      let response = await axios.get(
        `http://localhost:5000/products/search/${searchText}`
      );
      let { data } = response;
      setReturnedProduct(data);
    })();
  }, [searchText]);

  const redirectToIndProduct = (pname) => {
    navigate(`/products/${pname}`);
    setSearchText("");
    clearForm();
  };

  const clearSearch = () => {
    setSearchText("");
    clearForm();
  };

  const search = () => {
    if (searchText === "") {
      return;
    }
    navigate(`/search/${searchText}`)
    clearSearch();
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      search()
    }
  };

  return (
    <div className="w-screen relative">
      <div className="flex w-screen justify-center font-display md:px-10 mb-[1px] lg:w-[100%] box-border">
        <div className="bg-[#efefef] w-[100%] mx-6 rounded-3xl flex shadow-lg items-center">
          <button className="my-2 w-[12%] flex justify-center">
            <img src={searchicon} alt="" className="xl:w-6" onClick={() => search()}/>
          </button>
          <input
            className="text-[14px] bg-[#efefef] w-[90%]  outline-none"
            type="text"
            placeholder="Search for Products, Medicine..."
            onKeyDown={handleKeyDown}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <div className="w-[12%] flex items-center justify-center">
            {searchText !== "" && (
              <img
                src={cross}
                alt=""
                className="w-[25px]  hover:cursor-pointer"
                onClick={() => clearSearch()}
              />
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center z-10 absolute md:px-10 w-[100%] items-center">
        {returnedProduct !== null &&
          returnedProduct.map((prod) => {
            return (
              <div
                key={prod._id}
                className=" w-[90%]  bg-white cursor-pointer flex items-center py-2 border-b hover:bg-[#DCF2FB]"
                onClick={() => redirectToIndProduct(prod.pname)}
              >
                <img src={searchicon} alt="" className="mx-5" />
                <img
                  src={prod.productPicURL}
                  alt=""
                  className="w-[50px] rounded-md border mr-5"
                />
                <p className="text-sm text-gray-500">{prod.pname}</p>
              </div>
            );
          })}

        {/* {returnedProduct !== null && returnedProduct.map(() => {})} */}
      </div>
      
    </div>
  );
};

export default SearchBar;
