import Header from "../../../Shared/components/Header/Header.jsx";
import headerBG from "../../../../assets/imgaes/Group2.png";
import { useCallback, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import DeleteConfirmation from "../../../Shared/components/DeleteConfirmation/DeleteConfirmation.jsx";
import { USERS_URLS } from "../../../../constants/END_POINTS.js";
import { AuthContext } from "../../../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { paginate } from "../../../../utils.js";
import Loading from "../../../Shared/components/Loading/Loading.jsx";

function UsersList() {
  const { loginData } = useContext(AuthContext);
  const navigate = useNavigate();
  const [UsersList, setUsersList] = useState([]);
  const [show, setShow] = useState(false);
  const [userId, setuserId] = useState(0);
  const [filters, setFilters] = useState({
    userName: "",
    email: "",
    country: "",
    groups: "",
  });
  const [currentpageNumber, setCurrentPageNumber] = useState(1);
  const [totalNumberOfPages, setTotalNumberOfPages] = useState(0);

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setShow(true);
    setuserId(id);
  };

  const getUsersList = useCallback(
    async (pageSize = 5, pageNumber = 1, filters = {}) => {
      try {
        const res = await axios.get(USERS_URLS.getList, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          params: { pageSize, pageNumber, ...filters },
        });
        setUsersList(res.data.data);
        setCurrentPageNumber(res.data.pageNumber);
        setTotalNumberOfPages(res.data.totalNumberOfPages);
      } catch (error) {
        toast.error(error?.response?.data?.message || "An error occurred");
      }
    },
    []
  );

  const deleteUser = async () => {
    try {
      await axios.delete(USERS_URLS.deleteUser(userId), {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      toast.success("Deleted successfully");
      getUsersList(5, 1, filters);
      handleClose();
    } catch (error) {
      toast.error(error?.response?.data?.message || "An error occurred");
    }
  };
  
  useEffect(() => {
    if (loginData) {
      if (loginData.userGroup !== "SuperAdmin") {
        navigate("/not-found");
      } else {
        getUsersList(5, 1, filters);
      }
    }
  }, [loginData, filters, navigate, getUsersList]);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters);
    getUsersList(5, 1, updatedFilters);
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalNumberOfPages) {
      setCurrentPageNumber(pageNumber);
      getUsersList(5, pageNumber, filters);
    }
  };

  return (
    <>
      <Header
        imgUrl={headerBG}
        title={"Users List"}
        description={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
      />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <DeleteConfirmation deleteItem={"User"} />
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
                <input
                  name="userName"
                  value={filters.userName}
                  onChange={handleFilterChange}
                  type="text"
                  placeholder="Search by name"
                  className="form-control"
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="categoriesBar">
                <input
                  name="email"
                  value={filters.email}
                  onChange={handleFilterChange}
                  type="text"
                  placeholder="Search by email"
                  className="form-control"
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="countryBar">
                <input
                  name="country"
                  value={filters.country}
                  onChange={handleFilterChange}
                  type="text"
                  placeholder="Search by country"
                  className="form-control"
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="groupsBar">
                <select
                  name="groups"
                  value={filters.groups}
                  onChange={handleFilterChange}
                  className="form-control"
                >
                  <option value="" disabled>
                    Select group
                  </option>
                  <option value={2}>System Users</option>
                  <option value={1}>Admins</option>
                </select>
              </div>
            </div>
          </div>
          {UsersList.length > 0 ? (
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
                  return (
                    <tr key={user.id}>
                      <td>{user?.userName}</td>
                      <td>{user?.email}</td>
                      <td>{user?.country}</td>
                      <td>{user?.phoneNumber}</td>
                      <td>
                        <i
                          role="button"
                          tabIndex={0}
                          aria-label={`Delete user ${user.userName}`}
                          onClick={() => handleShow(user.id)}
                          className="fa-solid fa-trash text-danger cursor-pointer fa-lg me-3"
                        ></i>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <Loading />
          )}
        </div>
        <nav aria-label="Page navigation">
          <ul className="pagination mt-4">
            <li
              className={`page-item ${
                currentpageNumber === 1 ? "disabled" : ""
              }`}
              onClick={() => handlePageChange(currentpageNumber - 1)}
            >
              <a className="page-link" role="button">
                Previous
              </a>
            </li>

            {paginate({
              currentPage: currentpageNumber,
              totalNumberOfPages: totalNumberOfPages,
            }).map((item) => (
              <li
                key={item}
                onClick={() => handlePageChange(item)}
                className={`page-item ${
                  currentpageNumber === item ? "active" : ""
                }`}
              >
                <a className="page-link" role="button">
                  {item}
                </a>
              </li>
            ))}

            <li
              className={`page-item ${
                currentpageNumber === totalNumberOfPages ? "disabled" : ""
              }`}
              onClick={() => handlePageChange(currentpageNumber + 1)}
            >
              <a className="page-link" role="button">
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default UsersList;