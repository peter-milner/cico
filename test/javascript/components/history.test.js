import React from 'react'
import { shallow } from 'enzyme'
import * as axios from 'axios'

jest.mock('axios')

import History from '../../../app/javascript/components/history'

const defaultProps = {
    events: [{ id: 1, name: 'test', status: 'checked_in', created_at: new Date().toISOString() }],
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
    axios.patch.mockImplementation(() => Promise.resolve({ status: 200, data: {} }))
})

describe('<History />', () => {
    test('snapshot', () => {
        const rendered = render()
        expect(rendered).toMatchSnapshot()
    })

    test('axios is called with the correct id on delete', () => {
        const spy = jest.spyOn(axios, 'delete')
        const rendered = render()
        const btn = rendered.find('tbody').find('button').first().simulate('click')
        const id = setImmediate(() => {
            expect(spy).toHaveBeenCalledWith(`/events/${btn.props().id}`)
        })
        clearImmediate(id)
    })

    test('notification is sent and events are updated on successful delete', () => {
        const spyNotification = jest.spyOn(defaultProps, 'setNotificationMessage')
        const spyUpdate = jest.spyOn(defaultProps, 'updateEvents')
        const rendered = render()
        rendered.find('tbody').find('button').first().simulate('click')
        const id = setImmediate(() => {
            expect(spyUpdate).toHaveBeenCalled()
            expect(spyNotification).toHaveBeenCalledWith('You have successfully deleted the event.')
        })
        clearImmediate(id)
    })

    test('notification is sent on delete error', () => {
        axios.delete.mockImplementation(() => Promise.reject(new Error('Failure')))
        jest.spyOn(global.console, 'log').mockImplementation(() => jest.fn()); // Suppress log
        const spyNotification = jest.spyOn(defaultProps, 'setNotificationMessage')
        const rendered = render()
        rendered.find('tbody').find('button').first().simulate('click')
        const id = setImmediate(() => {
            expect(spyNotification).toHaveBeenCalledWith('An error has occured. Please report this to the admin.')
        })
        clearImmediate(id)
    })

    test('updateEvents is called when refresh is clicked', () => {
        const spy = jest.spyOn(defaultProps, 'updateEvents')
        const rendered = render()
        rendered.find('button').first().simulate('click')
        const id = setImmediate(() => {
            expect(spy).toHaveBeenCalled()
        })
        clearImmediate(id)
    })

    test('axios is called with the correct data on edit', () => {
        const spy = jest.spyOn(axios, 'patch')
        const rendered = render()
        let newDate = new Date().toISOString()
        newDate = newDate.substring(0, newDate.length-1)
        const row = rendered.find('tbody').find('tr').first()
        row.find('input[type="datetime-local"]').first().simulate(
            'change', 
            {
                target: {
                    value: newDate
                }
            }
        )
        const id = setImmediate(() => {
            expect(spy).toHaveBeenCalledWith(`/events/${row.props().key}`, { created_at: newDate })
        })
        clearImmediate(id)
    })

    test('notification is sent on successful edit', () => {
        const spyNotification = jest.spyOn(defaultProps, 'setNotificationMessage')
        const rendered = render()
        let newDate = new Date().toISOString()
        newDate = newDate.substring(0, newDate.length-1)
        rendered.find('tbody').find('tr').first().find('input[type="datetime-local"]').first().simulate(
            'change', 
            {
                target: {
                    value: newDate
                }
            }
        )
        const id = setImmediate(() => {
            expect(spyNotification).toHaveBeenCalledWith('You have successfully edited the event.')
        })
        clearImmediate(id)
    })

    test('notification is sent on edit error', () => {
        axios.patch.mockImplementation(() => Promise.reject(new Error('Failure')))
        jest.spyOn(global.console, 'log').mockImplementation(() => jest.fn()); // Suppress log

        const spyNotification = jest.spyOn(defaultProps, 'setNotificationMessage')
        const rendered = render()
        let newDate = new Date().toISOString()
        newDate = newDate.substring(0, newDate.length-1)
        rendered.find('tbody').find('tr').first().find('input[type="datetime-local"]').first().simulate(
            'change', 
            {
                target: {
                    value: newDate
                }
            }
        )
        const id = setImmediate(() => {
            expect(spyNotification).toHaveBeenCalledWith('An error has occured. Please report this to the admin.')
        })
        clearImmediate(id)
    })
})
