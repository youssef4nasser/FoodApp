
function Header({ title, description, imgUrl }) {
  return (
    <div className="container-fluid p-5 bg-success headerContainer text-white">
      <div className="row align-items-center">
        <div className="col-md-6">
          <div className="content">
            <h1>{title}</h1>
            <p>{description}</p>
          </div>
        </div>
        <div className="col-md-6 d-flex justify-content-end">
          <div className="img">
            <img src={imgUrl} alt="header BG" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header