import React from 'react'
import { shallow } from 'enzyme'
import * as axios from 'axios'

jest.mock('axios')

import History from '../../../app/javascript/components/history'

const defaultProps = {
    events: [{ id: 1, name: 'test', status: 'checked_in' }],
    setNotificationMessage: jest.fn(),
    updateEvents: jest.fn()
}

const render = (props) => {
    const newProps = Object.assign({}, defaultProps, props)
    return shallow(
        <History {...newProps} />
    )
}

beforeEach(() => {
    jest.clearAllMocks();
    axios.delete.mockImplementation(() => Promise.resolve({ status: 200, data: {} }))
})

describe('<History />', () => {
    test('snapshot', () => {
        const rendered = render()
        expect(rendered).toMatchSnapshot()
    })

    test('axios is called with the correct id', () => {
        const spy = jest.spyOn(axios, 'delete')
        const rendered = render()
        const btn = rendered.find('button').at(1).simulate('click')
        const id = setImmediate(() => {
            expect(spy).toHaveBeenCalledWith(`/events/${btn.props().id}`)
        })
        clearImmediate(id)
    })

    test('notification is sent and events are updated on successful delete', () => {
        const spyNotification = jest.spyOn(defaultProps, 'setNotificationMessage')
        const spyUpdate = jest.spyOn(defaultProps, 'updateEvents')
        const rendered = render()
        rendered.find('button').at(1).simulate('click')
        const id = setImmediate(() => {
            expect(spyUpdate).toHaveBeenCalled()
            expect(spyNotification).toHaveBeenCalledWith('You have successfully deleted the event.')
        })
        clearImmediate(id)
    })

    test('notification is sent on error', () => {
        axios.delete.mockImplementation(() => Promise.reject(new Error('Failure')))
        jest.spyOn(global.console, 'log').mockImplementation(() => jest.fn()); // Suppress log
        const spyNotification = jest.spyOn(defaultProps, 'setNotificationMessage')
        const rendered = render()
        rendered.find('button').at(1).simulate('click')
        const id = setImmediate(() => {
            expect(spyNotification).toHaveBeenCalledWith('An error has occured. Please report this to the admin.')
        })
        clearImmediate(id)
    })
})
