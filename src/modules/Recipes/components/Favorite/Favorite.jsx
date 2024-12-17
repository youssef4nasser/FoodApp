import axios from "axios";
import { useEffect, useState } from "react";
import { FAVORITE_URLS } from "../../../../constants/END_POINTS.js";
import NoData from "../../../Shared/components/NoData/NoData.jsx";
import Header from "../../../Shared/components/Header/Header.jsx";
import headerBG from '../../../../assets/imgaes/Group2.png'
import { toast } from "react-toastify";

function Favorite() {
    const [favorite, setFavorite] = useState([]);

    const getFavoriteList = async () => {
        try {
            const res = await axios.get(FAVORITE_URLS.getList, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
            setFavorite(res.data.data)
        } catch (error) {
            toast.error('some thing went wrong please try again later')
            console.log(error);
        }
    }

    const removeFavorite = async (id) => {
        try {
            await axios.delete(FAVORITE_URLS.deleteFavorite(id), { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
            toast.success('Recipe removed successfully')
            getFavoriteList()
        } catch (error) {
            toast.error('some thing went wrong please try again later')
            console.log(error);
        }
    }

    useEffect(() => {
        getFavoriteList()
    }, [])

    return <>
        <Header imgUrl={headerBG} title={'Favorite Items'} description={'This is a welcoming screen for the entry of the application , you can now see the options'} />
        {favorite.length > 0 ? <div className="container">
            <div className="row g-4 mt-3">
                {favorite.map((favorite) => {
                    return <div key={favorite.id} className="col-md-4">
                        <div className="recipe">
                            <img className="w-100" src={`https://upskilling-egypt.com:3006/${favorite.recipe.imagePath}`} alt="image-recipe " />
                            <h3>{favorite.recipe.name}</h3>
                            <p>{favorite.recipe.description}</p>
                            <button onClick={() => removeFavorite(favorite.id)} className="btn btn-outline-danger">remove from favorite</button>
                        </div>
                    </div>
                })}
            </div>
        </div > : <div className="mt-5"><NoData /></div>}
    </>
}

export default Favorite