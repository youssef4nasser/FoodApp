import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link, useNavigate } from 'react-router-dom';
import toggler from '../../../../assets/imgaes/toggler-logo.png'
import { useContext, useState } from 'react';
import { AuthContext } from '../../../../context/AuthContext.jsx';

function SideBar() {
  const { loginData } = useContext(AuthContext)
  const [iscollapsed, setIsCollapsed] = useState(false)
  const navigate = useNavigate()

  const togglCollapsed = () => setIsCollapsed(!iscollapsed)

  return (
    <div className="SidebarContainer">
      <Sidebar collapsed={iscollapsed}>
        <Menu>
          <MenuItem className='firstItem ps-2 py-4' onClick={togglCollapsed} icon={<img src={toggler} loading='lazy' alt='toggler-logo' style={{
              width: iscollapsed? '5rem': '10rem',
              transition: 'all 300ms'
            }} />}></MenuItem>
          <MenuItem icon={<i className="fa-solid fa-home"></i>} component={<Link to="/dashboard" />}> Home</MenuItem>
          {loginData?.userGroup == "SuperAdmin" ? <MenuItem icon={<i className="fa-solid fa-user-group"></i>} component={<Link to="/dashboard/usersList" />}> Users</MenuItem> : ""}
          <MenuItem icon={<i className="fa-solid fa-rectangle-list"></i>} component={<Link to="/dashboard/recipesList" />}> Recipes</MenuItem>
          {loginData?.userGroup != "SuperAdmin" ? <MenuItem icon={<i className="fa-solid fa-heart"></i>} component={<Link to="/dashboard/favorite" />}> Favorites</MenuItem> : ""}
          {loginData?.userGroup == "SuperAdmin" ? <MenuItem icon={<i className="fa-solid fa-calendar-days"></i>} component={<Link to="/dashboard/ctegoriesList" />}> Categories</MenuItem> : ""}
          <MenuItem icon={<i className="fa-solid fa-unlock-keyhole"></i>} component={<Link to="/dashboard/profile-settings" />}> Profile Settings</MenuItem>
          <MenuItem onClick={() => { localStorage.removeItem('token'); navigate('/login') }} icon={<i className="fa-solid fa-arrow-right-from-bracket"></i>}> Logout</MenuItem>
        </Menu>
      </Sidebar>
    </div>
  )
}

export default SideBar