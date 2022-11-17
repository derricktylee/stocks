import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useGlobalContext } from '../Context'
import StockChart from '../components/StockChart'

export default function StockDetailsPage() {
  const {symbol} = useParams()
  const{setStock, stockPrice} = useGlobalContext()
  useEffect(()=>{
    setStock(symbol)
  },[symbol])



  return (
    <div>

      {stockPrice && 
      <div>
        <StockChart/>    
      </div>}
    </div>
  )
}
