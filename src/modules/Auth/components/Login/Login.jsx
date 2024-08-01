import { Link, useNavigate } from 'react-router-dom'
import logo from '../../../../assets/imgaes/logo.png'
import { useForm } from 'react-hook-form'
import axios from 'axios';
import { toast } from 'react-toastify';

function Login() {

  const navigate = useNavigate()

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('https://upskilling-egypt.com:3006/api/v1/Users/Login', data);
      navigate('/dashboard')
      toast.success('Login successfully')
      console.log(response);
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  return (
    <div className="auth-container">
      <div className="container-fluid bg-overlay">
        <div className="row vh-100 justify-content-center align-items-center">
          <div className="col-md-5 bg-white px-5 py-3 rounded-2">
            <div className="">
              <div className="text-center">
                <img src={logo} loading='lazy' alt="Food-app-logo" className='w-50' />
              </div>
              <div className="text-start mb-3 mt-2">
                <h5>Log In</h5>
                <p className="text-muted">Welcome Back! Please enter your details</p>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    <i className="fa fa-envelope"></i>
                  </span>
                  <input {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                      message: 'Email shoud be vaild mail',
                    },
                  })} type="email" className="form-control" placeholder="Enter your E-mail" aria-label="E-mail" aria-describedby="basic-addon1" />
                </div>
                {errors.email && <span className='text-danger'>{errors.email.message}</span>}
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    <i className="fa fa-key"></i>
                  </span>
                  <input {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password should be at least 6 characters long',
                    },
                  })} type="password" className="form-control" placeholder="Password" aria-label="E-mail" aria-describedby="basic-addon1" />
                </div>
                {errors.password && <span className='text-danger'>{errors.password.message}</span>}
                <div className="links d-flex justify-content-between">
                  <Link to={'/register'} className='text-muted text-decoration-none'>Register Now?</Link>
                  <Link to={'/forgetPass'} className='text-success text-decoration-none'>Forgot Password?</Link>
                </div>
                <button className='btn btn-success d-block w-100 my-3'>Login</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login