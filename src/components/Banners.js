import React from 'react'
import { useNavigate } from 'react-router-dom'

const Banners = () => {
    const navigate = useNavigate();
    const navigateTo = (endpoint) => {
        navigate(`/category/${endpoint}`)
    }

  return (
    <div className='flex flex-col items-center gap-4'>
        <div className='category-deals flex flex-col gap-4 items-center w-full sm:flex-row sm:justify-around'>
            <img src="https://res.cloudinary.com/droaizhlu/image/upload/v1680394388/banners/skin_care_dunnxy.svg" alt="" className='w-full sm:w-[46%] cursor-pointer' onClick={() => navigateTo('Skin Care')}/>
            <img src="https://res.cloudinary.com/droaizhlu/image/upload/v1680394388/banners/baby_care_g1zztg.svg" alt="" className='w-full sm:w-[46%] cursor-pointer' onClick={() => navigateTo('Baby Care')}/>
        </div>
        <div className='hot-deals w-full max-w-[1150px]'>
            <img src="https://res.cloudinary.com/droaizhlu/image/upload/v1680394387/banners/hot_deals_l0te2u.svg" alt="" className='w-full cursor-pointer' onClick={() => navigate('deals/hot-deals')}/>
        </div>
    </div>
  )
}

export default Banners