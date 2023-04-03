import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import ProductItem from '../components/ProductItem';
import Loading from '../components/Loading'

const DealsPage = () => {
    const {deal} = useParams();
    const [deals, setDeals] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
      (async () => {
        setLoading(true);
        const {data} = await axios.get(`${process.env.REACT_APP_BASE_URL}/deals/${deal}`)
        setDeals(data);
        setLoading(false);
      })()
    }, [])
  return (
    <div>
      <div className="w-[100%] flex flex-wrap justify-around gap-4 sm:gap-8 ">
        {deals.map((product) => {
          return <ProductItem key={product._id} product={product} />;
        })}
      </div>
      {loading && <Loading/>}
    </div>
  )
}

export default DealsPage