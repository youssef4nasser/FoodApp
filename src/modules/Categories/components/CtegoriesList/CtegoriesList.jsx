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

function CtegoriesList() {

  const [categoryList, setCategoryList] = useState([])
  const [show, setShow] = useState(false);
  const [categoryId, setCategoryId] = useState(0)

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setShow(true);
    setCategoryId(id)
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

  const getCategoryList = async () => {
    try {
      const res = await axios.get(CATEGORIES_URLS.getList, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
      setCategoryList(res.data.data)
    } catch (error) {
      console.log(error);
      toast.error('some thing went wrong please try again later')
    }
  }

  useEffect(() => {
    getCategoryList()
  }, [])

  return <>
    <Header imgUrl={headerBG} title={'Categories Items'} description={'You can now add your items that any user can order it from the Application and you can edit'} />
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
    <div className="p-4">
      <div className="title d-flex justify-content-between">
        <div className="info">
          <h4>Categories Table Details</h4>
          <span>You can check all details</span>
        </div>
        <div className="add">
          <button className="btn btn-success py-2 px-3">Add New Category</button>
        </div>
      </div>
      <div className="tableContainer">
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
    </div>
  </>
}

export default CtegoriesList