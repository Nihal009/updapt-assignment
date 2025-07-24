import { Outlet } from 'react-router-dom';
import NavBar from './navBar.jsx';
import { usePrivileges } from './PrivilegeProvider.jsx';

function Layout(){
const {currUser,privileges}=usePrivileges()

return(
<>

<NavBar/>

{privileges.platform&&<div>
 <Outlet    />
 <div>
 welcome Back {currUser}</div>
</div>}

</>

    )
}

export default Layout;