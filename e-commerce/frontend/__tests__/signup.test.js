import Signup from '../components/Signup';

import { mount } from 'enzyme';
import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import "regenerator-runtime/runtime.js";

configure({ adapter: new Adapter() });

// signup test
describe('<Signup /> Component', () => {
  
    it("changes the class of the inputs based on validation", () => {

        const wrapper = mount(
        
            <Signup />
            
        );

        // default class is invalid
        // checking if email input changes the class to ''
        wrapper.find('#email-test').props().onChange({ target: { name: 'email', value: 'test@test.com' }});
        wrapper.update();
        let inputEmail = wrapper.find('input').at(0).props().className;

        expect(inputEmail).toBe('');

        // checking if email input changes the class back to 'invalid'
        wrapper.find('#email-test').props().onChange({ target: { name: 'email', value: 'test' }})
        wrapper.update();
        inputEmail = wrapper.find('input').at(0).props().className;

        expect(inputEmail).toEqual('invalid');

        // name should not be empty
        // checking if the class changes to ''
        wrapper.find('#name-test').props().onChange({ target: { name: 'name', value: 'test' }});
        wrapper.update();
        let inputName = wrapper.find('input').at(1).props().className;

        expect(inputName).toBe('');

        // checking if the name input changes the class back to 'invalid'
        wrapper.find('#name-test').props().onChange({ target: { name: 'name', value: '' }});
        wrapper.update();
        inputName = wrapper.find('input').at(1).props().className;

        expect(inputName).toEqual('invalid');

        // password should be at least 5 characters
        // checking if class is ''
        wrapper.find('#password-test').props().onChange({ target: { name: 'password', value: '12345' }});
        wrapper.update();
        let inputPassword = wrapper.find('input').at(2).props().className;

        expect(inputPassword).toBe('');

        // checking if password changes the class back to invalid
        wrapper.find('#password-test').props().onChange({ target: { name: 'password', value: '123' }});
        wrapper.update();
        inputPassword = wrapper.find('input').at(2).props().className;

        expect(inputPassword).toEqual('invalid');

        // checking if confirmPassword changes the class to '' (it happens only if password and confirmPassword match)
        wrapper.find('#password-test').props().onChange({ target: { name: 'password', value: '12345' }});
        wrapper.find('#confirmPassword-test').props().onChange({ target: { name: 'confirmPassword', value: '12345' }});
        wrapper.update();

        let inputConfirmPassword = wrapper.find('input').at(3).props().className;

        expect(inputConfirmPassword).toBe('');

        // checking if confirmPassword changes the class back to 'invalid'
        wrapper.find('#password-test').props().onChange({ target: { name: 'password', value: '12345' }});
        wrapper.find('input').at(3).props().onChange({ target: { name: 'confirmPassword', value: '123456' }});
        wrapper.update();

        inputConfirmPassword = wrapper.find('input').at(3).props().className;

        expect(inputConfirmPassword).toEqual('invalid');

    });  

    it("shows signING up on button and h1 when state loading is true", () => {

        let wrapper = mount(

            <Signup />

        );

        wrapper.setState({ loading: true });
        const h1 = wrapper.find('#h1-test').html();
        const button = wrapper.find('#button-test').html();
        wrapper.update();

        expect(h1).toEqual('<h1 id="h1-test">Signing Up For An Account</h1>');
        expect(button).toEqual('<button id="button-test">Signing Up!</button>');

    });

    it("shows an error message if one of the input is wrong", () => {

        const wrapper = mount(

            <Signup />

        );

        // checking if it shows an error message for the email
        wrapper.find('#email-test').props().onChange({ target: { name: 'email', value: 'test' }});
        wrapper.update();
        const errorEmail = wrapper.children(0).find('#error-test').html();
        
        expect(errorEmail).toBe('<p id="error-test">Invalid email: please enter a valid email</p>');

        // simulating email input with a valid email so that I can find the error of the password
        wrapper.find('#email-test').props().onChange({ target: { name: 'email', value: 'test@test.com' }});
        wrapper.update();

        // checking if it shows an error message for the password (password needs to be at least 5 characters)
        wrapper.find('#password-test').props().onChange({ target: { name: 'password', value: '123' }});
        wrapper.update();
        const errorPassword = wrapper.children(0).find('#error-test').html();

        expect(errorPassword).toEqual('<p id="error-test">Invalid password: password is too short</p>');

        // simulating password input with a valid password so that I can find the error of the confirmPassword
        wrapper.find('#password-test').props().onChange({ target: { name: 'password', value: '12345' }});
        wrapper.update();

        // confirmPassword needs to be like password that right now is '12345'
        wrapper.find('#confirmPassword-test').props().onChange({ target: { name: 'confirmPassword', value: '123456'}});
        wrapper.update();
        const errorConfirmPassword = wrapper.children(0).find('#error-test').html();

        expect(errorConfirmPassword).toEqual('<p id="error-test">Invalid Input: passwords do not match!</p>');

        // simulating confirmPassword input with a valid input so that I can find the error of the name
        wrapper.find('#confirmPassword-test').props().onChange({ target: { name: 'confirmPassword', value: '12345' }});
        wrapper.update();

        // last check with name input (name should NOT be empty)
        wrapper.find('#name-test').props().onChange({ target: { name: 'name', value: '' }});
        wrapper.update();
        const errorName = wrapper.children(0).find('#error-test').html();

        expect(errorName).toEqual('<p id="error-test">Invalid name: please enter your name</p>')

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