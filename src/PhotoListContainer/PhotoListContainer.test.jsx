import React from 'react';
import ReactDOM from 'react-dom';
import PhotoListContainer from './PhotoListContainer';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PhotoListContainer />, div);
});

describe("hasSearchReturned", () => {

    it("should return false when no search was done", () => {
        const component = new PhotoListContainer();
        expect(component.hasSearchReturned()).toBe(false);
    });

});


