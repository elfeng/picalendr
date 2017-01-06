import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import Photo from './Photo';

it('renders without crashing', () => {
  const renderer = ReactTestUtils.createRenderer();
  renderer.render(<Photo />);
  const result = renderer.getRenderOutput();

  expect(result.type).toBe('div');
});
