import { Outlet } from 'react-router-dom';
import NavBar from './navBar.jsx';
import { usePrivileges } from './PrivilegeProvider.jsx';

function Layout(){
const {currUser,privileges}=usePrivileges()



return(
<>

<NavBar/>
{location.pathname === '/' && (
        <div className="container mt-4">
          <h2 className="text-center">Welcome Back, {currUser}!</h2>
        </div>
      )}

<div>
 <Outlet    />
 
</div>

</>

    )
}

export default Layout;