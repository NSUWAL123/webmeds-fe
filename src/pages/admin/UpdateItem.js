import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notifyError, notifyWarning, notifySuccess } from "../../utils/Toast";
import { useParams } from "react-router-dom";
import {getTokenFromLocalStorage} from "../../utils/handleToken"

const UpdateItem = () => {
  const [pname, setPname] = useState("");
  const [purpose, setPurpose] = useState("");
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [price, setPrice] = useState(0);
  const [discountPct, setDiscountPct] = useState(0);
  const [offerPrice, setOfferPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [expiry, setExpiry] = useState("");
  //const [picture, setPicture] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  const [description, setDescription] = useState("");

  const maxDate = new Date().toISOString().split("T")[0];

  const UpdateItem = async () => {
    if (
      !pname ||
      !purpose ||
      !category ||
      !company ||
      !price ||
      // !discountPct ||
      !stock ||
      !description
    ) {
      notifyError("Empty Fields");
      return;
    }

    if (category !== "Health Devices" && !expiry) {
      notifyError("Empty Fields");
      return;
    }

    if (price < 0 || stock < 0 || discountPct < 0) {
      notifyError("Cannot accept values less than zero.");
      return;
    }

    const formData = {
      pname,
      purpose,
      type,
      category,
      company,
      price,
      discountPct,
      offerPrice,
      stock,
      expiry,
      description,
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
        "auth-token": getTokenFromLocalStorage(),
      },
    };

    try {
      const { data } = await axios.post(
        `http://localhost:5000/admin/manage-product/update/${product._id}`,
        formData,
        config
      );

      if (data.lvl === "warning") {
        notifyWarning(data.message);
        return;
      }

      notifySuccess(data.message);
    } catch (error) {
    }
  };

  //
  //setting price after discount
  useEffect(() => {
    let finalPrice = price - price * (discountPct / 100);
    setOfferPrice(finalPrice);
  }, [discountPct, price]);

  //files --------------------//

  const handleFileInputChange = (e) => {
    if (!e.target.value) {
      return;
    }

    const file = e.target.files[0];
    previewFile(file);
  };

  const previewFile = (file) => {
    const reader = new FileReader(); //method provided by js to read file
    reader.readAsDataURL(file); //reads file as data url (base64 encoding)
    reader.onload = () => {
      setPreviewSource(reader.result);
    };
  };

  //--------------------------------------------------------------------------------
  const [product, setProduct] = useState({});
  const params = useParams();

  useEffect(() => {
    (async () => {
      //await getAllProducts()
      const response = await axios.get(
        `http://localhost:5000/products/id/${params.id}`
      );
      const { data } = response;
      setProduct(data);
      setPname(data.pname);
      setPurpose(data.purpose);
      setType(data.type);
      setCategory(data.category);
      setCompany(data.company);
      setPrice(data.price);
      setDiscountPct(data.discountPct);
      setOfferPrice(data.offerPrice);
      setStock(data.stock);
      setExpiry(data.expiry);
      setPreviewSource(data.productPicURL);
      setDescription(data.description);
      window.scrollTo(0, 0);
    })();
  }, []);

  return (
    <div className="h-[1150px] sm:h-[920px] xl:h-[650px]">
      <div className="flex justify-center text-3xl sm:text-[32px] font-semibold mb-4">
        <p className="text-[#37474F]">Product Information</p>
      </div>
      {/* bottom-cont */}
      <div className="xl:flex xl:justify-between xl:h-[80%] xl:mt-12">
        {/* left-cont */}
        <div className="xl:w-[42%] flex flex-col  justify-around h-[450px] sm:h-[380px] xl:h-[100%]">
          {/* product-container */}
          <div className="">
            <p className="mb-1 text-[#37474F] font-semibold">Product Name</p>
            <input
              type="text"
              value={pname}
              className="bg-[#EEEEEE] outline-none rounded-md w-full pl-4 py-1"
              onChange={(e) => setPname(e.target.value)}
            />
          </div>

          {/* pupose, type container */}
          <div className="sm:flex sm:justify-between">
            <div className="mb-4 sm:mb-0 sm:w-[42%]">
              <p className="mb-1 text-[#37474F] font-semibold">Purpose</p>
              <input
                value={purpose}
                type="text"
                className="bg-[#EEEEEE] outline-none rounded-md w-full pl-4 py-1"
                onChange={(e) => setPurpose(e.target.value)}
              />
            </div>
            <div className="sm:w-[42%]">
              <p className="mb-1 text-[#37474F] font-semibold">Type</p>
              <select
                name="type"
                id=""
                value={type}
                className="bg-[#EEEEEE] outline-none rounded-md w-full pl-2 py-1 border-black border-[1px] "
                onChange={(e) => setType(e.target.value)}
              >
                <option value="OTC">OTC</option>
                <option value="Non-OTC">Non-OTC</option>
              </select>
            </div>
          </div>

          {/* category, company container */}
          <div className="sm:flex sm:justify-between">
            <div className="sm:w-[42%] mb-4 sm:mb-0">
              <p className="mb-1 text-[#37474F] font-semibold">Category</p>
              <input
                className="bg-[#EEEEEE] outline-none rounded-md w-full pl-4 py-1 cursor-not-allowed"
                value={category}
                disabled
                // onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="sm:w-[42%]">
              <p className="mb-1 text-[#37474F] font-semibold">Company</p>
              <input
                type="text"
                value={company}
                className="bg-[#EEEEEE] outline-none rounded-md w-full pl-4 py-1"
                onChange={(e) => setCompany(e.target.value)}
              />
            </div>
          </div>

          {/* price, discount%, offer price container */}
          <div className="flex justify-between">
            <div className="w-[30%]">
              <p className="mb-1 text-[#37474F] font-semibold">Price</p>
              <input
                type="number"
                className="bg-[#EEEEEE] outline-none rounded-md w-full pl-4 py-1"
                value={price}
                min="0"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="w-[30%]">
              <p className="mb-1 text-[#37474F] font-semibold">Discount %</p>
              <input
                type="number"
                value={discountPct}
                className="bg-[#EEEEEE] outline-none rounded-md w-full pl-4 py-1"
                onChange={(e) => setDiscountPct(e.target.value)}
              />
            </div>
            <div className="w-[30%]">
              <p className="mb-1 text-[#37474F] font-semibold">Offer Price</p>
              <input
                type="number"
                className="bg-[#EEEEEE] outline-none rounded-md w-full pl-4 py-1 hover:cursor-not-allowed"
                value={offerPrice}
                disabled
              />
            </div>
          </div>
        </div>

        <div className="xl:h-[100%] xl:w-[1px] bg-[#37474F]"></div>

        {/* right-container */}
        <div className="xl:w-[42%] flex flex-col justify-around h-[650px] sm:h-[580px] xl:h-[100%]">
          {/* stock, expiry date container */}
          <div className="sm:flex sm:justify-between">
            <div className="mb-4 sm:mb-0 sm:w-[42%]">
              <p className="mb-1 text-[#37474F] font-semibold">Stock</p>
              <input
                type="number"
                value={stock}
                className="bg-[#EEEEEE] outline-none rounded-md w-full pl-4 py-1"
                onChange={(e) => setStock(e.target.value)}
              />
            </div>
            {category !== 'Health Devices' && (
            <div className="sm:w-[42%]">
              <p className="mb-1 text-[#37474F] font-semibold">Expiry Date</p>
              <input
                type="date"
                min={maxDate}
                value={expiry.split("T")[0]}
                className="bg-[#EEEEEE] outline-none border-black border-[1px] rounded-md w-full px-4 py-1"
                onChange={(e) => setExpiry(e.target.value)}
              />
            </div>
            )}
          </div>

          {/* Add Picture container */}
          {/* <div className="flex items-center">
            <p className="mb-1 text-[#37474F] font-semibold mr-8">
              Add Picture
            </p>
            <input
              type="file"
              className=""
              
              //onChange={(e) => setPicture(e.target.value)}
              onChange={handleFileInputChange}
              accept="image/png, image/gif, image/jpeg"
            />
          </div> */}

          <div className="flex justify-center">
            {previewSource ? (
              <div className="">
                <img
                  src={previewSource}
                  alt=""
                  className="h-[150px] border-[1px] border-[#37474F]"
                />
              </div>
            ) : (
              <div className="h-[150px] w-[150px] bg-[#ffffff] border-[#37474F] border-[1px] flex  flex-col items-center justify-center text-sm">
                <p>No photo</p>
                <p>to preview</p>
              </div>
            )}
          </div>

          {/* Description container */}
          <div className="">
            <p className="mb-1 text-[#37474F] font-semibold">Description</p>
            <textarea
              type="text"
              value={description}
              className="bg-[#EEEEEE] outline-none rounded-md w-full pl-4 py-1 h-[100px] resize-none"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* button container */}
          <div className="flex justify-around sm:mx-16">
            <button
              className="bg-[#37474F] text-white font-medium px-4 py-1 rounded-md"
              onClick={UpdateItem}
            >
              Update Product
            </button>
          </div>
        </div>
      </div>
      <ToastContainer autoClose={3000} hideProgressBar={true} theme="colored" />
    </div>
  );
};

export default UpdateItem;
