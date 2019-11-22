import React from 'react'
import { shallow } from 'enzyme'

import History from '../../../app/javascript/components/history'

const defaultProps = {
    events: []
}

const render = (props) => {
    const newProps = Object.assign({}, defaultProps, props)
    return shallow(
        <History {...newProps} />
    )
}

describe('<History />', () => {
    test('snapshot', () => {
        const rendered = render()
        expect(rendered).toMatchSnapshot()
    })
})
