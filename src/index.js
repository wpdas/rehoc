import React from 'react';

let store = null;
let InternalProvider;
let onUpdateStoreHandler;

/**
 * Init Rehoc
 * @param {React.Component} WrappedComponent
 */
export const rehoc = WrappedComponent => {
  verifyBuild();
  return class extends React.Component {
    render() {
      return (
        <InternalProvider value={store}>
          <WrappedComponent {...this.props} />
        </InternalProvider>
      );
    }
  };
};

/**
 * Set states
 * Example: setStates({stateA:{}, stateB:{}})
 * @param  {Object} state
 */
export const setStates = (...state) => {
  if (!store) {
    store = { ...state[0] };
    verifyBuild();
  } else {
    throw new Error('You can not setState more than once.');
  }
};

/**
 * Creates a connection between states and component
 * @param {React.Component} ChildWrappedComponent
 */
export const connect = ChildWrappedComponent => {
  verifyBuild();

  return class extends React.Component {
    constructor(props) {
      super(props);
      this.onUpdateStoreHandler = this.onUpdateStoreHandler.bind(this);
      onUpdateStoreHandler = () => {
        this.onUpdateStoreHandler();
      };
    }

    onUpdateStoreHandler() {
      this.forceUpdate();
    }

    render() {
      const updatedProps = {
        ...this.props,
        ...store
      };
      return <ChildWrappedComponent {...updatedProps} />;
    }
  };
};

/**
 * Updates the state body by stateKey
 * Example: updateState('stateA', {});
 * @param {String} stateKey
 * @param {Object} updatedObject
 */
export const updateState = (stateKey, updatedObject) => {
  if (store.hasOwnProperty(stateKey)) {
    store[stateKey] = {
      ...store[stateKey],
      ...updatedObject
    };

    if (onUpdateStoreHandler) onUpdateStoreHandler();
  } else {
    throw new Error(`${stateKey} wasn't found into states.`);
  }
};

/**
 * Return store containing all states
 */
export const getStore = () => store;

const verifyBuild = () => {
  if (!InternalProvider) {
    const { Provider } = React.createContext();
    InternalProvider = Provider;
  }
};
