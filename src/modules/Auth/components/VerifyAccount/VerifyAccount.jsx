import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import logo from '../../../../assets/imgaes/logo.png'
import { AUTH_URLS } from "../../../../constants/END_POINTS.js";

function VerifyAccount() {
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await axios.put(AUTH_URLS.verify, data);
            navigate('/login')
            toast.success(response.data.message)
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
                                <h5>Verify Account</h5>
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
                                    <input {...register('code', {
                                        required: 'Code is required',
                                    })} type='text' className="form-control" placeholder="Code" aria-label="E-mail" aria-describedby="basic-addon1" />
                                </div>
                                {errors.verify && <span className='text-danger'>{errors.verify.message}</span>}
                                <button className='btn btn-success d-block w-100 my-3'>Verify</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VerifyAccount