import { createContext, useContext, useState } from "react";

const privilegeContext=createContext()

function PrivilegeProvider({children}){
    
const [privileges,setPrivileges]=useState({})
const [currUser,setcurrUser]=useState('')
return (<privilegeContext.Provider value={{privileges,setPrivileges,currUser,setcurrUser}}>
{children}
</privilegeContext.Provider>
)
}
function usePrivileges(){
    return useContext(privilegeContext)
}



// eslint-disable-next-line react-refresh/only-export-components
export {PrivilegeProvider,usePrivileges}