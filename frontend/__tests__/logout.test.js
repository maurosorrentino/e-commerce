/* import configure from './configure/config';
import { mount } from 'enzyme';
import React from 'react';
import cookie from 'react-cookies';

import Logout from '../components/Logout';
import Login from '../components/Login';

describe('Logout component', () => {

    it('logs the user out removing session and cookies', () => {

        const wrapperLogin = mount(

            <Login />

        );

        wrapperLogin.find('#email-test').props().onChange({ target: { name: 'email', value: 'test@test.com' }});
        wrapperLogin.find('#password-test').props().onChange({ target: { name: 'password', value: '123456' }});
        wrapperLogin.update();



        const tokenCookie = cookie.load('token');
        const authCookie = cookie.load('authCookie');
        const sessionCookie = cookie.load('connect.sid');

        expect(tokenCookie).toBe(null);

    });

}); */