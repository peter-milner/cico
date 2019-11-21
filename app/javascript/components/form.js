import React, { useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

export default function Form (props) {
    const CLOCKED_IN = 1
    const CLOCKED_OUT = 0

    const [name, setName] = useState('')
    const [status, setStatus] = useState(null)

    const handleSubmit = (e) => {
        e.preventDefault()

        axios({
            method: 'post',
            url: '/events',
            data: {
                name: name,
                status: status
            }
        }).then((response) => {
            const checked = status === CHECKED_IN ? 'in' : 'out'
            if (response.data.sameState) {
                props.setNotificationMessage(`You are already checked ${checked}`)
            } else {
                props.setNotificationMessage(`You have successfully checked ${checked}`)
            }
        }).catch((error) => {
            props.setNotificationMessage('An error has occured. Please report this to the admin.')
        })
    }    

    return (
        <form onSubmit={handleSubmit}>
            <div className='field'>
                <label className='label is-large'>Name</label>
                <div className='control'>
                    <input className='input is-large' type='text' value={name} onChange={e => setName(e.target.value)} />
                </div>
            </div>
            <div className='field is-grouped is-grouped-centered'>
                <div className='control'>
                    <button className='button is-link is-large' type='submit' onClick={() => setStatus(CLOCKED_IN)}>Clock In</button>
                </div>
                <div className='control'>
                    <button className='button is-link is-large' type='submit' onClick={() => setStatus(CLOCKED_OUT)}>Clock Out</button>
                </div>
            </div>
        </form>      
    )
}

Form.propTypes = {
    setNotificationMessage: PropTypes.func.isRequired
}
