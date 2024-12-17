import { Link, useNavigate } from "react-router-dom";
import logo from "../../../../assets/imgaes/logo.png";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useContext, useState } from "react";
import { AUTH_URLS } from "../../../../constants/END_POINTS.js";
import { AuthContext } from "../../../../context/AuthContext.jsx";

function Login() {
  const { saveLoginData } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isPassShow, setisPassShow] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(AUTH_URLS.login, data);
      navigate("/dashboard");
      toast.success("Login successfully");
      localStorage.setItem("token", response.data.token);
      saveLoginData();
      console.log(response);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div>
      <div className="text-center">
        <img src={logo} loading="lazy" alt="Food-app-logo" className="w-50" />
      </div>
      <div className="text-start mb-3 mt-2">
        <h5>Log In</h5>
        <p className="text-muted">Welcome Back! Please enter your details</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <div className="input-group">
            <span className="input-group-text" id="basic-addon1">
              <i className="fa fa-envelope"></i>
            </span>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                  message: "Email shoud be vaild mail",
                },
              })}
              type="email"
              className="form-control"
              placeholder="Enter your E-mail"
              aria-label="E-mail"
              aria-describedby="basic-addon1"
            />
          </div>
          {errors.email && (
            <span className="text-danger">{errors.email.message}</span>
          )}
        </div>
        <div className="mb-3">
          <div className="input-group">
            <span className="input-group-text" id="basic-addon1">
              <i className="fa fa-key"></i>
            </span>
            <input
              {...register("password", {
                required: "Password is required",
              })}
              type={isPassShow ? "text" : "password"}
              className="form-control"
              placeholder="Password"
              aria-label="E-mail"
              aria-describedby="basic-addon1"
            />
            <button
              type="button"
              className="input-group-text"
              id="basic-addon1"
              onMouseUp={(e) => e.preventDefault()}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => setisPassShow((prev) => !prev)}
            >
              <i
                className={`fa ${isPassShow ? "fa-eye-slash" : "fa-eye"}`}
                aria-hidden="true"
              ></i>
              <span className="sr-only">{isPassShow? "hide password": "show Password"}</span>
            </button>
          </div>
          {errors.password && (
            <span className="text-danger">{errors.password.message}</span>
          )}
        </div>
        <div className="links d-flex justify-content-between">
          <Link
            to={"/register"}
            className="text-muted text-decoration-none hover-decoration"
          >
            Register Now?
          </Link>
          <Link
            to={"/forget-password"}
            className="text-success text-decoration-none hover-decoration"
          >
            Forgot Password?
          </Link>
        </div>
        <button
          className="btn btn-success d-block w-100 my-3"
          disabled={isSubmitting}
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
