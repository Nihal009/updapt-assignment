import { useEffect, useState } from "react";
import { Outlet,Navigate } from "react-router-dom";
import axios from "axios";
import {BeatLoader}from "react-spinners"
import { usePrivileges } from "./PrivilegeProvider";

// import { useCookies } from "react-cookie";
axios.defaults.withCredentials = true

const ProtectedRoutes=()=>{
    const [authState,setauthState]=useState(null)
    const {privileges,setPrivileges}=usePrivileges()
    useEffect(()=>{
        console.log("entered auth check")
        async function checkAuth() {
            await axios.get('http://localhost:3000/api/auth/check-auth').then(function (response){
                console.log(response)
                if(response.status==200){
                    const astate=response.data.isAuthenticated;
                    const dashboard=response.data.dashboard
                    const platform=response.data.platform
                    setPrivileges({dashboard:dashboard,platform:platform})
                    console.log("admin",dashboard)
                    console.log("auth:",astate)
                    setauthState(astate)
                }
            }).catch(function (error){
                console.log("auth check failed",error)
                setauthState(false)

            })
        } 
        setTimeout(()=>{checkAuth()},1000)
    },[])
    if(authState===null){
        return <><BeatLoader cssOverride={{
            "display": "flex",
            "justifyContent": "center",
            "alignItems": "center",
            "height": "100vh"
          }}/></>
    }
    // const [cookies]=useCookies("connect.sid")
    // const sessionId=cookies["connect.sid"]
    // console.log(sessionId)
    
    return authState ? <Outlet/> :<Navigate to='/login'/>
}

export default ProtectedRoutes;