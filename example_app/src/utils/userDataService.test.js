import * as userDataService from './userDataService';
import userState from '../states/user-state';

// Init Rehoc with app states
import '../tests/initRehoc';

describe('Init app using Rehoc', () => {
  it('extract all the userData from its state', () => {
    expect(userDataService.extractData()).toBe(userState);
  });
});
