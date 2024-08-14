import Header from "../../../Shared/components/Header/Header.jsx"
import headerBG from '../../../../assets/imgaes/Group2.png'
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import NoData from "../../../Shared/components/NoData/NoData.jsx";
import noDataImg from '../../../../assets/imgaes/no-data.png'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DeleteConfirmation from "../../../Shared/components/DeleteConfirmation/DeleteConfirmation.jsx";
import { CATEGORIES_URLS, GETALLTAGS, RECIPES_URLS } from "../../../../constants/END_POINTS.js";
import { useNavigate } from "react-router-dom";

function RecipesList() {
  const [recipesList, setRecipesList] = useState([])
  const [arrayOfPages, setarrayOfPages] = useState([])
  const [show, setShow] = useState(false);
  const [recipesId, setRecipesId] = useState(0)
  const navigate = useNavigate()
  const [tags, setTags] = useState([])
  const [categoryList, setCategoryList] = useState([])
  const [nameValue, setNameValue] = useState('')
  const [categoryValue, setCategoryValue] = useState('')
  const [tagValue, setTagValue] = useState('')

  const getAllTags = async () => {
    try {
      const res = await axios.get(GETALLTAGS, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
      setTags(res.data)
    } catch (error) {
      console.log(error);
      toast.error('some thing went wrong please try again later')
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

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setShow(true);
    setRecipesId(id)
  }

  const deleteRecipes = async () => {
    try {
      await axios.delete(RECIPES_URLS.delete(recipesId), { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
      toast.success('deleted succefuly')
      handleClose()
      getRecipesList()
    } catch (error) {
      console.log(error);
      toast.error('some thing went wrong please try again')
    }
  }

  const getRecipesList = async (pageSize, pageNumber, nameInput, tagInput, categoryInput) => {
    try {
      const res = await axios.get(RECIPES_URLS.getList,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          params: { pageSize, pageNumber, name: nameInput, tagId: tagInput, categoryId: categoryInput }
        })
      setarrayOfPages(Array(res.data.totalNumberOfPages).fill().map((_, i) => i + 1))
      setRecipesList(res.data.data)
    } catch (error) {
      console.log(error);
      toast.error('some thing went wrong please try again later')
    }
  }

  const getNameValue = (input) => {
    setNameValue(input.target.value);
    getRecipesList(5, 1, input.target.value, tagValue, categoryValue);
  }
  const getCategoryValue = (input) => {
    setCategoryValue(input.target.value);
    getRecipesList(5, 1, nameValue, tagValue, input.target.value);
  }
  const getTagValue = (input) => {
    setTagValue(input.target.value);
    getRecipesList(5, 1, nameValue, input.target.value, categoryValue);
  }

  useEffect(() => {
    getRecipesList(5, 1)
    getAllTags()
    getCategoryList()
  }, [])

  return <>
    <Header imgUrl={headerBG} title={'Recipes Items'} description={'This is a welcoming screen for the entry of the application , you can now see the options'} />
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
      </Modal.Header>
      <Modal.Body>
        <DeleteConfirmation deleteItem={'Category'} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={deleteRecipes}>
          Delete this item
        </Button>
      </Modal.Footer>
    </Modal>
    <div className="p-4">
      <div className="title d-flex justify-content-between">
        <div className="info">
          <h4>Recipe Table Details</h4>
          <span>You can check all details</span>
        </div>
        <div className="add">
          <button className="btn btn-success py-2 px-3" onClick={() => navigate('/dashboard/recipe-data')}>Add New Recipe</button>
        </div>
      </div>
      <div className="tableContainer">
        <div className="row mt-3">
          <div className="col-md-6">
            <div className="searchBar">
              <input onChange={getNameValue} type="text" className="form-control" placeholder="Search by name" />
            </div>
          </div>
          <div className="col-md-3">
            <div className="categoriesBar">
              <select onChange={getCategoryValue} className="form-control mb-2">
                <option disabled>select category</option>
                {categoryList.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
              </select>
            </div>
          </div>
          <div className="col-md-3">
            <div className="tagsBar">
              <select onChange={getTagValue} className="form-control mb-2">
                <option disabled>select tag</option>
                {tags.map((tag) => <option key={tag.id} value={tag.id}>{tag.name}</option>)}
              </select>
            </div>
          </div>
        </div>
        {recipesList.length > 0 ?
          <table className="table mt-3 text-center">
            <thead>
              <tr className="table-active">
                <th scope="col">Name</th>
                <th scope="col">Image</th>
                <th scope="col">Price</th>
                <th scope="col">Description</th>
                <th scope="col">Tag</th>
                <th scope="col">Category</th>
                <th scope="col">actions</th>
              </tr>
            </thead>
            <tbody>
              {recipesList.map((recipes) => {
                return <tr key={recipes.id}>
                  <td>{recipes?.name}</td>
                  <td><img width={50} src={recipes?.imagePath ? `https://upskilling-egypt.com:3006/${recipes.imagePath}` : noDataImg} alt={recipes.name} /></td>
                  <td>{recipes?.price}</td>
                  <td>{recipes?.description}</td>
                  <td>{recipes.tag?.name}</td>
                  <td>{recipes?.category[0]?.name ? recipes?.category[0]?.name : 'No Category'}</td>
                  <td>
                    <i onClick={() => handleShow(recipes.id)} className="fa-solid fa-trash fa-lg me-3"></i>
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
            return <li key={pageNumber} onClick={() => getRecipesList(5, pageNumber)} className="page-item"><a className="page-link" href="#">{pageNumber}</a></li>
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

export default RecipesList