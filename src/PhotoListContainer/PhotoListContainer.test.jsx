import React from 'react';
import ReactDOM from 'react-dom';
import PhotoListContainer from './PhotoListContainer';
import { TWELVE_MONTHS } from '../Month.js';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PhotoListContainer month={TWELVE_MONTHS[0]} year={2017}/>, div);
});

describe("hasSearchReturned", () => {

    it("should return false when no search was done", () => {
        const component = new PhotoListContainer();
        expect(component.hasSearchReturned()).toBe(false);
    });

});
