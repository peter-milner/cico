import React, { useState } from 'react'
import axios from 'axios'
import 'bulma/css/bulma.min.css'

import Clock from './clock'
import Form from './form'
import Notification from './notification'

const csrfToken = document.querySelector('[name=csrf-token]').content
axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken

export default function App () {
    const [notificationMessage, setNotificationMessage] = useState(null)

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
            </section>
            <Notification message={notificationMessage} setNotificationMessage={setNotificationMessage} />
            <section className='section'>
                <div className='columns'>
                    <div className='column is-half is-offset-one-quarter'>
                        <Form setNotificationMessage={setNotificationMessage} />
                    </div>
                </div>
            </section>
        </>
    )
}  
