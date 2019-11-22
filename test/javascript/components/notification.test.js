import React from 'react'
import { shallow } from 'enzyme'

import Notification from '../../../app/javascript/components/notification'

const defaultProps = {
    setNotificationMessage: jest.fn(),
    message: 'Test',
}

const render = (props) => {
    const newProps = Object.assign({}, defaultProps, props)
    return shallow(
        <Notification {...newProps} />
    )
}

describe('<Notification />', () => {
    test('snapshot', () => {
        const rendered = render()
        expect(rendered).toMatchSnapshot()
    })

    test('notification is shown when message provided', () => {
        const rendered = render()
        expect(rendered.find('div').hasClass('is-invisible')).toEqual(false)
    })

    test('notification is hidden when no message', () => {
        const rendered = render({message: null})
        expect(rendered.find('div').hasClass('is-invisible')).toEqual(true)
    })

    test('setNotificationMessage is called with null when x is clicked', () => {
        const rendered = render()
        const spy = jest.spyOn(defaultProps, 'setNotificationMessage')
        rendered.find('button').simulate('click')
        expect(spy).toHaveBeenCalledWith(null)
    }) 
})
