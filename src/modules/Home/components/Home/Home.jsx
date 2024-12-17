import Header from "../../../Shared/components/Header/Header.jsx"
import headerBG from '../../../../assets/imgaes/Group1.png'
import { useNavigate } from "react-router-dom"

function Home() {
  const navigate = useNavigate()
  return <>
    <Header imgUrl={headerBG} title={'Welcome Upskilling !'} description={'This is a welcoming screen for the entry of the application , you can now see the options'} />
    <div className="home-content py-4 my-3 px-5 d-flex justify-content-between align-items-center">
      <div className="home-content-left">
        <h5>Fill the <span className="text-success">Recipes !</span></h5>
        <p>you can now fill the meals easily using the table and form ,<br /> click here and sill it with the table !</p>
      </div>
      <div className="">
        <button onClick={() => navigate('/dashboard/recipesList')} className="btn btn-success xs-btnn">Fill Recipes <i className="fa fa-arrow-right" aria-hidden="true"></i></button>
      </div>
    </div>
  </>

}

export default Home