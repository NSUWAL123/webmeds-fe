import React from 'react'
import { useParams } from 'react-router-dom'

const DealsPage = () => {
    const {deal} = useParams();
  return (
    <div>{deal}</div>
  )
}

export default DealsPage