import React from 'react'
import salesIcn from "../../../pictures/icons/dashSales.svg"
import purchaseIcn from "../../../pictures/icons/dashPurchase.svg"
import returnIcn from "../../../pictures/icons/dashReturn.svg"
import prescriptionIcn from "../../../pictures/icons/dashPrescription.svg"


const DashSales = (props) => {
    const {figures} = props;
  return (
    <div className='flex justify-evenly flex-wrap xl:justify-between gap-y-5 my-5'>
        {/* product sales */}
        <div className='bg-[#5D94E7] w-full text-white h-[8rem] flex flex-col justify-evenly px-4 rounded-md max-w-[320px] '>
            <div className='flex items-center'>
                <img src={salesIcn} alt="" className='w-[40px] bg-[#81aff4] rounded-full p-1 mr-3'/>
                <p>Product Sales</p>
            </div>
            <h2 className='text-2xl'>{figures.productSales}</h2>
            <p>for this month</p>
        </div>

        {/* product sales */}
        <div className='bg-[#31D490] w-full text-white h-[8rem] flex flex-col justify-evenly px-4 rounded-md max-w-[320px] '>
            <div className='flex items-center'>
                <img src={returnIcn} alt="" className='w-[40px] h-[40px] bg-[#5be8ad] rounded-full p-1 mr-3'/>
                <p>Orders Fulfilled</p>
            </div>
            <h2 className='text-2xl'>{figures.ordersFulfilled}</h2>
            <p>for this month</p>
        </div>
        {/* product sales */}
        <div className='bg-[#FFC655] w-full text-white h-[8rem] flex flex-col justify-evenly px-4 rounded-md max-w-[320px]'>
            <div className='flex items-center'>
                <img src={prescriptionIcn} alt="" className='w-[40px] h-[40px] bg-[#ffd684] rounded-full p-1 mr-3'/>
                <p>Prescriptions Fulfilled</p>
            </div>
            <h2 className='text-2xl'>{figures.prescriptionsFulfilled}</h2>
            <p>for this month</p>
        </div>
        {/* product sales */}
        <div className='bg-[#232539] w-full text-white h-[8rem] flex flex-col justify-evenly px-4 rounded-md max-w-[320px] '>
            <div className='flex items-center'>
                <img src={purchaseIcn} alt="" className='w-[40px] h-[40px] bg-[#5c5e79] rounded-full p-1 mr-3'/>
                <p>Failed Deliveries</p>
            </div>
            <h2 className='text-2xl'>{figures.failedDeliveries}</h2>
            <p>for this month</p>
        </div>
    </div>
  )
}

export default DashSales