// cdck2aiad3ic4dieblt0cdck2aiad3ic4diebltg
import React, { createContext, useContext, useEffect, useState } from 'react'


const AppContext = createContext()

export function AppProvider({children}){
    
    const [watchList, setWatchList] = useState(["AAPL","MSFT","TSLA"])
    const [stocks, setStocks] = useState({})
    const token = "&token=cdck2aiad3ic4dieblt0cdck2aiad3ic4diebltg"
    const url = `https://finnhub.io/api/v1/quote?symbol=`
    async function fetchData(){
        try {
            
            const data = await Promise.all(watchList.map(async stock=>{
                const res = await fetch(url+stock+token)
                const data = await res.json()
                return {symbol:stock,data:data}
            }))

            setStocks(data)
        } catch (error) {
            console.log(error)
        }

    }
    // console.log(stocks)

    useEffect(()=>{
        fetchData()
    },[])



    return(
        <AppContext.Provider value={{stocks}}>{children}</AppContext.Provider>
    )
}


export function useGlobalContext(){
    return(useContext(AppContext))
}