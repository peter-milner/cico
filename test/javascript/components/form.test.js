import React from 'react'
import { mount } from 'enzyme'
import * as axios from 'axios'

jest.mock('axios')

import Form from '../../../app/javascript/components/form'

const defaultProps = {
    setNotificationMessage: jest.fn(),
    updateEvents: jest.fn()
}

const render = (props) => {
    const newProps = Object.assign({}, defaultProps, props)
    return mount(
        <Form {...newProps} />
    )
}

beforeEach(() => {
    jest.clearAllMocks();
    axios.post.mockImplementation(() => Promise.resolve({ status: 200, data: {} }))
})

describe('<Form />', () => {
    test('snapshot', () => {
        const rendered = render()
        const id = setImmediate(() => {
            expect(rendered).toMatchSnapshot()
        })
        clearImmediate(id)
    })

    test('axios sends request with correct form data', () => {
        const rendered = render()
        const name = 'test123'
        const spy = jest.spyOn(axios, 'post')

        rendered.find('input').simulate('change', { target: { value: name } })
        rendered.find('button').first().simulate('click')
        rendered.find('form').simulate('submit')
        let id = setImmediate(() => {
            expect(spy).toHaveBeenCalledWith('/events', {'name': name, 'status': 1})
        })
        clearImmediate(id)
        rendered.find('button').at(1).simulate('click')
        rendered.find('form').simulate('submit')
        id = setImmediate(() => {
            expect(spy).toHaveBeenCalledWith('/events', {'name': name, 'status': 0})
        })
        clearImmediate(id)
    })

    test('calls updateEvents if successfully clocked in', () => {
        const rendered = render()
        const spy = jest.spyOn(defaultProps, 'updateEvents')

        rendered.find('form').simulate('submit')
        const id = setImmediate(() => {
            expect(spy).toHaveBeenCalled()
        })
        clearImmediate(id)
    })

    test('calls setNotificationMessage when clocked in/out', () => {
        const rendered = render()
        const spy = jest.spyOn(defaultProps, 'setNotificationMessage')

        rendered.find('form').simulate('submit')
        let id = setImmediate(() => {
            expect(spy).toHaveBeenCalledWith('You have successfully clocked out.')
        })
        clearImmediate(id)

        rendered.find('button').first().simulate('click')
        rendered.find('form').simulate('submit')
        id = setImmediate(() => {
            expect(spy).toHaveBeenCalledWith('You have successfully clocked in.')
        })
        clearImmediate(id)
    })

    test('calls setNotification message on duplicate status', () => {
        axios.post.mockImplementation(() => Promise.resolve({ status: 200, data: {sameState: true} }))
        
        const rendered = render()
        rendered.find('form').simulate('submit')

        const id = setImmediate(() => {
            expect(spy).toHaveBeenCalledWith('You are already clocked out.')
        })
        clearImmediate(id)
    })

    test('calls setNotificationMessage on error', () => {
        axios.post.mockImplementation(() => Promise.reject(new Error('Failure')))
        jest.spyOn(global.console, 'log').mockImplementation(() => jest.fn()); // Suppress log

        const rendered = render()
        rendered.find('form').simulate('submit')

        const id = setImmediate(() => {
            expect(spy).toHaveBeenCalledWith('An error has occured. Please report this to the admin.')
        })
        clearImmediate(id)
    })
})