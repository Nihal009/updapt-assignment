import { Link, useNavigate } from "react-router-dom";
import Home from "./home";
import { HiOutlineLogout } from "react-icons/hi";
import "./App.css";
import axios from "axios";
import { useState } from "react";
import { usePrivileges } from "./PrivilegeProvider";
import { PiUserCircleThin } from "react-icons/pi";
import { color } from "highcharts";

function NavBar(){
  axios.defaults.withCredentials = true
  const {currUser,privileges}=usePrivileges()
const navigate=useNavigate()
    function handleLogout(){
        axios.delete("http://localhost:3000/api/auth/logout").then(
          function(response){
            navigate('/login')
            console.log(response)
          }
        ).catch( function (response){
          console.log(response)
        })
      }
return(
    <nav className="navbar navbar-expand-lg ">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-4">

         
        

        <ul className="navbar-nav d-flex flex-row gap-4 mb-0">
        <li className="nav-item d-flex align-items-center gap-2">
    <PiUserCircleThin style={{ color: "white" }} className="fs-4"/>
    <h1 className="h5 mb-0">{currUser}</h1>
  </li>
            {privileges.dashboard && <li className="nav-item">
                <Link to={"/dashboard"} >DashBoard</Link>
            </li>}
            {privileges.platform&&<li className="nav-item">
              
              <Link to={"/tracker"}>
              Tracker
              </Link>
          </li>}
            
        </ul>
        </div>
        <button
            type="button"
            className="btn btn-danger d-flex align-items-center gap-2"
            aria-expanded="false"
            onClick={handleLogout}
          >
            Logout
            <HiOutlineLogout />
          </button>
        </div>
    </nav>
)

}


export default NavBar;