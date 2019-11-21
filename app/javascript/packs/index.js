import React from 'react'
import ReactDOM from 'react-dom'
import 'bulma/css/bulma.min.css'

import Hello from '../components/home'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Hello name="React" />,
    document.body.appendChild(document.createElement('div')),
  )
})
