import { connect } from 'react-redux';

/**
 * Takes in propTypes to be injected into components, returns function to be passed to react-redux connect
 * 
 * @param {array} propTypes - the props to inject into component
 * @returns {function} function to be passed to `connect` that informs slice of state to take from global state.
 */
const mapProps = (propTypes) => {
  return state => {
    return propTypes.reduce((props, type) => {
      props[type] = state[type];
      return props;
    }, {});
  };
};

/**
 * Takes in a React Component and returns connected Component with props defined on propTypes
 * injected into the Component
 * 
 * @param {React Component} component - the React Component to have props injected
 * @param {array} [ignored] - optional paramter specifying keys defined on propTypes to not inject from
 * global state
 * @returns {React Component} returns React Component with props injected subscribed to change from 
 * global redux state.
 */
export default function reduxConnectedPropTypes(component, ignored = []) {
  const propTypes = Object.keys(component.propTypes).filter(prop => ignored.indexOf(prop) === -1);
  return connect(mapProps(propTypes))(component);
}