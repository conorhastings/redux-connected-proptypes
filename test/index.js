import test from 'tape-catch';
import React, { Component, PropTypes } from 'react';
import { findRenderedComponentWithType, renderIntoDocument } from 'react-addons-test-utils';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import connectProps from '../dist';

class Animals extends Component {
	render() {
		const { animals } = this.props;
		return (
			<div>
			    <ul>
			      {animals.map((animal) => {
			        return <li key={animal}>{animal}</li>
			      })}
			    </ul>
			</div>
		);
	}
}


Animals.propTypes = {
  animals: PropTypes.array.isRequired
};

const ConnectedAnimals = connectProps(Animals);

const reducer = (state = {animals: ['cats', 'dogs', 'birds'], name: 'sweet'}, action) => {
	return state;
}

const store = createStore(reducer);
class Root extends Component {
	render() {
		return <Provider store={store}><ConnectedAnimals /></Provider>;
	}
}

test('component recieves animals prop through connected propType', assert => {
	const tree = renderIntoDocument(<Root />);
	const component = findRenderedComponentWithType(tree, ConnectedAnimals);
	assert.ok(component.renderedElement.props.animals !== undefined, 'animals prop exists');
	assert.end();
});

test('component does not receive name prop from store that is not defined in propType', assert => {
	const tree = renderIntoDocument(<Root />);
	const component = findRenderedComponentWithType(tree, ConnectedAnimals);
	assert.ok(component.renderedElement.props.name === undefined, 'name prop does not exist');
	assert.end();
});

class AnimalsWithName extends Component {
	render() {
		const { animals, name } = this.props;
		return (
			<div>	
				<h1>{name}</h1>
			    <ul>
			      {animals.map((animal) => {
			        return <li key={animal}>{animal}</li>
			      })}
			    </ul>
			</div>
		);
	}
}

AnimalsWithName.propTypes = {
  animals: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired
};

const ConnectedAnimalsWithName = connectProps(AnimalsWithName);

class RootWithName extends Component {
	render() {
		return <Provider store={store}><ConnectedAnimalsWithName /></Provider>;
	}
}

test('component recieves animals and name prop through connected propType', assert => {
	const tree = renderIntoDocument(<RootWithName />);
	const component = findRenderedComponentWithType(tree, ConnectedAnimalsWithName);
	console.log(component.renderedElement.props);
	assert.ok(component.renderedElement.props.animals !== undefined, 'animals prop exists');
	assert.ok(component.renderedElement.props.name !== undefined, 'name prop does exist');
	assert.end();
});

const ConnectedAnimalsWithNameIgnored = connectProps(AnimalsWithName, ['name']);

class RootWithNameIgnored extends Component {
	render() {
		return <Provider store={store}><ConnectedAnimalsWithNameIgnored /></Provider>;
	}
}

test('component recieves animals but name through connected propType if name is ignored', assert => {
	const tree = renderIntoDocument(<RootWithNameIgnored />);
	const component = findRenderedComponentWithType(tree, ConnectedAnimalsWithNameIgnored);
	console.log(component.renderedElement.props);
	assert.ok(component.renderedElement.props.animals !== undefined, 'animals prop exists');
	assert.ok(component.renderedElement.props.name === undefined, 'name prop does not exist');
	assert.end();
});
