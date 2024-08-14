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
  const [arrayOfPages, setarrayOfPages] = useState([])
  const [show, setShow] = useState(false);
  const [userId, setuserId] = useState(0)
  const [userNameValue, setUserNameValue] = useState('')
  const [emailValue, setEmailValue] = useState('')
  const [countryValue, setCountryValue] = useState('')
  const [groupsValue, setGroupsValue] = useState(null)

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

  const getUsersList = async (pageSize, pageNumber, userName, email, country, groups) => {
    try {
      const res = await axios.get(USERS_URLS.getList,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          params: { pageSize, pageNumber, userName, email, country, groups }
        })
      setarrayOfPages(Array(res.data.totalNumberOfPages).fill().map((_, i) => i + 1))
      setUsersList(res.data.data)
      console.log(res);
    } catch (error) {
      console.log(error);
      toast.error('some thing went wrong please try again later')
    }
  }

  const getUserNameValue = (input) => {
    setUserNameValue(input.target.value);
    getUsersList(5, 1, input.target.value, emailValue, countryValue, groupsValue);
  }
  const getEmailValue = (input) => {
    setEmailValue(input.target.value);
    getUsersList(5, 1, userNameValue, input.target.value, countryValue, groupsValue);
  }
  const getCountryValue = (input) => {
    setCountryValue(input.target.value);
    getUsersList(5, 1, userNameValue, emailValue, input.target.value, groupsValue);
  }
  const getGroupsValue = (input) => {
    setGroupsValue(input.target.value);
    getUsersList(5, 1, userNameValue, emailValue, countryValue, input.target.value);
  }

  useEffect(() => {
    getUsersList(10, 1)
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
      </div>
      <div className="tableContainer">
        <div className="row mt-3">
          <div className="col-md-3">
            <div className="searchBar">
              <input onChange={getUserNameValue} type="text" className="form-control" placeholder="Search by name" />
            </div>
          </div>
          <div className="col-md-3">
            <div className="categoriesBar">
              <input onChange={getEmailValue} type="text" className="form-control" placeholder="Search by emali" />
            </div>
          </div>
          <div className="col-md-3">
            <div className="countryBar">
              <input onChange={getCountryValue} type="text" className="form-control" placeholder="Search by country" />
            </div>
          </div>
          <div className="col-md-3">
            <div className="groupsBar">
              <select onClick={getGroupsValue} className="form-control mb-2">
                <option disabled>select groups</option>
                <option value={1}>admin</option>
                <option value={2}>system user</option>
              </select>
            </div>
          </div>
        </div>
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
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item">
            <a className="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          {arrayOfPages.map((pageNumber) => {
            return <li key={pageNumber} onClick={() => getUsersList(10, pageNumber)} className="page-item"><a className="page-link" href="#">{pageNumber}</a></li>
          })}
          <li className="page-item">
            <a className="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </>

}

export default UsersList