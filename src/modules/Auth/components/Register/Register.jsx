import { toast } from 'react-toastify';
import logo from '../../../../assets/imgaes/logo.png'
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AUTH_URLS } from '../../../../constants/END_POINTS.js';
import axios from 'axios';
import { useState } from 'react';

function Register() {
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isPassShow, setisPassShow] = useState(false)

  const appendToFormData = (data) => {
    const formData = new FormData()
    formData.append('userName', data.userName);
    formData.append('email', data.email);
    formData.append('country', data.country);
    formData.append('phoneNumber', data.phoneNumber);
    formData.append('password', data.password);
    formData.append('confirmPassword', data.confirmPassword);
    formData.append('profileImage', data.profileImage[0]);
    return formData;
  }

  const onSubmit = async (data) => {
    const registerData = appendToFormData(data)
    try {
      const response = await axios.post(AUTH_URLS.register, registerData);
      navigate('/verify-account')
      toast.success(response.data.message)
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  return (
    <div className="auth-container">
      <div className="container-fluid bg-overlay">
        <div className="row vh-100 justify-content-center align-items-center">
          <div className="col-md-5 w-50 bg-white px-5 py-3 rounded-2">
            <div className="">
              <div className="text-center">
                <img src={logo} loading='lazy' alt="Food-app-logo" className='w-50' />
              </div>
              <div className="text-start mb-3 mt-2">
                <h5>Register</h5>
                <p className="text-muted">Welcome Back! Please enter your details</p>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="input-group mb-3">
                      <span className="input-group-text" id="basic-addon1">
                        <i className="fa-regular fa-id-badge"></i>
                      </span>
                      <input
                        {...register('userName', {
                          required: 'userName is required',
                        })}
                        type="text" className="form-control" placeholder="UserName" aria-label="UserName" aria-describedby="basic-addon1" />
                    </div>
                    {errors.userName && <span className='text-danger'>{errors.userName.message}</span>}
                  </div>
                  <div className="col-md-6">
                    <div className="input-group mb-3">
                      <span className="input-group-text" id="basic-addon1">
                        <i className="fa fa-envelope"></i>
                      </span>
                      <input
                        {...register('email', {
                          required: 'Email is required',
                          pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                            message: 'Email shoud be vaild mail',
                          },
                        })}
                        type="email" className="form-control" placeholder="Enter your E-mail" aria-label="E-mail" aria-describedby="basic-addon1" />
                    </div>
                    {errors.email && <span className='text-danger'>{errors.email.message}</span>}
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="input-group mb-3">
                      <span className="input-group-text" id="basic-addon1">
                        <i className="fa-solid fa-earth-americas"></i>
                      </span>
                      <input
                        {...register('country', {
                          required: 'country is required',
                        })}
                        type="text" className="form-control" placeholder="Country" aria-label="Country" aria-describedby="basic-addon1" />
                    </div>
                    {errors.country && <span className='text-danger'>{errors.country.message}</span>}
                  </div>
                  <div className="col-md-6">
                    <div className="input-group mb-3">
                      <span className="input-group-text" id="basic-addon1">
                        <i className="fa fa-phone"></i>
                      </span>
                      <input
                        {...register('phoneNumber', {
                          required: 'phoneNumber is required',
                        })}
                        type="tel" className="form-control" placeholder="PhoneNumber" aria-label="PhoneNumber" aria-describedby="basic-addon1" />
                    </div>
                    {errors.phoneNumber && <span className='text-danger'>{errors.phoneNumber.message}</span>}
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="input-group mb-3">
                      <span className="input-group-text" id="basic-addon1">
                        <i className="fa fa-key"></i>
                      </span>
                      <input
                        {...register('password', {
                          required: 'password is required',
                        })}
                        type={isPassShow ? 'text' : 'password'} className="form-control" placeholder="Password" aria-label="Password" aria-describedby="basic-addon1" />
                      <button type='button' className="input-group-text" id="basic-addon1" onMouseUp={(e) => e.preventDefault()} onMouseDown={(e) => e.preventDefault()} onClick={() => setisPassShow((prev) => !prev)}>
                        <i className={`fa ${isPassShow ? 'fa-eye-slash' : 'fa-eye'}`} aria-hidden='true'></i>
                      </button>
                    </div>
                    {errors.password && <span className='text-danger'>{errors.password.message}</span>}
                  </div>
                  <div className="col-md-6">
                    <div className="input-group mb-3">
                      <span className="input-group-text" id="basic-addon1">
                        <i className="fa fa-key"></i>
                      </span>
                      <input
                        {...register('confirmPassword', {
                          required: 'confirmPassword is required',
                        })}
                        type={isPassShow ? 'text' : 'password'} className="form-control" placeholder="confirm-password" aria-label="PhoneNumber" aria-describedby="basic-addon1" />
                      <button type='button' className="input-group-text" id="basic-addon1" onMouseUp={(e) => e.preventDefault()} onMouseDown={(e) => e.preventDefault()} onClick={() => setisPassShow((prev) => !prev)}>
                        <i className={`fa ${isPassShow ? 'fa-eye-slash' : 'fa-eye'}`} aria-hidden='true'></i>
                      </button>
                    </div>
                    {errors.confirmPassword && <span className='text-danger'>{errors.confirmPassword.message}</span>}
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="input-group mb-3">
                      <span className="input-group-text" id="basic-addon1">
                        <i className="fa-solid fa-upload"></i>
                      </span>
                      <input
                        {...register('profileImage', {
                          required: 'profileImage is required',
                        })}
                        type="file" className="form-control" placeholder="image" aria-label="image" aria-describedby="basic-addon1" />
                    </div>
                    {errors.profileImage && <span className='text-danger'>{errors.profileImage.message}</span>}
                  </div>
                </div>
                <div className="text-center">
                  <button className='btn btn-success w-75 my-3'>Register</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register