import { Outlet,Navigate } from "react-router-dom";


import { useCookies } from "react-cookie";

const ProtectedRoutes=()=>{

    const [cookies]=useCookies("connect.sid")
    const sessionId=cookies["connect.sid"]
    console.log(sessionId)
    return sessionId ? <Outlet/> :<Navigate to='/login'/>
}

export default ProtectedRoutes;