import React from 'react'
import { shallow } from 'enzyme'
import * as axios from 'axios'

jest.mock('axios')
axios.get.mockImplementation(() => Promise.resolve({ status: 200, data: [] }))

import App from '../../../app/javascript/components/app'

const render = () => {
    return shallow(
        <App />
    )
}

describe('<App />', () => {
    test('snapshot', () => {
        const rendered = render()
        expect(rendered).toMatchSnapshot()
    })

    test('loadEvents/axios called when previousEvents is null', () => {
        const spy = jest.spyOn(axios, 'get')
        render()
        expect(spy).toHaveBeenCalled()
    })
})