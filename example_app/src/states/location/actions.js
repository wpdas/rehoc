import { getStore, updateState } from 'rehoc';

const stateName = 'locationState';

// Return current Location state
export const getLocation = () => {
  return getStore().locationState;
};

// Set new location
export const setLocation = newlocation => {
  updateState(stateName, { location: newlocation });
};
