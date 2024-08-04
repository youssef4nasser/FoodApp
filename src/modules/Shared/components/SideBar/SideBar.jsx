import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link, useNavigate } from 'react-router-dom';
import toggler from '../../../../assets/imgaes/toggler-logo.png'
import { useState } from 'react';

function SideBar() {
  const [iscollapsed, setIsCollapsed] = useState(false)
  const navigate = useNavigate()

  const togglCollapsed = () => setIsCollapsed(!iscollapsed)

  return (
    <div className="SidebarContainer">
      <Sidebar collapsed={iscollapsed}>
        {/* <button className='border-0 bg-transparent' onClick={togglCollapsed}>
          <img className='' src={toggler} alt='toggler-logo' style={{ width: iscollapsed ? '90px' : '150px' }} />
        </button> */}
        <Menu>
          <MenuItem className='firstItem ps-2 py-4' onClick={togglCollapsed} icon={<img src={toggler} alt='toggler-logo' width={160} />}></MenuItem>
          <MenuItem icon={<i className="fa-solid fa-home"></i>} component={<Link to="/dashboard" />}> Home</MenuItem>
          <MenuItem icon={<i className="fa-solid fa-user-group"></i>} component={<Link to="/dashboard/usersList" />}> Users</MenuItem>
          <MenuItem icon={<i className="fa-solid fa-rectangle-list"></i>} component={<Link to="/dashboard/recipesList" />}> Recipes</MenuItem>
          <MenuItem icon={<i className="fa-solid fa-calendar-days"></i>} component={<Link to="/dashboard/ctegoriesList" />}> Categories</MenuItem>
          <MenuItem icon={<i className="fa-solid fa-unlock-keyhole"></i>} component={<Link to="/dashboard/change-password" />}> Change Password</MenuItem>
          <MenuItem onClick={() => { localStorage.removeItem('token'); navigate('/login') }} icon={<i className="fa-solid fa-arrow-right-from-bracket"></i>}> Logout</MenuItem>
        </Menu>
      </Sidebar>
    </div>
  )
}

export default SideBar