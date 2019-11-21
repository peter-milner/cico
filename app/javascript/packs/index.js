import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import 'bulma/css/bulma.min.css'

import App from '../components/app'

const csrfToken = document.querySelector('[name=csrf-token]').content
axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App />,
    document.body.appendChild(document.createElement('div')),
  )
})
