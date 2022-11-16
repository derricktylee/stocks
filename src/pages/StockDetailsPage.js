import React from 'react'
import { useParams } from 'react-router-dom'
import { useGlobalContext } from '../Context'

export default function StockDetailsPage() {
  const {symbol} = useParams()
  const{setStock} = useGlobalContext()
  setStock(symbol)

  return (
    <div>{symbol}</div>
  )
}
