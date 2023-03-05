/* COMPONENTE TextBanner: banner/cinta de texto a modo de aviso/indicador */

import PropTypes from 'prop-types'

export const TextBanner = ({title, text}) => {
    return (
        <>
        <h1>{title}</h1>
        <p>{text}</p>
        </>
    )
}

TextBanner.propTypes = {
    text: PropTypes.string.isRequired,
    title: PropTypes.string
}