import React from 'react';
import ReactDOM from 'react-dom';
import PhotoContainer from './PhotoContainer';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PhotoContainer />, div);
});

describe("getPhotoDetailsFromFlickr", () => {

  let component = new PhotoContainer();

  it("should get the photo details given an existing id", () => {
    return component.getPhotoDetailsFromFlickr("25277702294").then((photoWrapper) => {
      expect(photoWrapper.isDateTakenKnown()).toBe(true);
    });
  })

  it("should not get the photo details given an unknown id", () => {
    return component.getPhotoDetailsFromFlickr("-1").then((photoWrapper) => {
      expect(photoWrapper.photo).toBe(undefined);
    });
  })

});