import { Outlet } from "react-router-dom"
import Navbar from "../Navbar/Navbar.jsx"
import SideBar from "../SideBar/SideBar.jsx"

function MasterLayout() {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3 vh-100 bg-info">
            <SideBar />
          </div>
          <div className="col-md-9">
            <Navbar />
            <Outlet />
          </div>
        </div>
      </div>
    </>
  )
}

export default MasterLayout