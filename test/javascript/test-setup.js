import { configure, } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter(), })

Object.defineProperty(document, 'querySelector', {
    value: jest.fn(() => document.createElement('meta')),
})
