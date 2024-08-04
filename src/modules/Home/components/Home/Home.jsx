import Header from "../../../Shared/components/Header/Header.jsx"
import headerBG from '../../../../assets/imgaes/Group1.png'

function Home() {
  return <>
    <Header imgUrl={headerBG} title={'Welcome Upskilling !'} description={'This is a welcoming screen for the entry of the application , you can now see the options'} />
    <div>Home</div>
  </>

}

export default Home