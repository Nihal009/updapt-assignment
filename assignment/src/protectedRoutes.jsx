import { useEffect, useState } from "react";
import { Outlet,Navigate } from "react-router-dom";
import axios from "axios";
import {BeatLoader}from "react-spinners"

// import { useCookies } from "react-cookie";

const ProtectedRoutes=()=>{
    const [authState,setauthState]=useState(null)
    axios.defaults.withCredentials = true
    useEffect(()=>{
        console.log("entered auth check")
        async function checkAuth() {
            await axios.get('http://localhost:3000/api/auth/check-auth').then(function (response){
                console.log(response)
                if(response.status==200){
                    const astate=response.data.isAuthenticated;
                    console.log("auth:",astate)
                    setauthState(astate)
                }
            }).catch(function (error){
                console.log("auth check failed",error)
                setauthState(false)

            })
        } 
        setTimeout(checkAuth(),1000)
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