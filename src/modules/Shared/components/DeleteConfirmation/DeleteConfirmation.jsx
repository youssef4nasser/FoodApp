import noData from '../../../../assets/imgaes/no-data.png'
function DeleteConfirmation({ deleteItem }) {
    return (
        <div className="modalBody text-center">
            <img loading='lazy' src={noData} alt="no data" />
            <h5 className='mt-3'>Delete this {deleteItem}</h5>
            <span className='text-muted'>are you sure you want to delete this item? if you are sure just click on delete item</span>
        </div>
    )
}

export default DeleteConfirmation