import React from 'react'
import { useGlobalContext } from '../Context'
import {BsFillCaretUpFill, BsFillCaretDownFill} from "react-icons/bs"
import { Link } from 'react-router-dom'

export default function StockList() {

    const {stocks, removeStock, setStock} = useGlobalContext()
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
            {stocks&&stocks.map((stock)=>{
              const {c,d,dp,h,l,o,pc} = stock.data
              return(
                <tr className='table-row' key={stock.symbol}>

                  <th scope='row'>
                    <Link to={`/detail/${stock.symbol}`} style={{textDecoration:"none", color:"black"}} >
                      {stock.symbol}
                  </Link>
                  </th>

                  <td>{c}</td>
                  <td className={`text-${d>0?'success':'danger'}`}>{d}{d>0?<BsFillCaretUpFill/>:<BsFillCaretDownFill/>}</td>
                  <td className={`text-${d>0?'success':'danger'}`}>{dp}{d>0?<BsFillCaretUpFill/>:<BsFillCaretDownFill/>}</td>
                  <td>{h}</td>
                  <td>{l}</td>
                  <td>{o}</td>
                  <td>{pc}<button className='btn btn-danger btn-sm ml-3 d-inline-block delete-btn' onClick={removeStock} id={stock.symbol}>Remove</button></td>

                </tr>
              )
            })}
          </tbody>


      </table>
    </div>
  )
}
