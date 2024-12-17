import { Link, useNavigate } from "react-router-dom";
import logo from "../../../../assets/imgaes/logo.png";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { AUTH_URLS } from "../../../../constants/END_POINTS.js";

function ForgetPass() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await axios.post(AUTH_URLS.resetRequest, data);
      navigate("/reset-password");
      toast.success("Please check your email");
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
      <div className="text-start mb-3 mt-4">
        <h5>Forgot Your Password?</h5>
        <p className="text-muted my-3">
          No worries! Please enter your email and we will send a password reset
          link{" "}
        </p>
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
        <div className="links d-flex">
          <Link
            to={"/login"}
            className="text-muted text-decoration-none hover-decoration"
          >
            Back to login?
          </Link>
        </div>
        <button
          className="btn btn-success d-block w-100 my-2"
          disabled={isSubmitting}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default ForgetPass;
