import React from 'react'
import { useGlobalContext } from '../Context'

export default function StockList() {

    const {stocks} = useGlobalContext()
  return (
    <div>
      <table className='table hover mt-5'>
        <thead style={{color:"rgb(79,89,102"}}>
          <tr>
            <th scope='col'>Name</th>
            <th scope='col'>Last</th>
            <th scope='col'>Chg</th>
            <th scope='col'>Chg%</th>
            <th scope='col'>High</th>
            <th scope='col'>Low</th>
            <th scope='col'>Open</th>
            <th scope='col'>Close</th>
          </tr>
          </thead>
          <tbody>
            {stocks.map((stock)=>{
              const {c,d,dp,h,l,o,pc} = stock.data
              return(
                <tr className='table-row' key={stock.symbol}>
                  <th scope='row'>{stock.symbol}</th>
                  <td>{c}</td>
                  <td className={`text-${d>0?'success':'danger'}`}>{d}</td>
                  <td className={`text-${d>0?'success':'danger'}`}>{dp}</td>
                  <td>{h}</td>
                  <td>{l}</td>
                  <td>{o}</td>
                  <td>{pc}</td>
                </tr>
              )
            })}
          </tbody>


      </table>
    </div>
  )
}
