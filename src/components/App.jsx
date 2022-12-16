import { useState, useEffect } from "react";
import { ImageGallery } from "../components/ImageGallery/ImageGallery";
import { Searchbar } from "../components/Searchbar/Searchbar";
import { Spinner } from "../components/Loader/Loader"
import { getByName } from "utils/getData";
import { Button } from "../components/Button/Button"
import { Modal } from "../components/Modal/Modal";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'

export function App() {
  const [query, setQuery] = useState('')
  const [images, setImages] = useState([])
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [selectedImg, setSelectedImg] = useState(null)
  const [showButton, setShowButton] = useState(false)

  function handleFormSubmit(prevQuery) {
   if (prevQuery === query) {
    return toast.warn("Please, enter anything else")
   }
   if (prevQuery === '') {
    return toast.warn("Please, enter something")
    } 
    setPage(1)
    setImages([])
    setQuery(prevQuery)
  }

 useEffect(() => 
 {if (query === '') {return}
   function fetchImages(prevQuery, prevPage) {
   if (prevQuery !== query || prevPage !== page) {
     setIsLoading(true)
     setShowButton(false)
            getByName(query, page)
              .then(images => {
                if (images.length === images.data.total) {
                  return toast.info('You have reached the end of your search...')
                }
                if (images.data.hits.length >= 12) {
                  setShowButton(true)
                } else
                  setShowButton(false)
                  setImages(prevImages => [...prevImages, ...images.data.hits])
                  setIsLoading(false)
              })
       .catch(error => { setError(toast.error('Something wrong, reload the page')) })
   }
 } 
   fetchImages()
          }, [page, query])
          
   function loadMore() {
        setPage(prev => (prev + 1 ))
    }

    function selectImg(imageUrl) {
      setSelectedImg(imageUrl)
    }
    
   function closeModal() {
        setSelectedImg(null)
    }

    return <>
             <div style={{display: "grid", gridTemplateColumns: "1fr", gridGap: "16px",}}>
             <header>
             <Searchbar onSubmit={handleFormSubmit} />
             </header>
             <main>
             <ToastContainer/>
             <ImageGallery images={images} onSelect={selectImg} />
             {error && <p>{error}</p>}
             {isLoading && <Spinner />}
             {showButton && <Button onClick={loadMore} />}
             </main>
             <footer>
             {selectedImg !== null && <Modal url={selectedImg} closeModal={closeModal}/>}
             </footer>
             </div>
      </>
};
