import { getStore } from 'rehoc';

export const extractData = () => {
  return getStore().userState;
};
