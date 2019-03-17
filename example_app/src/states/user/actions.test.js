import { updateState } from 'rehoc';
import * as userDataActions from './actions';
import userState from './state';

// Init Rehoc with app states
import '../../tests/initRehoc';

describe('Init app using Rehoc', () => {
  it('Get user data. It should have the same body as its initial state has.', () => {
    expect(userDataActions.getUserData()).toBe(userState);
  });

  it("Should update the userState by using the Rehoc's updateState.", () => {
    const newFirstName = 'Guliver';
    expect(userDataActions.getUserData()).toBe(userState);
    expect(userDataActions.getUserData().firstName).toBe(userState.firstName);
    updateState('userState', { firstName: newFirstName });
    expect(userDataActions.getUserData().firstName).toBe(newFirstName);
  });
});
