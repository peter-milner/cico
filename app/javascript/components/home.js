import React from 'react'
import PropTypes from 'prop-types'

export default function Hello (props) {
    return (
        <div>Hello {props.name}!</div>
    )
}
  
Hello.defaultProps = {
    name: 'David'
}

Hello.propTypes = {
    name: PropTypes.string
}