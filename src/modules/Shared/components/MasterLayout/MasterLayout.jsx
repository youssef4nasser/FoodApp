import { Outlet } from "react-router-dom"
import Navbar from "../Navbar/Navbar.jsx"
import SideBar from "../SideBar/SideBar.jsx"

function MasterLayout() {
  return (
    <>
      <div className="d-flex vh-100 position-fixed w-100">
        <div>
          <SideBar />
        </div>
        <div className="w-100 overflow-y-scroll">
          <Navbar />
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default MasterLayout