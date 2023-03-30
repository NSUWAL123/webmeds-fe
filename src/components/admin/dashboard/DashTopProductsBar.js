import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
  );
  
  const DashTopProductsBar = (props) => {
    const {figures, monthYear} = props;
    let productIds = figures.products;
    if (productIds.length > 5) {
      productIds = productIds.slice(0, 5)
    }
    const [products, setProducts] = useState([]);
    const [productsSold, setProductsSold] = useState([]);

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    useEffect(() => {
      (async () => {  
        const products = [];
        const productsSold = [];
        for (let i = 0; i < productIds.length; i++) {
          const product = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/products/id/${productIds[i].pid}`,
            config 
          );
          products.push(product.data.pname);
          productsSold.push(productIds[i].pqty);
        }
        setProducts(products);
        setProductsSold(productsSold)
      })();
    }, [productIds]);
 
   const options = {
     responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };
  const labels = products; 
  const data1 = productsSold;
  
   const data = {
    labels,
    datasets: [ 
      {
        label: "Sold this Month",
        data: data1,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  return (
    <div className="w-full xl:w-auto mt-10 xl:mt-0 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-medium text-[#8a8a8a]">
        Top 5 Sold Products of {monthYear}:
      </h1>

      <Bar options={options} data={data} className="my-4 w-[500px]" />
    </div>
  );
};

export default DashTopProductsBar;
