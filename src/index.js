import { connect } from 'react-redux';
/**
 * Takes in a React Component and returns connected Component with props defined on PropTypes
 * injected into the Component
 * 
 * @param {React Component} component - the React Component to have props injected
 * @param {array} [ignored] - optional paramter specifying keys defined on propTypes to not inject from
 * global state
 * @returns {React Component} returns React Component with props injected subscribed to change from 
 * global redux state.
 */
export default function reduxConnectedPropTypes(component, ignored = []) {
  const mapProps = state => {
    let props = {};
    const propTypes = Object.keys(component.propTypes);
    propTypes.forEach(type => {
      if (ignored.indexOf(type) === -1) {
        props[type] = state[type];
      }
    });
    return props;
  };
  return connect(mapProps)(component);
}