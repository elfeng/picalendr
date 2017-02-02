import React from 'react';
import ReactDOM from 'react-dom';
import PhotoListContainer from './PhotoListContainer';
import { TWELVE_MONTHS } from '../Month.js';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PhotoListContainer month={TWELVE_MONTHS[0]} year={2017}/>, div);
});

describe("searchFlickr", () => {

  const march = TWELVE_MONTHS[2];
  let component = new PhotoListContainer();

  it("should get photos for Tokyo in march 2014", () => {
    return component.searchFlickr("Tokyo", march, 2014).then((searchResponse) => {
      expect(searchResponse.data.photos.photo.length).not.toBe(0);
    });
  })

  it("should not get photos for an unknown place", () => {
    return component.searchFlickr("X1e9T5C5P1f", march, 2014).then((searchResponse) => {
      expect(searchResponse.data.photos.photo.length).toBe(0);
    });
  })

});
