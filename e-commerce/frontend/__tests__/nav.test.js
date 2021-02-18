/* import { mount, configure } from 'enzyme';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import "regenerator-runtime/runtime.js";

import Nav from '../components/Nav';

configure({ adapter: new Adapter() });

describe('<Nav />', () => {

    it("navigates to the right pages when user clicks on a nav link", () => {

        const wrapper = mount(

            <Nav />

        );

        wrapper.find('#shop').at(0).simulate('click');
        wrapper.update();

        const href = window.location.href;

        expect(href).toEqual('http://test.com');

    });
    
}); */