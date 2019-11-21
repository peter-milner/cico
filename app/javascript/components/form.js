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
            const checked = status === 1 ? 'in' : 'out'
            props.setNotificationMessage(`You have successfully checked ${checked}`)
        }).catch((error) => {
            if (error.response.data.code && error.response.data.code === 1000) {
                props.setNotificationMessage(error.response.data.error)
            } else {
                props.setNotificationMessage('An error has occured. Please report this to the admin.')
            }
        })
    }    

    return (
        <section className='section'>
            <div className='columns'>
                <div className='column is-half is-offset-one-quarter'>
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
                </div>
            </div>
        </section>
    )
}

Form.propTypes = {
    setNotificationMessage: PropTypes.func.isRequired
}
