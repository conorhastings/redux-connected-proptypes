## Redux Connected PropTypes

`propTypes` are a great development tool in `React`. `Redux` is an amazing module for maintaining a single global state for your application. Why not use both together? *Redux Connected PropTypes* consumes a `React` Component(with propTypes) and returns a `connected` version of that component in `react-redux` parlance with the props defined on the compoents `propTypes` injected into the component instance from the redux global state.

**NOTE: ONLY WORKS WITH ES6 CLASS COMPONENTS AND FUNCTIONAL COMPONENTS**

[![Circle CI](https://circleci.com/gh/conorhastings/redux-connected-proptypes.svg?style=svg)](https://circleci.com/gh/conorhastings/redux-connected-proptypes)

### Install

`npm i redux-connected-proptypes --save`

### Args
1. **`component`** - the React Component with propTypes defined to be injected from global redux state.
2. **`ignored`** - an optional array of propType definitions that you do not want injected from global state. 

### How To Use
**For a more in depth example see <a href="https://github.com/conorhastings/redux-proptypes-connect">here</a>**

This example assumes you are using redux and have rendered your app wrapped in `Provider`

```js
import React from 'react';
import reduxConnectedPropTypes from 'redux-connected-proptypes';

const Animals = ({animals}) => {
  return (
    <ul>
      {animals.map((animal) => {
        return <li key={animal}>{animal}</li>
      })}
    </ul>
  );
}

Animals.propTypes = {
  animals: React.PropTypes.array.isRequired
};

export default reduxConnectedPropTypes(Animals);
```

