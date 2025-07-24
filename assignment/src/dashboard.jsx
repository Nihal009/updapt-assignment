import React, { useEffect, useState } from 'react'
import Highcharts, { chart } from 'highcharts';
import HighchartsReact from 
'highcharts-react-official';
import axios from 'axios';

import { FaChartBar,FaChartLine } from "react-icons/fa";

const Dashboard = () => {
    const [GraphType,setGraphType]=useState("column")
    const [CompanyData,setCompanyData]=useState([])
    axios.defaults.withCredentials = true
    useEffect(()=>{
        axios.get("http://localhost:3000/api/getData").then(function (response){
          console.log("response from server:",response.data)
          const data=response.data
          setCompanyData(data)
        }).catch(function(error){
          console.log(error)
        })
      },[])
const LocData={}
const Locations=[]
const CList={}
const Companies=[]
CompanyData.map((data)=>{
  if(!LocData[data.Location]){
    LocData[data.Location]=data.value
    Locations.push(data.Location)
  }
  else{
    LocData[data.Location]+=data.value
  }

}  
)

CompanyData.map((data)=>{
  if(!CList[data.CompanyName]){
    CList[data.CompanyName]=data.value
    Companies.push(data.CompanyName)
  }
  else{
    CList[data.CompanyName]+=data.value
  }

}  
)

const values=Object.values(LocData)
const totalvalues=Object.values(CList)
// console.log(CompanyList)

// console.log(grapshData)
const toggleButtonStyle = {
  cursor: 'pointer',
  padding: '10px',
  margin: '10px',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '5px',
  
};


const optionsForLocations = {
    chart: {
      type: GraphType
    },
    title: {
      text: 'Company Growth Based On Location'
    },
    xAxis: {
      title: {
        text: 'Locations'
      },
      categories: Locations
    },
    yAxis: {
      title: {
        text: 'locations'
      }
    },
    series: [
      {
        name: 'Growth value',
        data: values
      }
    ]
  };

  const optionsForValues = {
    chart: {
      type: GraphType
    },
    title: {
      text: 'Companywise growth'
    },
    xAxis: {
      title: {
        text: 'Companies'
      },
      categories: Companies
    },
    yAxis: {
      title: {
        text: 'locations'
      }
    },
    series: [
      {
        name: 'Growth Value',
        data: totalvalues
      }
    ]
  };

  function toggleChart(gtype){
   setGraphType(gtype) 
  }
  
  
    return (
    
    <>
    <div className="d-flex justify-content-center mb-3">
      <div 
        style={{
          ...toggleButtonStyle,
          backgroundColor: GraphType === 'column' ? '#e9ecef' : 'transparent'
        }}
        onClick={() => toggleChart('column')}
      >
        <label>BarGraph</label>
        <FaChartBar />
      </div>
      <div 
        style={{
          ...toggleButtonStyle,
          backgroundColor: GraphType === 'line' ? '#e9ecef' : 'transparent'
        }}
        onClick={() => toggleChart('line')}
      >
        <label>LineGraph</label>
        <FaChartLine />
      </div>
    </div>
    
    <div className="container">
          <div className="row">
          <div className="col"><HighchartsReact highcharts={Highcharts} options={optionsForValues}/></div>
          <div className="col"><HighchartsReact highcharts={Highcharts} options={ optionsForLocations}/></div>
          </div>
          
        </div>
    </>
  )
}

export default Dashboard
