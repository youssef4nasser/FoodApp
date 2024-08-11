import { useNavigate } from 'react-router-dom'
import logo from '../../../../assets/imgaes/logo.png'
import { useForm } from 'react-hook-form'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { AUTH_URLS } from '../../../../constants/END_POINTS.js';

function ResetPass() {
  const navigate = useNavigate()
  const [isPassShow, setisPassShow] = useState(false)

  const { register, handleSubmit, formState: { errors, isSubmitting }, watch } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await axios.post(AUTH_URLS.reset, data);
      console.log(response);
      toast.success('Password Reset Successfully')
      navigate('/login')
    } catch (error) {
      if (error.response.data.additionalInfo?.errors?.password) {
        toast.error('The password must include lowercase and uppercase and special character and digit')
      } else {
        toast.error(error.response.data.message)
      }
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
                <h5>Reset  Password</h5>
                <p className="text-muted">Please Enter Your Otp  or Check Your Inbox</p>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* Email */}
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
                {/* OTP */}
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    <i className="fa fa-key"></i>
                  </span>
                  <input {...register('seed', {
                    required: 'OTP is required',
                  })} type="text" className="form-control" placeholder="OTP" aria-label="OTP" aria-describedby="basic-addon1" />
                </div>
                {errors.seed && <span className='text-danger'>{errors.seed.message}</span>}
                {/* New password */}
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    <i className="fa fa-key"></i>
                  </span>
                  <input {...register('password', {
                    required: 'New password is required',
                    minLength: {
                      value: 6,
                      message: 'New password should be at least 6 characters long',
                    },
                  })} type={isPassShow ? 'text' : 'password'} className="form-control" placeholder="New password" aria-label="New password" aria-describedby="basic-addon1" />
                  <button type='button' className="input-group-text" id="basic-addon1" onMouseUp={(e) => e.preventDefault()} onMouseDown={(e) => e.preventDefault()} onClick={() => setisPassShow((prev) => !prev)}>
                    <i className={`fa ${isPassShow ? 'fa-eye-slash' : 'fa-eye'}`} aria-hidden='true'></i>
                  </button>
                </div>
                {errors.password && <span className='text-danger'>{errors.password.message}</span>}
                {/* Confirm new password */}
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    <i className="fa fa-key"></i>
                  </span>
                  <input {...register('confirmPassword', {
                    required: 'Confirm password is required',
                    validate: (value) => {
                      if (watch('password') !== value) return 'Passwords do not match'
                    },
                    minLength: {
                      value: 6,
                      message: 'Confirm password should be at least 6 characters long',
                    },
                  })} type={isPassShow ? 'text' : 'password'} className="form-control" placeholder="Confirm new password" aria-label="New password" aria-describedby="basic-addon1" />
                  <button type='button' className="input-group-text" id="basic-addon1" onMouseUp={(e) => e.preventDefault()} onMouseDown={(e) => e.preventDefault()} onClick={() => setisPassShow((prev) => !prev)}>
                    <i className={`fa ${isPassShow ? 'fa-eye-slash' : 'fa-eye'}`} aria-hidden='true'></i>
                  </button>
                </div>
                {errors.confirmPassword && <span className='text-danger'>{errors.confirmPassword.message}</span>}
                <button className='btn btn-success d-block w-100 my-3' disabled={isSubmitting}>Reset Password</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>)
}

export default ResetPass