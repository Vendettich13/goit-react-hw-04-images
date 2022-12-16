import css from "../Button/Button.module.css"

export function Button({onClick}) {
    return <button type="button" className={css.button} onClick={onClick}>Load more</button>
}