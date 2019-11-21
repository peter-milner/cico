import React from 'react'
import { mount } from 'enzyme'
import * as axios from 'axios'

jest.mock('axios')
axios.post.mockImplementation(() => Promise.resolve({ status: 200, data: {} }))

import Form from '../../../app/javascript/components/form'
import { doesNotReject } from 'assert'

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

describe('<Form />', () => {
    test('snapshot', () => {
        const rendered = render()
        expect(rendered).toMatchSnapshot()
    })

    test('axios sends request with correct form data', () => {
        const rendered = render()
        const name = 'test123'
        const spy = jest.spyOn(axios, 'post')

        rendered.find('input').simulate('change', { target: { value: name } })
        rendered.find('button').first().simulate('click')
        rendered.find('form').simulate('submit')
        setImmediate(() => {
            expect(spy).toHaveBeenCalledWith('/events', {'name': name, 'status': 1})
        })
        rendered.find('button').at(1).simulate('click')
        rendered.find('form').simulate('submit')
        setImmediate(() => {
            expect(spy).toHaveBeenCalledWith('/events', {'name': name, 'status': 0})
        })
    })

    test('calls updateEvents if successfully clocked in', () => {
        const rendered = render()
        const spy = jest.spyOn(defaultProps, 'updateEvents')

        rendered.find('form').simulate('submit')
        setImmediate(() => {
            expect(spy).toHaveBeenCalled()
        })
    })

    test('calls setNotificationMessage when clocked in', () => {
        const rendered = render()
        const spy = jest.spyOn(defaultProps, 'setNotificationMessage')

        rendered.find('form').simulate('submit')
        setImmediate(() => {
            expect(spy).toHaveBeenCalledWith('You have successfully clocked out.')
        })

        axios.post.mockImplementation(() => Promise.resolve({ status: 200, data: {sameState: true} }))
        rendered.find('form').simulate('submit')

        setImmediate(() => {
            expect(spy).toHaveBeenCalledWith('You are already clocked out.')
        })

        axios.post.mockImplementation(() => Promise.reject(new Error('Failure')))
        jest.spyOn(global.console, 'log').mockImplementation(() => jest.fn()); // Suppress log in test
        rendered.find('form').simulate('submit')

        setImmediate(() => {
            expect(spy).toHaveBeenCalledWith('An error has occured. Please report this to the admin.')
        })
    })
})