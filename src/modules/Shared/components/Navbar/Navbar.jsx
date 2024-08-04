
function Navbar({loginData}) {
  return <>
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <form className="d-flex w-75" role="search">
            <input className="form-control me-2 w-100" type="search" placeholder="Search" aria-label="Search" />
          </form>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 w-25">
            <li className="nav-item text-center">
              Hello {loginData?.userName}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </>
}

export default Navbar