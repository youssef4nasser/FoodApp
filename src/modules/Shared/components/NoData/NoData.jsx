import noData from '../../../../assets/imgaes/no-data.png'

function NoData() {
    return (
        <div className="text-center ">
            <img  width={180} src={noData} alt="No Data" />
            <h4>No Data !</h4>
            {/* <span>No data avilable</span> */}
        </div>
    )
}

export default NoData