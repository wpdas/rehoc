import React from 'react';

let store = null;
let onUpdateStoreHandler;

/**
 * Init Rehoc
 * @param {React.Component} WrappedComponent
 */
export const rehoc = WrappedComponent => {
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
      return <WrappedComponent {...this.props} />;
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
  } else {
    throw new Error('Rehoc --> You can not call setState more than once.');
  }
};

/**
 * Creates a connection between states and component
 * @param {React.Component} ChildWrappedComponent
 */
export const connect = ChildWrappedComponent => {
  return class extends React.Component {
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
 * Example: updateState('stateA', {}, true);
 * @param {String} stateKey
 * @param {Object} updatedObject
 * @param {Boolean} shouldComponentUpdate
 */
export const updateState = (
  stateKey,
  updatedObject,
  shouldComponentUpdate = true
) => {
  // Cheking if state exists into store
  if (store.hasOwnProperty(stateKey)) {
    // Checking body integrity
    let unknowKeys = [];
    const itsSameBody = Object.keys(updatedObject).reduce(
      (previous, current) => {
        if (Object.keys(store[stateKey]).indexOf(current) === -1) {
          unknowKeys.push(current);
        }
        return !!store[stateKey][current] && previous;
      },
      true
    );

    // State body errors
    if (!itsSameBody && !!unknowKeys.length) {
      if (unknowKeys.length === 1) {
        throw new Error(
          `Rehoc --> The attribute "${
            unknowKeys[0]
          }" wasn't found into ${stateKey} State.`
        );
      } else {
        throw new Error(
          `Rehoc --> The attributes \"${unknowKeys.join(
            '", "'
          )}\" were't found into ${stateKey} State.`
        );
      }
    } else {
      // Update the main store
      store[stateKey] = {
        ...store[stateKey],
        ...updatedObject
      };

      //Re-render
      if (onUpdateStoreHandler && shouldComponentUpdate) onUpdateStoreHandler();
    }
  } else {
    throw new Error(
      `Rehoc --> The State "${stateKey}" wasn't found into list states.`
    );
  }
};

/**
 * Return store containing all states
 */
export const getStore = () => store;
