import { getStore } from 'rehoc';

//Extracting state
export const extractData = () => {
  return getStore().userState;
};
