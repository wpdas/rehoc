import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow, mount } from 'enzyme';
import UserData from './UserData';
import userState from '../../states/user-state';

// Init Rehoc with app states
import '../../tests/initRehoc';

configure({ adapter: new Adapter() });

describe('<UserData /> connected to Rehoc', () => {
  it('should be able to get state data like firstName, lastName and picture', () => {
    const wrapper = shallow(<UserData />);

    //Testing props managed by Rehoc
    const userDataProps = wrapper.props().userState;
    expect(userDataProps.firstName).toBeDefined();
    expect(userDataProps.lastName).toBeDefined();
    expect(userDataProps.picture).toBeDefined();
    expect(userDataProps.firstName).toBe(userState.firstName);
    expect(userDataProps.lastName).toBe(userState.lastName);
    expect(userDataProps.picture).toBe(userState.picture);
  });

  it('should render firstName, lastName and picture', () => {
    const wrapper = mount(<UserData />);

    //Name and Picture
    expect(wrapper.find('div').children().length).toBe(2);
    expect(wrapper.find('span').text()).toBe('Name: Wenderson Silva');
    expect(wrapper.find('img').prop('src')).toBe(userState.picture);
  });
});
