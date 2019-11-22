import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

export default function History (props) {

    const deleteEvent = (id) => {
        axios.delete(`/events/${id}`).then((response) => {
            props.setNotificationMessage('You have successfully deleted the event.')
            props.updateEvents()
        }).catch((error) => {
            console.log(error)
            props.setNotificationMessage('An error has occured. Please report this to the admin.')
        })
    }

    return (
        <div style={{height: '20rem', overflowY: 'auto'}}>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Created At</th>
                        <th>Status</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.events.map((event) => 
                            <tr key={event.id}>
                                <td>{event.name}</td>
                                <td>{new Date(event.created_at).toLocaleString()}</td>
                                <td>{event.status}</td>
                                <td>
                                    <button className='button is-success'>Edit</button>
                                </td>
                                <td>
                                    <button className='button is-danger' onClick={()=>{deleteEvent(event.id)}}>Delete</button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

History.propTypes = {
    events: PropTypes.array,
    setNotificationMessage: PropTypes.func.isRequired,
    updateEvents: PropTypes.func.isRequired
}
