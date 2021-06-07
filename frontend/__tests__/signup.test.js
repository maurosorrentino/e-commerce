import Signup from '../components/Signup';

import { mount } from 'enzyme';
import React from 'react';
import configure from './configure/config';

// signup test
describe('<Signup /> Component', () => {
  
    it("changes the class of the inputs based on validation", () => {

        global.fetch = jest.fn(() => Promise.resolve());

        const wrapper = mount(
        
            <Signup />
            
        );

        // default class is invalid
        // checking if email input changes the class to ''
        wrapper.setState({ message: '' });
        wrapper.update();
        let inputEmail = wrapper.find('#email-test').props().className;

        expect(inputEmail).toBe('');

        // checking if email input changes the class back to 'invalid'
        wrapper.setState({ message: 'Invalid email' });
        wrapper.update();
        inputEmail = wrapper.find('#email-test').props().className;

        expect(inputEmail).toEqual('invalid');

        // checking if the class changes to ''
        wrapper.setState({ message: '' })
        wrapper.update();
        let inputName = wrapper.find('#name-test').props().className;

        expect(inputName).toBe('');

        // checking if the name input changes the class back to 'invalid'
        wrapper.setState({ message: 'please enter your name' });
        wrapper.update();
        inputName = wrapper.find('#name-test').props().className;

        expect(inputName).toEqual('invalid');

        // checking if class is ''
        wrapper.setState({ message: '' });
        wrapper.update();
        let inputPassword = wrapper.find('#password-test').props().className;

        expect(inputPassword).toBe('');

        // checking if password changes the class back to invalid
        wrapper.setState({ message: 'password needs to be at least 5 characters' });
        wrapper.update();
        inputPassword = wrapper.find('#password-test').props().className;

        expect(inputPassword).toEqual('invalid');

        // checking if confirmPassword changes the class to '' 
        wrapper.setState({ message: '' });
        wrapper.update();

        let inputConfirmPassword = wrapper.find('#confirmPassword-test').props().className;

        expect(inputConfirmPassword).toBe('');

        // checking if confirmPassword changes the class back to 'invalid'
        wrapper.setState({ message: 'passwords do not match' });
        wrapper.update();

        inputConfirmPassword = wrapper.find('#confirmPassword-test').props().className;

        expect(inputConfirmPassword).toEqual('invalid');

    });  

    it("shows signING up on button and h1 when state loading is true", () => {

        global.fetch = jest.fn(() => Promise.resolve());

        let wrapper = mount(

            <Signup />

        );

        wrapper.setState({ loading: true });
        const h1 = wrapper.find('#h1-test').text();
        const button = wrapper.find('#button-test').text();
        wrapper.update();

        expect(h1).toEqual('Signing Up For An Account');
        expect(button).toEqual('Signing Up!');

    });

    it("shows an error message if one of the input is wrong", () => {

        global.fetch = jest.fn(() => Promise.resolve());

        const wrapper = mount(

            <Signup />

        );

        // checking if error message is shown on email
        wrapper.setState({ message: 'Invalid email' });
        wrapper.update();
        const errorEmail = wrapper.children().find('#error-test').text();
        
        expect(errorEmail).toBe('Invalid email');

        // checking if error message is shown on password
        wrapper.setState({ message: 'password needs to be at least 5 characters' });
        wrapper.update();
        const errorPassword = wrapper.children().find('#error-test').text();

        expect(errorPassword).toEqual('password needs to be at least 5 characters');

        // checking if error message is shown on confirm password
        wrapper.setState({ message: 'passwords do not match' });
        wrapper.update();
        const errorConfirmPassword = wrapper.children().find('#error-test').text();

        expect(errorConfirmPassword).toEqual('passwords do not match');

        // checking if error message is shown on name
        wrapper.setState({ message: 'please enter your name' });
        wrapper.update();
        const errorName = wrapper.children().find('#error-test').text();

        expect(errorName).toEqual('please enter your name')

    });
    
});
/*
let wrapper = mount(<Signup />);

const confirmPasswordValidState = wrapper.state('confirmPasswordValid'); // default false

expect(confirmPasswordValidState).toEqual(false); // it passes

wrapper = wrapper.update();        

wrapper.find('#password-test').props().onChange({ target: { name: 'password', value: 'maurosorrentino' }});

wrapper.find('#confirmPassword-test').props().onChange({ target: { name: 'confirmPassword', value: 'maurosorrentino' }});

const confirmPasswordValidState2 = wrapper.state('confirmPasswordValid');

wrapper = wrapper.update();

expect(confirmPasswordValidState2).toBeTruthy();

wrapper.find('#password-test').props().onChange({ target: { name: 'password', value: 'maurosorrentino' }});

wrapper.find('#confirmPassword-test').props().onChange({ target: { name: 'confirmPassword', value: 'aaaaaaaa' }});

const confirmPasswordValidState3 = wrapper.state('confirmPasswordValid');

wrapper.update();

expect(confirmPasswordValidState3).toBeFalsy(); */

/* 
it("signs the user up if all the inputs are correct", async () => {

    const wrapper = mount(

        <Signup />

    );

    const fakeEvent = { preventDefault: () => console.log('fake event prevent default' )};
    global.fetch = jest.fn(() => Promise.resolve());

    const fakeUser = { email: 'test@test.com', name: 'test', password: 'password', confirmPassword: 'password' };

    wrapper.find('input').at(0).props().onChange({ target: { name: 'email', value: 'test@test.com' }});
    wrapper.find('input').at(1).props().onChange({ target: { name: 'name', value: 'test' }});
    wrapper.find('input').at(2).props().onChange({ target: { name: 'password', value: 'password' }});
    wrapper.find('input').at(3).props().onChange({ target: { name: 'confirmPassword', value: 'paword' }});
    wrapper.find('.signUp-form-test').at(0).props().onSubmit(fakeEvent);

    await wait();
    wrapper.update();

    const user = wrapper.instance();
    
    expect(fakeUser).toMatchObject(user)

}); */