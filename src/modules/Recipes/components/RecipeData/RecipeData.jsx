import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { toast } from "react-toastify"
import { CATEGORIES_URLS, GETALLTAGS, RECIPES_URLS } from "../../../../constants/END_POINTS.js"
import { useForm } from "react-hook-form"

function RecipeData() {
    const navigate = useNavigate()
    const [tags, setTags] = useState([])
    const [categoryList, setCategoryList] = useState([])
    const { register, handleSubmit, formState: { errors } } = useForm()
    const location = useLocation()
    const status = location.state?.type === "update"
    const recipeData = location.state?.recipeData
    const [tagId, setTagId] = useState('')
    const [categoryId, setCategoryId] = useState([])
    // const [show, setShow] = useState(false);
    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);

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

    useEffect(() => {
        getAllTags()
        getCategoryList()
        if (status && recipeData) {
            setTagId(recipeData.tag.id)
            setCategoryId(recipeData.category[0].id)
        }
    }, [])

    // beforeunload
    useEffect(() => {
        const beforeUnload = (e) => {
            e.preventDefault()
        }
        window.addEventListener('beforeunload', beforeUnload)
        return () => {
            window.addEventListener('beforeunload', beforeUnload)
        }
    }, [])

    // let blocker = useBlocker(
    //     ({ currentLocation, nextLocation }) =>
    //         getValues !== "" && currentLocation.pathname !== nextLocation.pathname
    // );

    const appendToFormData = (data) => {
        const formData = new FormData()
        formData.append('name', data.name);
        formData.append('price', data.price);
        formData.append('description', data.description);
        formData.append('categoriesIds', data.categoriesIds);
        formData.append('tagId', data.tagId);
        formData.append('recipeImage', data.recipeImage[0]);
        return formData;
    }

    const onSubmit = async (data) => {
        const recipeFromData = appendToFormData(data);
        try {
            const res = await axios(
                {
                    method: status ? 'PUT' : 'POST',
                    url: status ? RECIPES_URLS.update(recipeData.id) : RECIPES_URLS.add,
                    data: recipeFromData,
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                }
            )
            if (res.config.method == 'put') toast.success('Recipe updated successfully')
            if (res.config.method == 'post') toast.success('Recipe added successfully')
            navigate('/dashboard/recipesList')
        } catch (error) {
            toast.error('some thing went wrong please try again later')
        }
    }

    return <>
        <div className="home-content py-4 my-3 px-5 d-flex justify-content-between align-items-center">
            <div className="home-content-left">
                <h5>Fill the <span className="text-success">Recipes !</span></h5>
                <p>you can now fill the meals easily using the table and form ,<br /> click here and sill it with the table !</p>
            </div>
            <button onClick={() => navigate('/dashboard/recipesList')} className="btn btn-success">Fill Recipes <i className="fa fa-arrow-right" aria-hidden="true"></i></button>
        </div>
        <div className="w-75 m-auto mt-4">
            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register('name', { required: 'name is required' })}
                    defaultValue={status ? recipeData.name : ""}
                    type="text" className="form-control mb-2" placeholder="Recipe Name" aria-label="name" aria-describedby="basic-addon1" />
                {errors.name && <span className='text-danger'>{errors.name.message}</span>}

                <select className="form-control mb-2"
                    {...register('tagId', { required: 'tag is required' })}
                    value={tagId}
                    onChange={(e) => setTagId(e.target.value)}
                >
                    <option value={''} disabled>select tag</option>
                    {tags.map((tag) => <option key={tag.id} value={tag.id}>{tag.name}</option>)}
                </select>
                {errors.tag && <span className='text-danger'>{errors.tag.message}</span>}

                <input {...register('price', { required: 'price is required' })}
                    defaultValue={status ? recipeData.price : ""}
                    type="number" className="form-control mb-2" placeholder="Price Name" aria-label="price" aria-describedby="basic-addon1" />
                {errors.price && <span className='text-danger'>{errors.price.message}</span>}

                <select className="form-control mb-2"
                    {...register('categoriesIds', { required: 'category is required' })}
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                >
                    <option value={''} disabled>select category</option>
                    {categoryList.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
                </select>
                {errors.categoriesIds && <span className='text-danger'>{errors.categoriesIds.message}</span>}

                <textarea placeholder="Description" className="form-control mb-2"
                    defaultValue={status ? recipeData.description : ""}
                    {...register('description', { required: 'description is required' })}></textarea>
                {errors.description && <span className='text-danger'>{errors.description.message}</span>}

                <input {...register('recipeImage', { required: 'recipe image is required' })} type="file" className="form-control mb-2" placeholder="upload image" aria-label="image" aria-describedby="basic-addon1" />
                {errors.recipeImage && <span className='text-danger'>{errors.recipeImage.message}</span>}

                <div className="mt-3">
                    <button className="btn btn-success me-3">Save</button>
                    <button type="button" onClick={() => navigate('/dashboard/recipesList')} className="btn btn-outline-danger">Cancel</button>
                </div>
                {/* {blocker.state === "blocked" ? (
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                        </Modal.Header>
                        <Modal.Body>
                            <h5>Are you sure you want to leave?</h5>
                        </Modal.Body>
                        <Modal.Footer>
                            <button className="btn btn-success me-3" onClick={() => blocker.proceed()}>
                                Proceed
                            </button>
                            <button className="btn btn-danger" onClick={() => blocker.reset()}>
                                Cancel
                            </button>
                        </Modal.Footer>
                    </Modal>
                ) : null} */}
            </form>
        </div>
    </>
}

export default RecipeData