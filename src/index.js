import { connect } from 'react-redux';
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