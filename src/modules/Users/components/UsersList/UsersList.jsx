import Header from "../../../Shared/components/Header/Header.jsx"
import headerBG from '../../../../assets/imgaes/Group2.png'
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import axios from "axios"
import NoData from "../../../Shared/components/NoData/NoData.jsx"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DeleteConfirmation from "../../../Shared/components/DeleteConfirmation/DeleteConfirmation.jsx"
import { USERS_URLS } from "../../../../constants/END_POINTS.js"

function UsersList() {
  const [UsersList, setUsersList] = useState([])
  const [show, setShow] = useState(false);
  const [userId, setuserId] = useState(0)

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setShow(true);
    setuserId(id)
  }

  const deleteUser = async () => {
    try {
      await axios.delete(USERS_URLS.deleteUser(userId), { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
      toast.success('deleted succefuly')
      handleClose()
      getUsersList()
    } catch (error) {
      if (error.response.data.message) {
        toast.error(error.response.data.message)
      } else {
        toast.error('some thing went wrong please try again')
      }
    }
  }

  const getUsersList = async () => {
    try {
      const res = await axios.get(USERS_URLS.getList, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
      setUsersList(res.data.data)
      console.log(res);
    } catch (error) {
      console.log(error);
      toast.error('some thing went wrong please try again later')
    }
  }

  useEffect(() => {
    getUsersList()
  }, [])

  return <>
    <Header imgUrl={headerBG} title={'Users List'} description={'You can now add your items that any user can order it from the Application and you can edit'} />
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
      </Modal.Header>
      <Modal.Body>
        <DeleteConfirmation deleteItem={'User'} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={deleteUser}>
          Delete this item
        </Button>
      </Modal.Footer>
    </Modal>
    <div className="p-4">
      <div className="title d-flex justify-content-between">
        <div className="info">
          <h4>Users Table Details</h4>
          <span>You can check all details</span>
        </div>
        <div className="add">
          <button className="btn btn-success py-2 px-3">Add New Category</button>
        </div>
      </div>
      <div className="tableContainer">
        {UsersList.length > 0 ?
          <table className="table mt-4 text-center">
            <thead>
              <tr className="table-active">
                <th scope="col">userName</th>
                <th scope="col">Email</th>
                <th scope="col">Country</th>
                <th scope="col">phone Number</th>
                <th scope="col">actions</th>
              </tr>
            </thead>
            <tbody>
              {UsersList.map((user) => {
                return <tr key={user.id}>
                  <td>{user?.userName}</td>
                  <td>{user?.email}</td>
                  <td>{user?.country}</td>
                  <td>{user?.phoneNumber}</td>
                  <td>
                    <i onClick={() => handleShow(user.id)} className="fa-solid fa-trash fa-lg me-3"></i>
                    <i className="fa-solid fa-edit fa-lg"></i>
                  </td>
                </tr>
              }
              )}
            </tbody>
          </table>
          : <NoData />}
      </div>
    </div>
  </>

}

export default UsersList