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
 * @param {string} componentStateToConnect State name that will be connected to this Component (optional)
 */
export const connect = (ChildWrappedComponent, componentStateToConnect) => {
  if (!ChildWrappedComponent) {
    throw new Error(
      'Rehoc --> You must pass a Component as the first parameter!'
    );
  }

  return class extends React.Component {
    render() {
      let updatedProps;
      if (componentStateToConnect) {
        const mainState = store[componentStateToConnect];
        updatedProps = {
          ...this.props,
          ...mainState
        };
      } else {
        updatedProps = {
          ...this.props,
          ...store
        };
      }

      return <ChildWrappedComponent {...updatedProps} />;
    }
  };
};

/**
 * Updates the state body by stateName
 * Example: updateState('stateA', {}, true);
 * @param {String} stateName
 * @param {Object} updatedObject
 * @param {Boolean} shouldComponentUpdate
 */
export const updateState = (
  stateName,
  updatedObject,
  shouldComponentUpdate = true
) => {
  // Cheking if state exists into store
  if (store.hasOwnProperty(stateName)) {
    // Checking body integrity
    let unknowKeys = [];
    const itsSameBody = Object.keys(updatedObject).reduce(
      (previous, current) => {
        if (Object.keys(store[stateName]).indexOf(current) === -1) {
          unknowKeys.push(current);
        }
        return !!store[stateName][current] && previous;
      },
      true
    );

    // State body errors
    if (!itsSameBody && !!unknowKeys.length) {
      if (unknowKeys.length === 1) {
        throw new Error(
          `Rehoc --> The attribute "${
            unknowKeys[0]
          }" wasn't found into ${stateName} State.`
        );
      } else {
        throw new Error(
          `Rehoc --> The attributes \"${unknowKeys.join(
            '", "'
          )}\" were't found into ${stateName} State.`
        );
      }
    } else {
      // Update the main store
      store[stateName] = {
        ...store[stateName],
        ...updatedObject
      };

      //Re-render
      if (onUpdateStoreHandler && shouldComponentUpdate) onUpdateStoreHandler();
    }
  } else {
    throw new Error(
      `Rehoc --> The State "${stateName}" wasn't found into list states.`
    );
  }
};

/**
 * Return store containing all states
 */
export const getStore = () => store;
