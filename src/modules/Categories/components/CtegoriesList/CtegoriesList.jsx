import Header from "../../../Shared/components/Header/Header.jsx"
import headerBG from '../../../../assets/imgaes/Group2.png'
import axios from "axios"
import { useCallback, useContext, useEffect, useState } from "react"
import { toast } from "react-toastify"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DeleteConfirmation from "../../../Shared/components/DeleteConfirmation/DeleteConfirmation.jsx"
import { CATEGORIES_URLS } from "../../../../constants/END_POINTS.js"
import { useForm } from "react-hook-form"
import { AuthContext } from "../../../../context/AuthContext.jsx"
import { useNavigate } from "react-router-dom"
import { paginate } from "../../../../utils.js"
import Loading from "../../../Shared/components/Loading/Loading.jsx"

function CtegoriesList() {
  const { loginData } = useContext(AuthContext)
  const navigate = useNavigate()
  const [categoryList, setCategoryList] = useState([])
  const [show, setShow] = useState(false);
  const [showAdd, setshowAdd] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [categoryId, setCategoryId] = useState(0)
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const [currentpageNumber, setCurrentPageNumber] = useState(null)
  const [totalNumberOfPages, setTotalNumberOfPages] = useState(null)
  const [filters, setFilters] = useState({name: ""});

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setShow(true);
    setCategoryId(id)
  }

  const handleUpdateClose = () => setShowUpdate(false);
  const handleUpdateShow = (categoryItem) => {
    setShowUpdate(true);
    setCategoryId(categoryItem.id);
    setValue('name', categoryItem.name);
  }

  const handleAddClose = () => setshowAdd(false);
  const handleAddShow = () => setshowAdd(true);

  const addCategory = async (data) => {
    try {
      await axios.post(CATEGORIES_URLS.add, data, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
      toast.success('Added successfully')
      handleAddClose()
      getCategoryList()
      setValue("name", null);
    } catch (error) {
      toast.error('some thing went wrong please try again')
    }
  }

  const updateCategory = async (data) => {
    try {
      await axios.put(CATEGORIES_URLS.update(categoryId), data, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
      toast.success('updated successfully')
      handleUpdateClose()
      getCategoryList()
      setValue("name", null);
    } catch (error) {
      toast.error('some thing went wrong please try again')
    }
  }

  const deleteCategory = async () => {
    try {
      await axios.delete(CATEGORIES_URLS.delete(categoryId), { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
      toast.success('deleted successfully')
      handleClose()
      getCategoryList()
    } catch (error) {
      toast.error('some thing went wrong please try again')
    }
  }

  const getCategoryList = useCallback(
    async (pageSize, pageNumber, name) => {
      try {
        const res = await axios.get(CATEGORIES_URLS.getList, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }, params: { pageSize, pageNumber, name } })
        setCategoryList(res.data.data)
        setCurrentPageNumber(res.data.pageNumber)
        setTotalNumberOfPages(res.data.totalNumberOfPages)
      } catch (error) {
        toast.error('some thing went wrong please try again later')
      }
  },[])

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters({ [name]: value });
    getCategoryList(5, 1, value);
  };

  useEffect(() => {
    if (loginData) {
      if (loginData.userGroup !== "SuperAdmin") {
        navigate("/not-found");
      } else {
        getCategoryList(5, 1, filters.name);
      }
    }
  }, [loginData, filters, navigate, getCategoryList]);

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalNumberOfPages) {
      setCurrentPageNumber(pageNumber);
      getCategoryList(5, pageNumber, filters.name);
    }
  };

  return <>
    <Header imgUrl={headerBG} title={'Categories Items'} description={'You can now add your items that any user can order it from the Application and you can edit'} />
    {/* Modal for Delete Category */}
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
      </Modal.Header>
      <Modal.Body>
        <DeleteConfirmation deleteItem={'Category'} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={deleteCategory}>
          Delete this item
        </Button>
      </Modal.Footer>
    </Modal>
    {/* Modal for add Category */}
    <Modal show={showAdd} onHide={handleAddClose}>
      <form onSubmit={handleSubmit(addCategory)}>
        < Modal.Header closeButton >
          <h5>Add Category</h5>
        </Modal.Header>
        <Modal.Body>
          <input {...register('name', {
            required: 'Category name is required',
          })} type="text" className="form-control mb-2" placeholder="Category Name" aria-label="Category" aria-describedby="basic-addon1" />
          {errors.name && <span className='text-danger'>{errors.name.message}</span>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" type="submit">
            Save
          </Button>
        </Modal.Footer>
      </form >
    </Modal>
    {/* Modal for update Category */}
    <Modal show={showUpdate} onHide={handleUpdateClose}>
      <form onSubmit={handleSubmit(updateCategory)}>
        <Modal.Header closeButton >
          <h5>Update Category</h5>
        </Modal.Header>
        <Modal.Body>
          <input {...register('name', {
            required: 'Category name is required',
          })} type="text" className="form-control mb-2" placeholder="Category Name" aria-label="Category" aria-describedby="basic-addon1" />
          {errors.name && <span className='text-danger'>{errors.name.message}</span>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" type="submit">
            Save
          </Button>
        </Modal.Footer>
      </form >
    </Modal>
    <div className="p-4">
      <div className="title d-flex justify-content-between">
        <div className="info">
          <h4>Categories Table Details</h4>
          <span>You can check all details</span>
        </div>
        <div className="add">
          <button onClick={handleAddShow} className="btn btn-success py-2 px-3">Add New Category</button>
        </div>
      </div>
      <div className="tableContainer">
        <input type="text" placeholder="Search by Name..." className="form-control mb-3" name="name" onChange={handleFilterChange} value={filters.name} />
        {categoryList.length > 0 ?
          <table className="table mt-4 text-center">
            <thead>
              <tr className="table-active">
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">creation Date</th>
                <th scope="col">actions</th>
              </tr>
            </thead>
            <tbody>
              {categoryList.map((category) => {
                return <tr key={category.id}>
                  <td>{category.id}</td>
                  <td>{category.name}</td>
                  <td>{new Date(category.creationDate).toLocaleString()}</td>
                  <td>
                    <i onClick={() => handleShow(category.id)} className="fa-solid cursor-pointer fa-trash fa-lg me-3"></i>
                    <i onClick={() => handleUpdateShow(category)} className="fa-solid cursor-pointer fa-edit fa-lg"></i>
                  </td>
                </tr>
              }
              )}
            </tbody>
          </table>
          : <Loading />}
      </div>
      <nav aria-label="Page navigation">
          <ul className="pagination mt-4">
            <li
              className={`page-item ${ currentpageNumber === 1 ? "disabled" : "" }`}
              onClick={() => handlePageChange(currentpageNumber - 1)}
            >
              <a className="page-link" role="button">Previous</a>
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
              className={`page-item ${currentpageNumber === totalNumberOfPages ? "disabled" : ""}`}
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
}

export default CtegoriesList