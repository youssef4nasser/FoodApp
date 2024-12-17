import { useContext } from "react"
import { AuthContext } from "../../../../context/AuthContext.jsx"
import { BASE_IMG } from "../../../../constants/END_POINTS.js";

function Navbar() {
  const { currentUser } = useContext(AuthContext);
  
  return <>
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <form className="w-75 position-relative xs-from" role="search">
            <i className="fa-solid me-4 fa-magnifying-glass text-secondary position-absolute top-50 end-0 translate-middle"></i>
            <input className="form-control rounded-4" type="search" placeholder="Search Here" aria-label="Search" />
          </form>
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item me-2">
              <img className="img-fluid rounded-circle" width={40} src={BASE_IMG + currentUser?.imagePath} alt="User-Profile-Image" />
            </li>
            <li className="nav-item">
              {currentUser?.userName}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </>
}

export default Navbar