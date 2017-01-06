import React from 'react';
import PhotoContainer from '../PhotoContainer/PhotoContainer';

export default function PhotoList(props) {

    return (
        props.photoList.length > 0 ?
            <div>
                {
                    props.photoList.map(photo => <PhotoContainer key={photo.id} photoId={photo.id} />)
                }
            </div>
            :
            <span>No photo found</span>
    );

};