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

// const handleChange(form_data){
  
// }

function Home() {
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
      updateFilter()
      
    }).catch(function(error){
      console.log(error)
    })
  },[isUpdated])
  // let [sortConfig,SetSortConfig]=useState({key:null,direction:'asc'})

  function handleLogout(){
    axios.delete("http://localhost:3000/api/auth/logout").then(
      function(response){
        console.log(response)
      }
    ).catch( function (response){
      console.log(response)
    })
  }


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




  const [selectedLocation, setselectedLocation] = useState([]);
  //selected companies
  const [selectedCompanies, setselectedCompanies] = useState([]);
  // const [companyLocationMap,setcompanyLocationMap]=useState([])

  function handleSort(sortkey,sortstate,sortStatefunction){
      let sortedData=[...filterCompanyData].sort((a,b)=>{
        console.log(a[sortkey])
        let valueA=a[sortkey];
        let valueB=b[sortkey];
        if(sortstate){
          return valueA.localeCompare(valueB);
        }
        else{
          return valueB.localeCompare(valueA);
        }
      }
      );
      setfilterCompanyData(sortedData)
      sortStatefunction(!sortstate)
    

  }


  function handleSelect(e) {
    const { checked, value } = e.target;
    let updatedSelected;
    if (checked) {
      updatedSelected = [...selectedCompanies, value];
      // setselectedCompanies(updatedSelected)
      // console.log()
      // setfilterCompanyData(user_data.filter((data)=>{
      //   return selectedCompanies.includes(data.CompanyName)
      // }))
    } else {
      // setfilterCompanyData(()=>[...user_data])
      updatedSelected = selectedCompanies.filter(
        (company) => company !== value
      );
      // setselectedCompanies(updatedSelected)
    }
    setselectedCompanies(updatedSelected);
    applyfilter(updatedSelected,selectedLocation);
    // const f_data=user_data.filter((data)=>{
    //     updatedSelected.includes(data.CompanyName)
    //   })
    //   setfilterCompanyData(f_data)
  }
  function applyfilter(companies,locations) {
    const f_data = user_data.filter((data) => {
     const company =companies.length ===0 ||companies.includes(data.CompanyName);
     const location=locations.length ===0 || locations.includes(data.Location);
     return company && location;
    });
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
    applyfilter(selectedCompanies,updatedSelected);
    setselectedLocation(updatedSelected);
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

  // const Search_result = user_data.filter((user) => {
  //   return (
  //     user.CompanyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     user.Location.toLowerCase().includes(searchTerm.toLowerCase())
  //   );
  // });
  // console.log("Search_result", Search_result);

  // });

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
    setSearchterm(e.target.value);
  }
  // const sortedUsers=[...user_data].sort(()=>{})
  // console.log(user_data)
  let [form_data, setFormData] = useState({
    CompanyName: "",
    Location: "",
    IsGlobal: false,
    id:""
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
  }
  catch (error){
    console.error("error updating the data",error);
    
  }
  


}


  function add_user(e) {
    e.preventDefault();
    if (form_data.CompanyName && form_data.Location) {
      Add_CompanyAPI(form_data)
      setFormData({ CompanyName: "", Location: "", IsGlobal: false });
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
  // let loc;

  //    loc=[user_data.map(data=>{
  //     if(filter_ele.includes(data.CompanyName)){
  //       return data.Location
  //     }

  //   })]
  //   console.log("loc",loc)
  // }
  // //
  // setfilter_locations({ele:[loc]})
  // console.log("loccc",filter_locations)

  // const companyLocationMap=user_data.reduce((acc,user)=>{
  //   const [CompanyName,Location]=user;
  //   if(!acc[CompanyName]){
  //     acc[CompanyName]=new Set();
  //   }
  //   acc[CompanyName].add(Location);
  //   return acc;
  // },{})

  // console.log("cl",companyLocationMap)

  // console.log("filter-ele", filter_ele);
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
      <>
        {/* <div classNameName='addbutton' onClick={add_user()}>
Add User
    </div> */}
      </>

      <br />
    
      <div className="input-group flex-nowrap  ms-4">
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
          <button
            type="button"
            className="btn btn-danger ms-4"
            aria-expanded="false"
            onClick={handleLogout}
          >
            Logout
          </button>


          <ul className="dropdown-menu">
            <p className="text-center">Companies</p>
            {uniqueCompanies.map((ele, index) => (
              <>
                <li key={index} className="dropdown-item">
                  <label htmlFor="form-select">{ele}</label>
                  <input
                    type="checkbox"
                    value={ele}
                    name="filter_data"
                    checked={selectedCompanies.includes(ele)}
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
                              // disabled={!selectedCompanies.includes(ele)}
                              value={location}
                              checked={selectedLocation.includes(location)}
                              className="form-check-input"
                              onChange={handleLocFilter}
                            />
                          </div>
                        );
                      })}
                  </div>
                </li>

                {/* <ul>
              {filter_locations.map((location)=>{
                    let locations=location.ele;
                    locations.map((l)=>{
                      <li>
                        <input 
                        type="checkbox" 
                        name="" 
                        id=""
                        checked=""
                        value={l} 
                        />
                      </li>
                    }
                    )
                  })}
              
                {
                  
                }</ul> */}
              </>
              //   <ul class="dropdown-menu">
              //   {uniqueCompanies.map((ele, index) => (
              //     <li key={index} className="dropdown-item">
              //       <label htmlFor="form-select">{ele}</label>
              //       <input
              //         type="checkbox"
              //         value={ele}
              //         name="filter_data"
              //         checked={selectedCompanies.includes(ele)}
              //         onChange={handleSelect}
              //         className="form-group"
              //       />
              //     </li>
              //   ))}
              // </ul>
            ))}
          </ul>
        </div>
        {/* <button type='button' className='btn btn-secondary ms-4'>Filter</button> */}

        

        {/* <input
          type="text"
          className="form-control ms-4"
          placeholder="Search by Company Name or Location"
          value={searchTerm}
          onChange={handleSearch}
          aria-label="CompanyName"
          aria-describedby="addon-wrapping"
        /> */}
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
              <form onSubmit={(e) => add_user(e)}>
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
                        className="form-check-input"
                      />
                      Isglobal
                    </label>

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
                  Save changes
                </button>
              </form>
            </div>
            
          </div>
          
        </div>
        
      </div>
      
<hr />
      <table className="table">
        <thead>
          <tr>
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
            <p>No data Found</p>
          )}
        </tbody>
      </table>

      {/* <form onSubmit={(e)=>add_user(e)}>
          <input type="text" name="name" id="" placeholder='Enter Company Name' value={form_data.CompanyName} onChange={handleChange}/>
          <input type="text" name="location" id="" placeholder='Enter location' value={form_data.email} onChange={handleChange}/>
          <input type="checkbox" name="isglobal" id="isGlobal" checked={form_data.IsGlobal}/>
          <label for="vehicle1">Isglobal</label>
          <button type="submit">Add User</button>
        </form> */}
    </>
  );
}

export default Home;
