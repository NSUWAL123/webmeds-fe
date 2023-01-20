import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../../components/DeleteModal";

const ManageProduct = () => {
  const navigate = useNavigate();
  let [products, setProducts] = useState([]);
  const [currProduct, setCurrProduct] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    (async () => {
      //await getAllProducts()
      const response = await axios.get("http://localhost:5000/products/");
      const { data } = response;

      setProducts(data);
    })(); 
  }, []);

  const updateHandler = (product) => {
    //setShowUpdateModal(true);
    setCurrProduct(product)
    navigate(`/admin/manage-product/update/${product._id}`)
    console.log(product)
  }

  const deleteHandler = (product) => {
    setCurrProduct(product)
    setShowDeleteModal(true);
    console.log(product)
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
            <th className="p-3 border font-medium">Product Name</th>
            <th className="p-3 border font-medium">In Stock</th>
            <th className="p-3 border font-medium">Price</th>
            <th className="p-3 border font-medium">Stock</th>
            <th className="p-3 border font-medium">Expiry Date</th>
            <th className="p-3 border font-medium">Action</th>
          </tr>

          {products.map((product) => {
            
            return (
              <tr key={product._id} className="even:bg-[#F2F2F2] hover:bg-[#DDDDDD]">
                <td className="p-2 border">{product.pname}</td>
                <td className="text-center border">{product.stock}</td>
                <td className="text-center border">{product.price}</td>
                <td className="text-center border">{product.stock}</td>
                <td className="text-center border">{product.expiry.split("T")[0]}</td>
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
        <DeleteModal indproduct={currProduct} setShowDeleteModal={setShowDeleteModal}/>
      </div>
      </div>
    </div>
  );
};

export default ManageProduct;