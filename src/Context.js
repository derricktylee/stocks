// cdck2aiad3ic4dieblt0cdck2aiad3ic4diebltg
import React, { createContext, useContext, useEffect, useState } from 'react'


const AppContext = createContext()

export function AppProvider({children}){
    const [searchResult, setSearchResult] = useState([])
    const [search, setSearch] = useState("")
    const [watchList, setWatchList] = useState(JSON.parse(localStorage.getItem("stocks")).length?JSON.parse(localStorage.getItem("stocks")):["AAPL","MSFT","TSLA"])
    const [stocks, setStocks] = useState([])
    const[stock, setStock] = useState("")
    const [stockPrice, setStockPrice] = useState([{day:{x:0,y:0}},{week:{x:0,y:0}},{year:{x:0,y:0}}])
    const token = "&token=cdck2aiad3ic4dieblt0cdck2aiad3ic4diebltg"
    const url = `https://finnhub.io/api/v1/quote?symbol=`
    const searchUrl = "https://finnhub.io/api/v1/search?q="
    const stockUrl = "https://finnhub.io/api/v1/stock/candle?symbol="
   

    useEffect(()=>{
        localStorage.setItem("stocks",JSON.stringify(watchList))

    },[watchList])


    useEffect(()=>{
        let isFetching = true
        async function fetchData(){

            try {
                

                const data = await Promise.all(watchList.map(async stock=>{
                    const res = await fetch(url+stock+token)
                    const data = await res.json()
                    return {symbol:stock,data:data}
                }))
    
                if(isFetching){setStocks(data)}
            } catch (error) {
                console.log(error)
            }
        }
        fetchData() 
        return ()=>{isFetching=false}
    },[watchList])

    function searchOnchange(e){
        setSearch(e.target.value)

    }

    

    useEffect(()=>{
        let isFetching = true
        async function fetchSearchData(){

            try { const res = await fetch(searchUrl+search+token)
                const data = await res.json()
                if(isFetching){setSearchResult(data.result)}
                
                
            } catch (error) {
                console.log(error)
            }}
        if(search.length>0){
        fetchSearchData()}
        else{
            setSearchResult([])
        } return()=>{isFetching=false}

    }
    ,[search])

    function onClickSearch(e){
        const newStockSymbol = e.target.id
        if(watchList.indexOf(newStockSymbol)===-1){
        setWatchList(preList=>{
            return([...preList,newStockSymbol])
        })
        setSearch("")}
    }
    const date = new Date()
    const currentTime = Math.floor(date.getTime()/1000)
    let oneDay = 0
    if(date.getDay === 0){
     oneDay = currentTime-3*24*60*60}
    else if(date.getDay === 6){
     oneDay = currentTime-2*24*60*60
    } else if(date.getDay===1 && date.getHours === 14)
    {oneDay = currentTime- 4*24*60*60}
    else{oneDay = currentTime - 24*60*60}
    const oneWeek = currentTime - 7*24*60*60
    const oneYear = currentTime - 365*24*60*60


    function formateData(e){
        return e.t.map((el,index)=>{
            return({
                x:el*1000,
                y: Math.round(e.c[index]*100)/100
            })
        })
    }



    useEffect(()=>{
        let isFetching = true
        async function fetchStock(){
            try {
                
                const res = await Promise.all([
                    fetch(stockUrl+stock+"&resolution=30&from="+oneDay+"&to="+currentTime+token).then(resp=>resp.json()),
                    fetch(stockUrl+stock+"&resolution=60&from="+oneWeek+"&to="+currentTime+token).then(resp=>resp.json()),
                    fetch(stockUrl+stock+"&resolution=W&from="+oneYear+"&to="+currentTime+token).then(resp=>resp.json())
                ])     
    
                if(isFetching){setStockPrice(
                    [
                        {day:formateData(res[0]),
                        week:formateData(res[1]),
                        year:formateData(res[2])}
                    ]
                )}
    
            } catch (error) {
                console.log(error)
            }   
        }
        fetchStock()
        return()=>{isFetching = false}
    
    },
    [stock])

    function removeStock(e){
        setWatchList(prevWatchList=>{
            const newList = prevWatchList.filter(list=>list!==e.target.id)
            return newList
        })
        
    }
    


    return(
        <AppContext.Provider value={{stocks,search,searchOnchange,searchResult, onClickSearch, setStock, stockPrice,stock, removeStock}}>{children}</AppContext.Provider>
    )
}


export function useGlobalContext(){
    return(useContext(AppContext))
}