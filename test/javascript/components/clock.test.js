import React from 'react'
import { act } from 'react-dom/test-utils'
import { mount } from 'enzyme'

import Clock from '../../../app/javascript/components/clock'

const render = () => {
    return mount(
        <Clock />
    )
}

describe('<Clock />', () => {
    test('snapshot', () => {
        const rendered = render()
        expect(rendered).toMatchSnapshot()
    })

    test('clock is ticking', async () => {
        const rendered = render()
        const time = new Date().toLocaleTimeString()
        expect(rendered.text()).toEqual(time)
        await act(async () => {
            await new Promise((r) => setTimeout(r, 1000))
        })
        rendered.update()
        expect(rendered.text()).not.toEqual(time)     
    })
})
