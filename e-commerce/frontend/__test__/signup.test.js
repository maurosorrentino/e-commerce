import Signup from '../components/Signup';
import { shallow, mount } from 'enzyme';
import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

// signup test
describe('<Sign Up />', () => {

    it('signs the user up if all the inputs are correct', () => {

        const fakeUser = { email: 'test@test.com', name: 'mauro', password: 'maurosorrentino' };

        const fakeEvent = { preventDefault: () => console.log('preventDefault' )}

        let wrapper = mount(<Signup />);
        global.fetch = jest.fn(() => Promise.resolve());

        const email = { target: { value: 'test@test.com' }};
        const password = { target: { value: 'maurosorrentino' }};
        const confirmPassword = { target: { value: 'maurosorrentino' }};
        const name = { target: { value: 'mauro' }}; 

        const simulateEvent = wrapper.find('.signUp-form').simulate('submit', fakeEvent);

        expect(fakeUser).toMatchObject(simulateEvent);

    });
    
}); 