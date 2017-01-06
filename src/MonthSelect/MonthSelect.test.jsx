import React from 'react';
import renderer from 'react-test-renderer';
import MonthSelect from './MonthSelect';

it('should match the snapshot', () => {
  const component = renderer.create(<MonthSelect />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

