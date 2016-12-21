import React from 'react';
import PhotoContainer from './PhotoContainer.jsx';

export default function PhotoList(props) {

    return (
        <div>
            { props.photoList.map(photo => <PhotoContainer key={photo.id} photo={photo} />) }
        </div>
    );
    
};