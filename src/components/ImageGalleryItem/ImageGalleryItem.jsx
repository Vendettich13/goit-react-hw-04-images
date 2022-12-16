import css from "../ImageGalleryItem/ImageGalleryItem.module.css"

export function ImageGalleryItem({ image: { name, webformatURL, largeImageURL}, onSelect }) {
  return <img src={webformatURL} alt={name} className={css.imageGalleryItem} onClick={() => {onSelect(largeImageURL)}} />
}