import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import axios from "axios";
import { AUTH_URLS } from "../../../../constants/END_POINTS.js";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

function ChangePassword() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const {
      register,
      getValues,
      reset,
      watch,
      trigger,
      formState: { errors },
    } = useForm();

    const onSubmit = async () => { 
        try {
          const formData = getValues();
          const res = await axios.put(AUTH_URLS.ChangePassword, formData.root, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          });
          if (res.status === 200) {
            toast.success(res.data.message);
            reset();
            handleClose();
          }
        } catch (error) {
          const errorMessage = error?.response?.data?.message || "An error occurred";
          toast.error(errorMessage);
          reset();
          handleClose();
        }
    };

    return (
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>    
            <div className="modalBody text-center">
                <h5 className='mt-3'>Are you sure you want to change your password?</h5>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={onSubmit}>
              Change password
            </Button>
          </Modal.Footer>
        </Modal>
        
        <form>
          <div className="p-3 p-lg-4 shadow-sm border-2 mb-4 border">
            <h5 className="fw-bold mb-4">Change Password</h5>
            
            <Form.Group className="mb-3" controlId="OldPassword">
              <Form.Label>Old Password <span className="text-danger">*</span></Form.Label>
              <Form.Control {...register("root.oldPassword", {
                    required: "Old password is required",
                })} type="password" placeholder="Enter old Password" />
              {errors.root?.oldPassword && <span className="text-danger">{errors.root.oldPassword.message}</span>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="NewPassword">
              <Form.Label>New Password <span className="text-danger">*</span></Form.Label>
              <Form.Control {...register("root.newPassword", {
                    required: "New password is required",
                })} type="password" placeholder="Enter new Password" />
              {errors.root?.newPassword && <span className="text-danger">{errors.root.newPassword.message}</span>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="ConfirmNewPassword">
              <Form.Label>Confirm New Password <span className="text-danger">*</span></Form.Label>
              <Form.Control
                {...register("root.confirmNewPassword", {
                  required: "Confirm new password is required",
                  validate: (value) => 
                    watch("root.newPassword") === value || "Passwords don't match",
                })}
                type="password"
                placeholder="Enter confirm new Password"
              />
              {errors.root?.confirmNewPassword && <span className="text-danger">{errors.root.confirmNewPassword.message}</span>}
            </Form.Group>

            <Button 
              className="bg-success my-3 border-0"
              onClick={async () => {
                const isValid = await trigger();
                if (isValid) handleShow();
              }}>
              Save Changes
            </Button>
          </div>
        </form>
      </>
    );
}

export default ChangePassword;
