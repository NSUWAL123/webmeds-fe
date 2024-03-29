import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../../components/DeleteModal";
import checkExpiry from "../../utils/checkExpiry";
import Loading from "../../components/Loading";

const ManageProduct = () => {
  const navigate = useNavigate();
  let [products, setProducts] = useState([]);
  const [currProduct, setCurrProduct] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      //await getAllProducts()
      setLoading(true);
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/products/`);
      const { data } = response;
      setProducts(data);
      setLoading(false);
    })(); 
  }, []);

  const updateHandler = (product) => {
    //setShowUpdateModal(true);
    setCurrProduct(product)
    navigate(`/admin/manage-product/update/${product._id}`)
  }

  const deleteHandler = (product) => {
    setCurrProduct(product)
    setShowDeleteModal(true);
  }

  return (
    <div className="">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-medium text-[#37474F]">Manage Product</h3>
        <button className="bg-[#5D94E7] text-white font-medium px-2 sm:px-4 py-1 rounded-md" onClick={() => navigate('/admin/add-product')}>Add Product</button>
      </div>
      
      <div className="overflow-x-auto">

      
      <table className="w-full">
        <tbody className="">
          <tr className="border bg-[#31D490] text-white">
            <th className=""></th>
            <th className="p-3 border font-medium max-w-[400px]">Product Name</th>
            {/* <th className="p-3 border font-medium">In Stock</th> */}
            <th className="p-3 border font-medium">Price</th>
            <th className="p-3 border font-medium">Stock</th>
            <th className="p-3 border font-medium">Expiry Date</th>
            <th className="p-3 border font-medium">Action</th>
          </tr>

          {products.map((product) => {
            
            return (
              <tr key={product._id} className="even:bg-[#F2F2F2] hover:bg-[#DDDDDD]">
                <td className="text-center min-w-[50px] max-w-[80px]"><img src={product.productPicURL} alt="" className="min-w-[50px] max-w-[80px] mx-auto"/></td>
                {/* <img src={product.productPicURL} alt="" className="min-w-[50px]"/> */}
                <td className="p-2 border max-w-[400px]">{product.pname}</td>
                {/* <td className="text-center border">{product.stock}</td> */}
                <td className="align-middle border">{product.price}</td>
                <td className="text-center border">{product.stock}</td>
                <td className={`text-center border ${checkExpiry(product.expiry) && "text-red-500"}`}>{product.expiry && product.expiry.split("T")[0]}</td>
                <td className="text-center border">
                  <button className="bg-[#37474F] text-sm text-white px-2 py-1 rounded-md m-2" onClick={() => {updateHandler(product)}}>Update</button>
                  <button className="bg-[#E25247] text-sm text-white px-2 py-1 rounded-md m-2" onClick={() => {deleteHandler(product)}}>Delete</button>
                </td>
              </tr>

              //<p key={product._id}>{product.pname}</p>
            );
          })}
        </tbody>
      </table>

      {/* update */}
      <div className={showDeleteModal ? "block": "hidden"}>
        <DeleteModal indproduct={currProduct} setShowDeleteModal={setShowDeleteModal} products={products} setProducts={setProducts}/>
      </div>
      </div>
      {loading && <Loading/>}
    </div>
  );
};

export default ManageProduct;