import { useEffect } from "react"
import css from "../Modal/Modal.module.css"

export function Modal({closeModal, url}) {
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => {window.removeEventListener("keydown", handleKeyDown)}
  })
  
  function handleKeyDown(e) {
    if (e.code === "Escape") {
      this.props.closeModal()
    }
  }

  function handleBackdrop(e) {
    if (e.currentTarget === e.target) {
      closeModal()
    }
  }

    return <div className={css.overlay} onClick={handleBackdrop}>
      <div className={css.modal}>
        <img src={url} alt={url} />
        </div>
  </div>
}
