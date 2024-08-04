import { Link } from 'react-router-dom'
import bgVector from '../../../../assets/imgaes/img404.png'
import logo from '../../../../assets/imgaes/logo.png'

function Notfound() {
  return <>
    <div className="container-fluid notfoundContainer">
      <div className="log mt-3 mb-5">
        <img src={logo} className='w-25' alt="logo" />
      </div>
      <div className="d-flex pt-5 align-items-center">
        <div className="content align-self-end ps-5">
          <h3>Oops.</h3>
          <h4 className='text-success'>Page  not found</h4>
          <p>This Page doesn’t exist or was removed!<br/> We suggest you  back to home.</p>
          <Link to={'/dashboard'} className='btn text-white px-4 py-2 bg-success'>Back To Home</Link>
        </div>
      </div>
      <div className="position-absolute bottom-0 end-0">
        <img src={bgVector} className=' w-100' alt="404" />
      </div>
    </div>
  </>
}

export default Notfound