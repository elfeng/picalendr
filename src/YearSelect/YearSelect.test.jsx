import React from 'react';
import renderer from 'react-test-renderer';
import { YearSelect } from './YearSelect';

it('should match the snapshot', () => {
  const component = renderer.create(<YearSelect />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

