import React from 'react'

import Clock from './clock'
import Form from './form'

export default function App () {
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
            <Form />
        </>
    )
}
  
