import React from 'react';
import ReactDOM from 'react-dom';
import PhotoContainer from './PhotoContainer';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PhotoContainer />, div);
});
