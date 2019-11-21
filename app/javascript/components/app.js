import React, { useState } from 'react'

import Clock from './clock'
import Form from './form'
import Notification from './notification'

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
            <Form setNotificationMessage={setNotificationMessage} />
        </>
    )
}
  
