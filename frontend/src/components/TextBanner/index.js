/* COMPONENTE TextBanner: banner/cinta de texto a modo de aviso/indicador */

import PropTypes from 'prop-types'

export const TextBanner = ({text}) => {
    return (
        <p>{text}</p>
    )
}

TextBanner.propTypes = {
    text: PropTypes.string.isRequired
}