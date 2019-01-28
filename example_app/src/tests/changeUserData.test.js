import * as userDataService from '../utils/userDataService';
import userState from '../states/user-state';
import { updateState } from 'rehoc';

// Init Rehoc with app states
import '../tests/initRehoc';

describe('Using updateState to update state - Rehoc', () => {
  it('should update the userState', () => {
    const newFirstName = 'Guliver';
    expect(userDataService.extractData()).toBe(userState);
    expect(userDataService.extractData().firstName).toBe(userState.firstName);
    updateState('userState', { firstName: newFirstName });
    expect(userDataService.extractData().firstName).toBe(newFirstName);
  });
});
