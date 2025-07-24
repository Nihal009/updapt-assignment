import { Outlet } from 'react-router-dom';
import NavBar from './navBar.jsx';
import { usePrivileges } from './PrivilegeProvider.jsx';

function Layout(){
const {privileges}=usePrivileges()

return(
<>

<NavBar/>
{privileges.platform?<div>
 <Outlet    />   
</div>:''}

</>

    )
}

export default Layout;