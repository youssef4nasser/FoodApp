import Header from "../../../Shared/components/Header/Header.jsx";
import headerBG from "../../../../assets/imgaes/Group2.png";
import { useCallback, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import noDataImg from "../../../../assets/imgaes/no-data.png";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import DeleteConfirmation from "../../../Shared/components/DeleteConfirmation/DeleteConfirmation.jsx";
import { 
  CATEGORIES_URLS,
  FAVORITE_URLS,
  GETALLTAGS,
  RECIPES_URLS,
} from "../../../../constants/END_POINTS.js";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../context/AuthContext.jsx";
import { paginate } from "../../../../utils.js";
import Loading from "../../../Shared/components/Loading/Loading.jsx";

function RecipesList() {
  const { loginData } = useContext(AuthContext);
  const [recipesList, setRecipesList] = useState([]);
  const [show, setShow] = useState(false);
  const [recipesId, setRecipesId] = useState(0);
  const navigate = useNavigate();
  const [tags, setTags] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [currentpageNumber, setCurrentPageNumber] = useState(null);
  const [totalNumberOfPages, setTotalNumberOfPages] = useState(null);
  const [filters, setFilters] = useState({
    name: "",
    categoryId: "",
    tagId: "",
  });

  const getAllTags = async () => {
    try {
      const res = await axios.get(GETALLTAGS, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setTags(res.data);
    } catch (error) {
      console.log(error);
      toast.error("some thing went wrong please try again later");
    }
  };

  const getCategoryList = async () => {
    try {
      const res = await axios.get(CATEGORIES_URLS.getList, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setCategoryList(res.data.data);
    } catch (error) {
      console.log(error);
      toast.error("some thing went wrong please try again later");
    }
  };

  const handleClose = () => setShow(false);

  const handleShow = (id) => {
    setShow(true);
    setRecipesId(id);
  };

  const deleteRecipes = async () => {
    try {
      await axios.delete(RECIPES_URLS.delete(recipesId), {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      toast.success("deleted succefuly");
      handleClose();
      getRecipesList();
    } catch (error) {
      console.log(error);
      toast.error("some thing went wrong please try again");
    }
  };

  const getRecipesList = useCallback(
    async (pageSize = 5, pageNumber = 1, filters = {}) => {      
      try {
        const res = await axios.get(RECIPES_URLS.getList, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          params: { pageSize, pageNumber, ...filters },
        });
        setRecipesList(res.data.data);
        setCurrentPageNumber(res.data.pageNumber);
        setTotalNumberOfPages(res.data.totalNumberOfPages);
      } catch (error) {
        toast.error("some thing went wrong please try again later");
      }
    },[]
  )

  const addToFavorite = async (id) => {
    try {
      await axios.post(
        FAVORITE_URLS.addToFavorite,
        { recipeId: id },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      toast.success("Recipe added successfully to favorite");
    } catch (error) {
      toast.error("some thing went wrong please try again later");
    }
  };

  useEffect(() => {
    getRecipesList(5, 1, filters);
  }, [filters, getRecipesList, loginData, navigate]);

  useEffect(() => {
    getAllTags();
    getCategoryList();
  }, []);

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalNumberOfPages) {
      setCurrentPageNumber(pageNumber);
      getRecipesList(5, pageNumber, filters);
      console.log(filters);
      
    }
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters);    
    getRecipesList(5, 1, updatedFilters);
  };

  return (
    <>
      <Header
        imgUrl={headerBG}
        title={"Recipes Items"}
        description={
          "This is a welcoming screen for the entry of the application , you can now see the options"
        }
      />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <DeleteConfirmation deleteItem={"Category"} />
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
            {loginData?.userGroup == "SuperAdmin" ? (
              <button
                className="btn btn-success py-2 px-3"
                onClick={() => navigate("/dashboard/recipe-data")}
              >
                Add New Recipe
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="tableContainer">
          <div className="row mt-3">
            <div className="col-md-6">
              <div className="searchBar">
                <input
                  name="name"
                  value={filters.name}
                  onChange={handleFilterChange}
                  type="text"
                  placeholder="Search by name"
                  className="form-control"
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="categoriesBar">
                <select
                  name="categoryId"
                  value={filters.categoryId}
                  onChange={handleFilterChange}
                  className="form-control"
                >
                  <option value="" disabled>
                    Select gategory
                  </option>
                  {categoryList.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col-md-3">
              <div className="tagsBar">
                <select
                  name="tagId"
                  value={filters.tagId}
                  onChange={handleFilterChange}
                  className="form-control"
                >
                  <option disabled>select tag</option>
                  {tags.map((tag) => (
                    <option key={tag.id} value={tag.id}>
                      {tag.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          {recipesList.length > 0 ? (
            <table className="table mt-3 text-center">
              <thead>
                <tr className="table-active">
                  <th scope="col">Name</th>
                  <th scope="col">Image</th>
                  <th scope="col">Price</th>
                  <th scope="col">Description</th>
                  <th scope="col">Category</th>
                  <th scope="col">Tag</th>
                  <th scope="col">actions</th>
                </tr>
              </thead>
              <tbody>
                {recipesList.map((recipes) => {
                  return (
                    <tr key={recipes.id}>
                      <td>{recipes?.name}</td>
                      <td>
                        <img
                          width={50}
                          src={
                            recipes?.imagePath
                              ? `https://upskilling-egypt.com:3006/${recipes.imagePath}`
                              : noDataImg
                          }
                          alt={recipes.name}
                        />
                      </td>
                      <td>{recipes?.price}</td>
                      <td>{recipes?.description}</td>
                      <td>
                        {recipes?.category[0]?.name
                          ? recipes?.category[0]?.name
                          : "No Category"}
                      </td>
                      <td>{recipes.tag?.name}</td>
                      {loginData?.userGroup == "SuperAdmin" ? (
                        <td>
                          <Link
                            to={`/dashboard/recipe-update/${recipes.id}`}
                            state={{ recipeData: recipes, type: "update" }}
                          >
                            <i className="fa-solid fa-edit fa-lg"></i>
                          </Link>
                          <i
                            onClick={() => handleShow(recipes.id)}
                            className="fa-solid cursor-pointer text-danger fa-trash fa-lg ms-3"
                          ></i>
                        </td>
                      ) : (
                        <i
                          onClick={() => addToFavorite(recipes.id)}
                          className="fa-solid fa-heart cursor-pointer fa-lg"
                        ></i>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <Loading />
          )}
        </div>
        {/* <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item">
            <a className="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          {paginate({ currentPage: currentpageNumber, totalNumberOfPages: totalNumberOfPages }).map((item) => {
            return <li key={item} onClick={() => {
              // getRecipesList()
              updateParams({ pageNumber: item })
            }} className={`page-item ${currentpageNumber == item ? 'active' : ""}`}><a className="page-link" href="#">{item}</a></li>
          })}
          <li className="page-item">
            <a className="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav> */}
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

export default RecipesList;
