import Header from "../../../Shared/components/Header/Header.jsx"
import headerBG from '../../../../assets/imgaes/Group2.png'
import axios from "axios"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DeleteConfirmation from "../../../Shared/components/DeleteConfirmation/DeleteConfirmation.jsx"
import NoData from "../../../Shared/components/NoData/NoData.jsx"
import { CATEGORIES_URLS } from "../../../../constants/END_POINTS.js"
import { useForm } from "react-hook-form"

function CtegoriesList() {

  const [categoryList, setCategoryList] = useState([])
  const [arrayOfPages, setarrayOfPages] = useState([])
  const [nameValue, setNameValue] = useState('')
  const [show, setShow] = useState(false);
  const [showAdd, setshowAdd] = useState(false);
  const [categoryId, setCategoryId] = useState(0)
  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setShow(true);
    setCategoryId(id)
  }

  const handleAddClose = () => setshowAdd(false);
  const handleAddShow = () => setshowAdd(true);

  // Fun add New Category
  const addCategory = async (data) => {
    try {
      await axios.post(CATEGORIES_URLS.add, data, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
      toast.success('Added succefuly')
      handleAddClose()
      getCategoryList()
    } catch (error) {
      console.log(error);
      toast.error('some thing went wrong please try again')
    }
  }

  const deleteCategory = async () => {
    try {
      await axios.delete(CATEGORIES_URLS.delete(categoryId), { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
      toast.success('deleted succefuly')
      handleClose()
      getCategoryList()
    } catch (error) {
      console.log(error);
      toast.error('some thing went wrong please try again')
    }
  }

  const getCategoryList = async (pageSize, pageNumber, name) => {
    try {
      const res = await axios.get(CATEGORIES_URLS.getList, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }, params: { pageSize, pageNumber, name } })
      setarrayOfPages(Array(res.data.totalNumberOfPages).fill().map((_, i) => i + 1))
      setCategoryList(res.data.data)
    } catch (error) {
      console.log(error);
      toast.error('some thing went wrong please try again later')
    }
  }

  const getNameValue = (input) => {
    setNameValue(input.target.value);
    getCategoryList(5, 1, input.target.value)
  }

  useEffect(() => {
    getCategoryList(5, 1, '')
  }, [])

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
        <input type="text" placeholder="Search by Name..." className="form-control mb-3" onChange={getNameValue} />
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
                  <td>{category.creationDate}</td>
                  <td>
                    <i onClick={() => handleShow(category.id)} className="fa-solid fa-trash fa-lg me-3"></i>
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
            return <li key={pageNumber} onClick={() => getCategoryList(5, pageNumber)} className="page-item"><a className="page-link" href="#">{pageNumber}</a></li>
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

export default CtegoriesList