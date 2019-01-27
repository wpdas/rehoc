import { setStates } from 'rehoc';
import userState from '../states/user-state';
import locationState from '../states/location-state';

//Start states
describe('Initialize Rehoc states', () => {
  it('Should set states without errors', () => {
    setStates({
      userState,
      locationState
    });
  });
});
