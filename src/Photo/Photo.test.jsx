import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import renderer from 'react-test-renderer';
import Photo from './Photo';

it('renders without crashing', () => {
  const testUtilsRendered = ReactTestUtils.createRenderer();
  testUtilsRendered.render(<Photo />);
  const result = testUtilsRendered.getRenderOutput();
  expect(result.type).toBe('div');
});

it('should match the snapshot', () => {
  const component = renderer.create(
    <Photo
      linkUrl="https://www.flickr.com/photos/21668212@N02/25277702294"
      snapshotUrl="https://farm2.staticflickr.com/1658/25277702294_3514fc66de.jpg"
      title="alpagas at sajama"
      dateTakenFormatted="April 1, 2015"/>
      );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
