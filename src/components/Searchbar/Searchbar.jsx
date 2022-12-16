import css from "../Searchbar/Searchbar.module.css"
import {AiOutlineSearch} from "react-icons/ai"

export function Searchbar({onSubmit}) {
    function handleSubmit(e) {
      e.preventDefault();
      onSubmit(e.currentTarget[1].value)
      e.currentTarget[1].value = "";
    }
    
    return <div className={css.searchbar}>
  <form className={css.searchForm} onSubmit={handleSubmit}>
    <button type="submit" className={css.searchFormButton}>
                    <AiOutlineSearch size={25} fill={"black"} />
    </button>

    <input
    className={css.searchFormInput}
    type="text"
    autoComplete="off"
    autoFocus
    placeholder="Search images and photos"
    name="imgName"
    />
  </form>
</div>}  
  