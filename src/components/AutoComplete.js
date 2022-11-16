import React from 'react'
import { useGlobalContext } from '../Context'

export default function AutoComplete() {

  const {search, searchOnchange, searchResult, onClickSearch} = useGlobalContext()
  return (
    <div className='w-50 p-5 rounded mx-auto'>
      <div className='form-floating dropdown'>
        <input style={{backgroundColor:"rgba(145,150,171,0.4"}} id="search" type="text"
        className="form-control" placeholder="Search" autoComplete='off' value={search} onChange={searchOnchange}>

        </input>
         <label htmlFor='search'>Search</label>
         <ul className={`dropdown-menu ${searchResult.length>0&&"show"}`}
         style={{height:"500px", overflowY:"scroll", overflowX:"hidden", cursor:"pointer"}}>
          {searchResult&&searchResult.map(result=><li key={result.symbol} 
          className="dropdown-item" onClick={onClickSearch} id={result.symbol}>{result.description} ({result.symbol})
          </li>)}
         </ul>
      </div>
    </div>
  )
}
