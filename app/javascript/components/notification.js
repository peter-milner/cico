import React, { useState } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

export default function Notification (props) {
    const cssClass = classNames({
        'notification': true,
        'is-invisible': !props.message
    })
    return (
        <div className={cssClass} style={{height: '4rem'}}>
            <button className='delete' onClick={() => props.setNotificationMessage(null)}></button>
            {props.message}
        </div>
    )
}

Notification.propTypes = {
    message: PropTypes.string,
    setNotificationMessage: PropTypes.func.isRequired
}