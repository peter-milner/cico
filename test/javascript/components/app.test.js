import React from 'react'
import { shallow } from 'enzyme'
import * as axios from 'axios'

jest.mock('axios')

import App from '../../../app/javascript/components/app'
import Form from '../../../app/javascript/components/form'
import History from '../../../app/javascript/components/history'

const render = () => {
    return shallow(
        <App />
    )
}

beforeEach(() => {
    jest.clearAllMocks()
    axios.get.mockImplementation(() => Promise.resolve({ status: 200, data: [] }))
})

describe('<App />', () => {
    test('snapshot', () => {
        const rendered = render()
        const id = setImmediate(() => {
            expect(rendered).toMatchSnapshot()
        })
        clearImmediate(id)
    })

    test('axios called when previousEvents is null', () => {
        const spy = jest.spyOn(axios, 'get')
        const rendered = render()

        rendered.update()
        const id = setImmediate(() => {
            expect(spy).toHaveBeenCalledTimes(1)
        })
        clearImmediate(id)
    })

    test('axios can be called with Form prop', () => {
        const spy = jest.spyOn(axios, 'get')
        const rendered = render()

        rendered.find(Form).props().updateEvents()
        const id = setImmediate(() => {
            expect(spy).toHaveBeenCalledTimes(2)
        })
        clearImmediate(id)
    })

    test('do not show event history if previousEvents is not truthy', () => {
        const rendered = render()
        expect(rendered.find('section').length).toEqual(2)
        const id = setImmediate(() => {
            expect(rendered.find('section').length).toEqual(3)
        })
        clearImmediate(id)
    })

    test('events correctly passed to History', () => {
        const data = [{name:'test'}]
        axios.get.mockImplementation(() => Promise.resolve({ status: 200, data: data }))
        const rendered = render()
        const id = setImmediate(() => {
            expect(rendered.containsMatchingElement(<History events={data} />)).toEqual(true)
        })
        clearImmediate(id)
    })
})