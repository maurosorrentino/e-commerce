import configure from './configure/config';
import { mount } from 'enzyme';
import React from 'react';

import Login from '../components/Login';

describe('<Login /> Component', () => {

    it("changes the class based on validation", () => {

        global.fetch = jest.fn(() => Promise.resolve());

        const wrapper = mount(

            <Login />

        );

        // simulate doesn't seem to work so I am changing the state so that I can check if the class name changes (validation is based on the message that we return)
        wrapper.setState({ email: 'test@test', message: 'There is no account into our database with this email: test@test' });
        wrapper.update();
        let emailInput = wrapper.find('#email-test').props().className;

        expect(emailInput).toBe('invalid');

        // changing back the class name to ''
        wrapper.setState({ email: 'test@test.com', message: '' });
        wrapper.update();
        emailInput = wrapper.find('#email-test').props().className;

        expect(emailInput).toEqual('');

        // changing the state for the password
        wrapper.setState({ message: 'invalid password, please try again' });
        wrapper.update();

        let passwordInput = wrapper.find('#password-test').props().className;

        expect(passwordInput).toBe('invalid');

        // changing the state again so that the class is an empty string
        wrapper.setState({ message: '' });
        wrapper.update();

        passwordInput = wrapper.find('#password-test').props().className;

        expect(passwordInput).toEqual('');
    });
});