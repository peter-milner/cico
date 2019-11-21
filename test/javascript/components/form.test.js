import React from 'react'
import { act } from 'react-dom/test-utils'
import { mount } from 'enzyme'
import * as axios from 'axios'

jest.mock('axios')
axios.post.mockImplementation(() => Promise.resolve({ status: 200, data: [] }))

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
        
        expect(spy).toHaveBeenCalledWith('/events', {'name': name, 'status': 1})
    })
})