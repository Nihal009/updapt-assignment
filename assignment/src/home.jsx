import { useEffect, useState } from "react";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";
import { FaTrash } from "react-icons/fa";
import { LiaSortUpSolid,LiaSortDownSolid } from "react-icons/lia";
import { CiSearch } from "react-icons/ci";
import axios from "axios";
import { data, useNavigate } from "react-router-dom";

// const handleChange(form_data){
  
// }
import {Chart,Title, XAxis} from '@highcharts/react'
import {Line,Bar} from '@highcharts/react/series'
// import NavBar from "./navBar";

import { text } from "@fortawesome/fontawesome-svg-core";


function Home() {
  // const navigate=useNavigate();

  axios.defaults.withCredentials = true
  const [isUpdated,setisUpdated]=useState(false)

  


  useEffect(()=>{
    axios.get("http://localhost:3000/api/getData").then(function (response){
      console.log("response from server:",response.data)
      const data=response.data
      // const cleanedData=data.map((data)=>
      // ({
      //     id:data._id,
      //     CompanyName:data.CompanyName,
      //     Location: data.Location,
      //     IsGlobal: data.IsGlobal,
        
      // }))
      setisUpdated(false)
      console.log("cleaned:",data)
      setUsers(data)
      setfilterCompanyData(data)
      
      // updateFilter()
      
    }).catch(function(error){
      console.log(error)
    })
  },[isUpdated])

  // const options={
  //   chart:{
  //     type:'bar'
  //   },
  //   title:{
  //     text:"Company Stats"
  //   },
  //   XAxis:{
    
  // let [sortConfig,SetSortConfig]=useState({key:null,direction:'asc'})

  


  const Company_data = [
    { 1: { location: ["A", "B", "C"] } },
    { 2: { location: ["D", "E", "F"] } },
    { 3: { location: ["G", "H", "I"] } },
    { 4: { location: ["J", "K", "L"] } },
  ];
  //States
  
  

  
  let [user_data, setUsers] = useState([]);
  const [searchTerm, setSearchterm] = useState("");
  //select element location data
  const [compLocationData, setcompLocationData] = useState([]);

  const [uniqueCompanies, setuniqueCompanies] = useState([]);
  const [filter_locations, setfilter_locations] = useState({});
  const [filterCompanyData, setfilterCompanyData] = useState([...user_data]);

  const [CompanySortState,setCompanySortState]=useState(true)
  const [LocationSortState,setLocationSortState]=useState(true)
  const [stateBeforeSearch,setstateBeforeSearch]=useState()



  const [selectedLocation, setselectedLocation] = useState([]);
  //selected companies
  const [selectedCompanies, setselectedCompanies] = useState([]);
  // const [companyLocationMap,setcompanyLocationMap]=useState([])


  // const cat=filterCompanyData.map(data=>{
  //   return data.CompanyName
    
  // })
  // console.log("cat",cat)
//   }
// }
// const [categories,setcategories]=useState([])
// useEffect(()=>{
//   if(filterCompanyData && filterCompanyData.length !==0){
//   const cat=filterCompanyData.map(data=>{
//     return data.CompanyName
//   })
//   console.log(cat)
//   setcategories(cat)
// }
// },[filterCompanyData])

// const optionsForLocations = {
//   chart: {
//     type: 'column'
//   },
//   title: {
//     text: 'Company Stats Based On Location'
//   },
//   xAxis: {
//     title: {
//       text: 'Companies'
//     },
//     categories: uniqueCompanies
//   },
//   yAxis: {
//     title: {
//       text: 'locations'
//     }
//   },
//   series: [
//     {
//       name: 'number of branches',
//       data: [10, 20, 15,1]
//     }
//   ]
// };

// const [TotalCompanyValues,setTotalCompanyValues]=useState({})
// useEffect(()=>{
//   const TotalC={}
//   user_data.forEach(data=>{
//     if(!TotalC[data.CompanyName]){
//       TotalC.CompanyName=0
//     }
//     TotalC[data.CompanyName]+=Number(data.value)
//     console.log(TotalC)
//   })
//   setTotalCompanyValues(TotalC)
// },[user_data])

// console.log("t",TotalCompanyValues)
// const optionsForValues = {
//   chart: {
//     type: 'column'
//   },
//   title: {
//     text: 'Company Stats Based On Values'
//   },
//   xAxis: {
//     title: {
//       text: 'Companies'
//     },
//     categories: uniqueCompanies
//   },
//   yAxis: {
//     title: {
//       text: 'values'
//     }
//   },
//   series: [
//     {
//       name: 'number of branches',
//       data: [10, 20, 15,1]
//     }
//   ]
// };







  useEffect(()=>{
    if(filterCompanyData.length>0){
      updateFilter() 
    }
  },[filterCompanyData])


  function handleSort(sortkey,sortstate,sortStatefunction){
      let sortedData=[...filterCompanyData].sort((a,b)=>{
        console.log(a[sortkey])
        let valueA=a[sortkey];
        let valueB=b[sortkey];
        if(sortstate){
          return String(valueA).localeCompare(String(valueB));
        }
        else{
          return String(valueB).localeCompare(String(valueA));
        }
      }
      );
      setfilterCompanyData(sortedData)
      sortStatefunction(!sortstate)
    

  }


  function handleSelect(e) {
    const { value } = e.target;
    let updatedSelected;
    // console.log(value)
    setselectedCompanies((prev)=>{
      if(prev.includes(value)){
        // console.log("prevv",prev.includes(value))
        updatedSelected= prev.filter(c=>{
          // console.log("c",c)
          value!==c
        })
      }
      else{
        // console.log([...prev,value])
       
        updatedSelected = [...prev,value]
      }
      applyfilter(updatedSelected,selectedLocation);
      return updatedSelected
    })
    // console.log("s-c",selectedCompanies)
    
    
   
  }
  function applyfilter(companies,locations) {
    console.log("Companies filter:", companies);
    const f_data = user_data.filter((data) => {
     const company =companies.length ===0 ||companies.includes(String(data.CompanyName));
     const location=locations.length ===0 || locations.includes(data.Location);
    
     return company && location;
    });
    
console.log("Locations filter:", locations);
console.log("fdata",f_data)
    setfilterCompanyData(f_data);
    
  }

  function handleLocFilter(e) {
    const { checked, value } = e.target;
    let updatedSelected;
    if (checked) {
      updatedSelected = [...selectedLocation, value];
      // setselectedLocation(updatedSelected)
    } else {
      // setfilterCompanyData([...user_data])
      updatedSelected = selectedLocation.filter(
        (location) => location !== value
      );
      // setselectedLocation(updatedSelected)
    }
    
    setselectedLocation(updatedSelected);
    applyfilter(selectedCompanies,updatedSelected);
  }

  // function handle_filter() {
  //   const filter_data = user_data.filter((data) => {
  //     selectedCompanies.includes(data.CompanyName);
  //   });
  // }
  // console.log("selected",selectedCompanies)
  // console.log("filtered",filterCompanyData)

  //Dropdown Change Handler
  function handleCompanyChange(e) {
    const selectedCompany = e.target.value;
    setFormData((prev) => ({
      ...prev,
      CompanyName: selectedCompany,
      Location: "",
    }));
    const companyObj = Company_data.find(
      (obj) => Object.keys(obj)[0] === selectedCompany
    );
    if (companyObj) {
      setcompLocationData(companyObj[selectedCompany].location);
    } else {
      setcompLocationData([]);
    }
  }

  // ;

  //checkbox data handler
  // function handleCompanyCheckboxChange(e){
  //   // const[value:CompanyName,checked]=e.target;
  //   const [value,checked]=e.target
  //   if(checked){
  //   setselectedCompanies((prev)=>{
  //     return prev=[...prev,value]

  //   })}

  // }

  //filter handler
  // function handlefilter(e) {
  //   const { value, checked } = e.target;

  //   setfilterCompanyData((prev) => {
  //     if (checked) {

  //       return (prev = [...prev, value]);

  //     } else {
  //       return prev.filter((data) => data !== value);
  //     }
  //   });
  // }
  // console.log("filterCompanyData",filterCompanyData)

  //search handler
  function handleSearch(e) {
    const curr_value=e.target.value

    setSearchterm(curr_value);
    
    // setstateBeforeSearch([...filterCompanyData])
    if(curr_value===""){
      console.log("empty")
      setfilterCompanyData([...stateBeforeSearch])

    }
    else{
      if(searchTerm===""){
        setstateBeforeSearch([...filterCompanyData])
      }

      console.log(curr_value)
      const Search_result = filterCompanyData.filter((user) => {
        
          return (
            String(user.CompanyName)===String(curr_value) ||
            user.Location.toLowerCase().includes(curr_value.toLowerCase())
          );
        });
        console.log("Search_result", Search_result);
        setfilterCompanyData(Search_result)
        
    }
  }
  // const sortedUsers=[...user_data].sort(()=>{})
  // console.log(user_data)
  let [form_data, setFormData] = useState({
    CompanyName: "",
    Location: "",
    IsGlobal: false,
    id:"",
    value:0
  });

  function handleChange(e) {
    const { name, type, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    
  }
  async function Add_CompanyAPI(data){
    try{
    await axios.post("http://localhost:3000/api/addCompany/",data);
    setisUpdated(true);  
    setFormData({
      CompanyName: '',
      Location: '',
      IsGlobal: false,
      value: 0
    });
  }
  catch (error){
    console.error("error updating the data",error);
    
  }
  


}


  function add_user(e) {
    e.preventDefault();
    if (form_data.CompanyName && form_data.Location) {
      Add_CompanyAPI(form_data)
      setFormData({ CompanyName: "", Location: "", IsGlobal: false,value:0 });
      // const updatedUsers = [...user_data, form_data];
      // setUsers(updatedUsers);
      // setfilterCompanyData(updatedUsers);

      // console.log("user-data", user_data);
    }
      

      
  }

  function updateFilter(){
  const filter_ele = [
    ...new Set(filterCompanyData.map((user) => user.CompanyName)),
  ];
  const LocationMap = {};
  console.log("filter_ele",filter_ele)
  filter_ele.forEach((company) => {
    LocationMap[company] = [
      ...new Set(
        filterCompanyData
          .filter((user) => user.CompanyName === company)
          .map((user) => user.Location)
      ),
    ];
  });
  setuniqueCompanies(filter_ele);
      // console.log("f_loc", LocationMap);
      // console.log("asas", filter_ele);
      setfilter_locations(LocationMap);
      
      setcompLocationData([]);
}
  
  function deleteUser(id) {
    // setUsers((prev) => prev.filter((_, idx) => idx !== index));
    try{
       axios.delete(`http://localhost:3000/api/delete/${id}`);
       setisUpdated(true);  
    }
    catch (error){
      console.error("error deleting the data:",error);
      
    }
    
  }
  return (
    <>
    {/* <NavBar/> */}
     
    {/* <NavBar/> */}
      <br />
    <div className="tracker-content">
      <div className="input-group flex-nowrap ms-4 gap-4">
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Add Company
        </button>
        <div className="dropdown">
          <button
            type="button"
            className="btn btn-danger dropdown-toggle ms-4"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Filter
          </button>
          


          <ul className="dropdown-menu">
            <p className="text-center">Companies</p>
            {uniqueCompanies.map((ele) => (
              <>
                <li key={ele} className="dropdown-item">
                  <label htmlFor="form-select">{ele}</label>
                  <input
                    type="checkbox"
                    value={ele}
                    name="filter_data"
                    checked={selectedCompanies.includes(String(ele))}
                    onChange={handleSelect}
                    className="form-group"
                  />

                  <div className="d-flex flex-wrap gap-2 mt-2 ms-3">
                    
                    {filter_locations[ele] &&
                      filter_locations[ele].map((location, id) => {
                        return (
                          <div key={id} className="form-check">
                            <label htmlFor="form-select">{location}</label>
                            <input
                              type="checkbox"
                              name=""
                              id=""
                              disabled={!selectedCompanies.includes(String(ele))}
                              value={location}
                              checked={selectedLocation.includes(location) && selectedCompanies.includes(String(ele))}
                              className="form-check-input"
                              onChange={handleLocFilter}
                            />
                          </div>
                        );
                      })}
                  </div>
                </li>

                
              </>
              
            ))}
          </ul>
        </div>
        {/* <button type='button' className='btn btn-secondary ms-4'>Filter</button> */}

        

        <input
          type="text"
          className="form-control ms-4"
          placeholder="Search by Company Name or Location"
          value={searchTerm}
          onChange={
            // setSearchterm(e.target.value)
            handleSearch
          }
          aria-label="CompanyName"
          aria-describedby="addon-wrapping"
        />
        
      </div>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Add Company
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={(e) => add_user(e)
        
              }>
                <div className="conatiner">
                  <div className="row">
                    <label htmlFor="cars">Choose Company:</label>

                    <select
                      name="CompanyName"
                      className="mb-4 form-select"
                      id="CompanyName"
                      value={form_data.CompanyName}
                      onChange={handleCompanyChange}
                    >
                      <option value="">Select Company</option>
                      {Company_data.map((obj, index) => {
                        const company_name = Object.keys(obj)[0];
                        return (
                          <option key={index} value={company_name}>
                            {company_name}
                          </option>
                        );
                      })}
                    </select>
                    <select
                      name="Location"
                      id="CompanyLocation"
                      value={form_data.Location}
                      onChange={handleChange}
                      className="form-select mb-4"
                      disabled={!compLocationData.length}
                    >
                      <option value="">Select location</option>
                      {compLocationData.map((loc, index) => (
                        <option key={index} value={loc}>
                          {loc}
                        </option>
                      ))}
                    </select>
                    <label htmlFor="IsGlobalCheck" form-check-label="true">
                      <input
                        type="checkbox"
                        name="IsGlobal"
                        id="isGlobalcheck"
                        checked={form_data.IsGlobal}
                        onChange={handleChange}
                        className="form-check-input mb-4"
                      />
                      Isglobal
                    </label>
                    <label htmlFor="valueInput" className="form-label" form-check-label="true">Value:</label>
                    <input type="number" className="form-control form-control-lg shadow-sm mb-4" name="value" id="" value={form_data.value} onChange={handleChange}/>
                    

                    {/* <input type="text" name="CompanyName" id="" placeholder='Enter Company Name' value={form_data.CompanyName} onChange={handleChange}/> */}
                    {/* </div> */}
                    {/* <div className='row'>
          <input type="text" name="Location" id="" placeholder='Enter location' value={form_data.Location} onChange={handleChange}/> */}
                  </div>
                  <div className="row">
                    {/* <div className='col-3'><input type="checkbox" name="isGlobal" id="isGlobalcheck" checked={form_data.IsGlobal} onChange={handleChange} className='form-check-input'/>
          <label htmlFor="IsGlobalCheck" form-check-label="true">Isglobal</label>
          </div> */}
                    {/* <div className='col-9'><button className="btn-primary" type="submit">Add User</button></div> */}
                  </div>
                </div>
                <button type="submit" className="btn btn-primary">
                  Add
                </button>
              </form>
            </div>
            
          </div>
          
        </div>
        
      </div>
      
<hr />
      <table className="table">
        <thead>
          <tr className="">
            <th scope="col">#</th>
            {/* <th scope="col">Id <FontAwesomeIcon icon={faSort} /></th> */}
            <th scope="col" onClick={()=>handleSort("CompanyName",CompanySortState,setCompanySortState)}>
              Company Name {CompanySortState?<LiaSortUpSolid />:<LiaSortDownSolid />}
            </th>
            <th scope="col" onClick={()=>handleSort("Location",LocationSortState,setLocationSortState)}>
              Location {LocationSortState?<LiaSortUpSolid />:<LiaSortDownSolid />}
            </th>
            <th scope="col">
              IsGlobal <FontAwesomeIcon icon={faSort} />
            </th>
            <th scope="col">Value</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {user_data.length > 0 ? (
            filterCompanyData.map((user, index) => (
              <tr key={index + 1}>
                <td>{index + 1}</td>
                {/* <td>{index+1}</td> */}
                <td>{user.CompanyName}</td>
                <td>{user.Location}</td>

                <td
                  className={
                    user.IsGlobal
                      ? "text-success fw-bold"
                      : "text-danger fw-bold"
                  }
                >
                  {" "}
                  {user.IsGlobal ? "True" : "False"}
                </td>
                {/* <td><button type="button" className="btn-danger" onClick={()=>{
            deleteUser(index)
          }}>Delete</button>
      </td> */}
                
                <td>
                {Number(user.value)}
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => {
                      deleteUser(user._id);
                    }}
                  >
                    <FaTrash />
                  </button>
                </td>
                {/* <td><button type="button" className="btn btn-warning" onClick={()=>{
            deleteUser(index)}}>Edit</button>
            </td> */}
              </tr>
            ))
          ) : (
            <tr>
              <td>No data Found</td></tr>
          )}
        </tbody>
      </table>
          
      {/* <Chart>
        <h1>Chart</h1>
        <Line.Series data={[1,2,3,4,5]}/>
      </Chart>
         <Chart>
          <Bar.Series data={[1,2,3]}
          />
          </Chart>  */}
      {/* <form onSubmit={(e)=>add_user(e)}>
          <input type="text" name="name" id="" placeholder='Enter Company Name' value={form_data.CompanyName} onChange={handleChange}/>
          <input type="text" name="location" id="" placeholder='Enter location' value={form_data.email} onChange={handleChange}/>
          <input type="checkbox" name="isglobal" id="isGlobal" checked={form_data.IsGlobal}/>
          <label for="vehicle1">Isglobal</label>
          <button type="submit">Add User</button>
        </form> */}
        </div>

        
    </>
  );
}

export default Home;
