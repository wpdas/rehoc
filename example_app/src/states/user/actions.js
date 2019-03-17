import { getStore } from 'rehoc';

export const getUserData = () => {
  return getStore().userState;
};
