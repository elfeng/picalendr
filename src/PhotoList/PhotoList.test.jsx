import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import PhotoList from './PhotoList';

it('should render a span when no photos are passed', () => {
  const renderer = ReactTestUtils.createRenderer();

  renderer.render(<PhotoList photoList={[]} />);

  const result = renderer.getRenderOutput();
  expect(result.type).toBe("span");
});

it('should render a div when photos are passed', () => {
  const renderer = ReactTestUtils.createRenderer();
  const testPhoto = {
      id: 1
  }

  renderer.render(<PhotoList photoList={[testPhoto]} />);
  
  const result = renderer.getRenderOutput();
  expect(result.type).toBe("div");
});