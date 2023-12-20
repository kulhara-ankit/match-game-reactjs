import './index.css'

const Thumbnails = props => {
  const {imagesList, imageTab} = props
  const {id, thumbnailUrl} = imagesList

  const onClickImageTab = () => {
    imageTab(id)
  }

  return (
    <li className="image-item">
      <button className="button-img" type="button" onClick={onClickImageTab}>
        <img src={thumbnailUrl} alt="thumbnail" className="thumbnail-image" />
      </button>
    </li>
  )
}

export default Thumbnails
