import React, { useState } from 'react'
import axios from 'axios'
import 'bulma/css/bulma.min.css'

import Clock from './clock'
import Form from './form'
import Notification from './notification'
import History from './history'

const csrfToken = document.querySelector('[name=csrf-token]').content
axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken

export default function App () {
    const [notificationMessage, setNotificationMessage] = useState(null)
    const [previousEvents, setPreviousEvents] = useState(null)

    const loadEvents = () => {
        axios.get('/events').then((response) => {
            setPreviousEvents(response.data)
        })
    }

    if (!previousEvents) {
        loadEvents()
    }
    
    return (
        <>
            <section className='section'>
                <div className='container has-text-centered'>
                    <h1 className='title'>
                        Welcome!
                    </h1>
                    <h2 className='subtitle'>
                        <Clock />
                    </h2>
                </div>
                <Notification message={notificationMessage} setNotificationMessage={setNotificationMessage} />
            </section>
            <section className='section'>
                <div className='columns'>
                    <div className='column is-half is-offset-one-quarter'>
                        <Form setNotificationMessage={setNotificationMessage} updateEvents={loadEvents} />
                    </div>
                </div>
            </section>
            { previousEvents && 
                <section className='section'>
                    <div className='container has-text-centered'>
                        <h2 className='subtitle'>Previous Clock Events</h2>
                        <History events={previousEvents} />
                    </div>
                </section>
            }
        </>
    )
}  
