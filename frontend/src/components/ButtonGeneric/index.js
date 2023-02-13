// Boton generico
import './index.css'

export const ButtonGeneric = ({type="button", text, className, onClickFunction}) => {

    return (
    <button type={type} className={`ButtonGeneric ${className}`} onClick={onClickFunction}>{text}</button>
)
}