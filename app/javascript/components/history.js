import React from 'react'
import PropTypes from 'prop-types'

export default function History (props) {
    return (
        <div style={{height: '20rem', overflowY: 'auto'}}>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Created At</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.events.map((event) => 
                            <tr key={event.id}>
                                <td>{event.name}</td>
                                <td>{new Date(event.created_at).toLocaleString()}</td>
                                <td>{event.status}</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

History.propTypes = {
    events: PropTypes.array
}
