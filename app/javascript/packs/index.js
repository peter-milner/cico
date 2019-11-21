import React from 'react'
import ReactDOM from 'react-dom'
import 'bulma/css/bulma.min.css'

import App from '../components/app'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App />,
    document.body.appendChild(document.createElement('div')),
  )
})
