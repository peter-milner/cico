import React, { useState } from 'react'

export default function Form () {
    const CLOCKED_IN = 'in'
    const CLOCKED_OUT = 'out'

    const [name, setName] = useState('')
    const [buttonClicked, setButtonClicked] = useState(null)

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(name, buttonClicked)
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
                                <button className='button is-link is-large' type='submit' onClick={() => setButtonClicked(CLOCKED_IN)}>Clock In</button>
                            </div>
                            <div className='control'>
                                <button className='button is-link is-large' type='submit' onClick={() => setButtonClicked(CLOCKED_OUT)}>Clock Out</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}