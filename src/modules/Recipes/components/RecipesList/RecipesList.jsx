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
import { RECIPES_URLS } from "../../../../constants/END_POINTS.js";

function RecipesList() {
  const [recipesList, setRecipesList] = useState([])
  const [show, setShow] = useState(false);
  const [recipesId, setRecipesId] = useState(0)

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

  const getRecipesList = async () => {
    try {
      const res = await axios.get(RECIPES_URLS.getList, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
      setRecipesList(res.data.data)
      console.log(res);
    } catch (error) {
      console.log(error);
      toast.error('some thing went wrong please try again later')
    }
  }

  useEffect(() => {
    getRecipesList()
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
          <button className="btn btn-success py-2 px-3">Add New Category</button>
        </div>
      </div>
      <div className="tableContainer">
        {recipesList.length > 0 ?
          <table className="table mt-4 text-center">
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
    </div>
  </>

}

export default RecipesList