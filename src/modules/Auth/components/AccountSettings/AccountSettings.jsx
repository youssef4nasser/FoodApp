import { Button, Form, Modal } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../context/AuthContext.jsx";
import axios from "axios";
import { BASE_IMG, USERS_URLS } from "../../../../constants/END_POINTS.js";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ChangePassword from "../ChangePassword/ChangePassword.jsx";

function AccountSettings() {
  const { currentUser, getcurrentUser } = useContext(AuthContext);
  const [previewImage, setPreviewImage] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (currentUser) {
      reset({
        userName: currentUser.userName,
        email: currentUser.email,
        country: currentUser.country,
        phoneNumber: currentUser.phoneNumber,
      });
    }
  }, [currentUser, reset]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const appendToFormData = (data) => {
    const formData = new FormData();
    formData.append("userName", data.userName);
    formData.append("email", data.email);
    formData.append("country", data.country);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("profileImage", data.profileImage[0]);
    formData.append("confirmPassword", data.confirmPassword);
    return formData;
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data) => {
    const updateData = appendToFormData(data);
    try {
      const res = await axios.put(USERS_URLS.update, updateData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (res.status == 200) {
        toast.success("profile updated successfuly");
        getcurrentUser()
      }
      reset();
      handleClose();
    } catch (error) {
      if (error.response.data.additionalInfo?.errors?.userName) {
        toast.error(error.response.data.additionalInfo.errors.userName[0]);
      } else if (error.response.data.additionalInfo?.errors?.password) {
        toast.error(error.response.data.additionalInfo.errors.password[0]);
      } else if (error.response.data.additionalInfo?.errors?.confirmPassword) {
        toast.error(
          error.response.data.additionalInfo.errors.confirmPassword[0]
        );
      } else {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <div id="accountSettings">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <form>
            <Form.Group className="mb-3" controlId="confirmPassword">
              <Form.Label>
                Please enter your password to update profile
              </Form.Label>
              <Form.Control
                {...register("confirmPassword", {
                  required: "Password is required",
                })}
                type="password"
                placeholder="Enter password"
              />
            </Form.Group>
            {errors.confirmPassword && (
              <span className="text-danger">
                {errors.confirmPassword.message}
              </span>
            )}
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleSubmit(onSubmit)}>
            Update profile
          </Button>
        </Modal.Footer>
      </Modal>
      <Form>
        <div className="p-3 p-lg-4 shadow-sm border-2 mb-4 border">
          <h5 className="fw-bold mb-4">Update profile</h5>
          <div className="d-flex justify-content-between">
            <div className="w-50">
              <Form.Group className="mb-3" controlId="userName">
                <Form.Label>UserName</Form.Label>
                <Form.Control
                  defaultValue={currentUser?.userName}
                  {...register("userName")}
                  type="text"
                  placeholder="Enter UserName"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  defaultValue={currentUser?.email}
                  {...register("email")}
                  type="email"
                  placeholder="Enter Email"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="country">
                <Form.Label>Country</Form.Label>
                <Form.Control
                  defaultValue={currentUser?.country}
                  {...register("country")}
                  type="text"
                  placeholder="Enter Country"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="phone">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  defaultValue={currentUser?.phoneNumber}
                  {...register("phoneNumber")}
                  type="tel"
                  placeholder="Enter Phone Number"
                />
              </Form.Group>

              <Button
                className="bg-success my-3 border-0"
                type="button"
                onClick={handleShow}
              >
                Save Changes
              </Button>
            </div>
            <div className="w-25 text-center d-flex flex-column justify-content-center align-items-center p-3">
              <Form.Group controlId="formFile" className="position-relative">
                <img
                  src={previewImage || BASE_IMG + currentUser?.imagePath}
                  alt="image-profile"
                  loading="lazy"
                  className="rounded-circle w-75 img-fluid border border-3 border-primary shadow-sm mb-3"
                />

                <input
                  type="file"
                  {...register("profileImage")}
                  className="file-input position-absolute top-0 start-0 opacity-0 w-100 h-100 cursor-pointer"
                  aria-label="Upload profile image"
                  onChange={handleFileChange}
                />

                <div
                  className="upload-button bg-primary text-white rounded-pill px-3 py-2 mt-2 cursor-pointer"
                  style={{ fontWeight: "500", fontSize: "0.9rem" }}
                >
                  <i className="fa-regular fa-circle-up"></i> Upload Image
                </div>
              </Form.Group>
            </div>
          </div>
        </div>
      </Form>
      {/* Change password */}
      <ChangePassword />
    </div>
  );
}

export default AccountSettings;
