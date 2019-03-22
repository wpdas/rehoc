import React, { Component } from 'react';

// Globals
let onUpdateStateHandler;
let onGetStateHandler;
let store;

// Global Rehoc Context
export const RehocContext = React.createContext({});

/**
 * Init Rehoc
 * @param {React.Component} WrappedComponent
 */
export const rehoc = WrappedComponent => {
  return class extends Component {
    constructor(props) {
      super(props);

      this.updateContent = (propKey, updatedObject) => {
        this.setState(
          prevState => ({
            [propKey]: {
              ...prevState[propKey],
              ...updatedObject
            }
          }),
          () => {
            store = this.state;
          }
        );
      };

      this.getState = () => {
        return this.state;
      };

      // Set initial state by store data
      this.state = store;

      onUpdateStateHandler = this.updateContent;
      onGetStateHandler = () => {
        return this.state;
      };
    }

    render() {
      return (
        // Pass the entire state to the provider
        <RehocContext.Provider value={this.state}>
          <WrappedComponent />
        </RehocContext.Provider>
      );
    }
  };
};

/**
 * Set states. Store setter
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
 * Connector
 * Creates a connection between states and component
 * @param {React.Component} WrappedComponent
 * @param {string} stateKeyName State name that will be connected to this Component (optional)
 */
export const connect = (WrappedComponent, stateKeyName) => {
  if (!WrappedComponent) {
    throw new Error(
      'Rehoc --> You must pass a Component as the first parameter!'
    );
  }

  return class extends Component {
    render() {
      return (
        <RehocContext.Consumer>
          {states => {
            const updatedChildProps = states[stateKeyName];
            const childProps = {
              ...this.props,
              ...updatedChildProps
            };
            return <WrappedComponent {...childProps} />;
          }}
        </RehocContext.Consumer>
      );
    }
  };
};

/**
 * Updates the state body by stateName
 * Example: updateState('stateA', {});
 * @param {String} stateName
 * @param {Object} updatedObject
 */
export const updateState = (
  stateName,
  updatedObject,
  deprecated__shouldComponentUpdate
) => {
  if (deprecated__shouldComponentUpdate !== undefined) {
    console.warn(
      "Rehoc --> shouldComponentUpdate parameter is not being used anymore. It' was deprecated!"
    );
  }

  let currentStore = getStore();
  // Cheking if state exists into store
  if (currentStore.hasOwnProperty(stateName)) {
    // Checking body integrity
    let unknowKeys = [];
    const itsSameBody = Object.keys(updatedObject).reduce(
      (previous, current) => {
        if (Object.keys(currentStore[stateName]).indexOf(current) === -1) {
          unknowKeys.push(current);
        }
        return !!currentStore[stateName][current] && previous;
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
      //Re-render
      if (onUpdateStateHandler) {
        onUpdateStateHandler(stateName, updatedObject);
      }
    }
  } else {
    throw new Error(
      `Rehoc --> The State "${stateName}" wasn't found into list states.`
    );
  }
};

/**
 * Return store containing all most updated states
 */
export const getStore = () => {
  if (onGetStateHandler) {
    return onGetStateHandler();
  }

  return {};
};
