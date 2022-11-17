import React, { useState } from 'react'
import Chart from "react-apexcharts"
import { useGlobalContext } from '../Context'

export default function StockChart(props) {
    const {stockPrice, stock} = useGlobalContext()
    const{day, week, year} = stockPrice[0]
    const [dateFormat, setDateFormat] = useState("24h")

    function determineTimeFormat (){
        switch(dateFormat){
            case "24h": return day
            case "7d": return week
            case "1yr": return year
            default: return day
        }
    }

    const color = determineTimeFormat().slice(-1)[0].y - determineTimeFormat()[0].y > 0 ?"#26C281":"#ed3419"
    console.log(color)


    const option = {
        colors:[color],
        title:{
        text:stock,
        align:"center",
        style:{
            fontSize:"24px"
        }},
        chart:{
            id:"stock data",
            animations:{speed:1300}
        },
        xaxis:{
            type:"datetime",
            labels:{
                datetimeUTC:false
            }
        },
        tooltip:{
            x:{
                format:"MMM dd HH:MM"
            }
        }
    }

    const series = [{
        name:stock,
        data:determineTimeFormat()
    }]

    function renderButtonSelect(button){
        const classes = "btn m-1"
        if(button === dateFormat){
            return (classes +" btn-primary")
        } else{
            return (classes + " btn-outline-primary")
        }
    }

  return (
    <div className="mt-5 p-4 shadow-sm bg-white">
        <Chart options = {option} series={series} type="area" width="100%" />
        <div>
            <button onClick={()=>setDateFormat("24h")} className={renderButtonSelect("24h")}>24h</button>
            <button onClick={()=>setDateFormat("7d") } className={renderButtonSelect("7d")} >7d</button>
            <button onClick={()=>setDateFormat("1yr")} className={renderButtonSelect("1yr")}>1yr</button>
        </div>
    </div>
  )
}
