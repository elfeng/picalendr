import React from 'react';

export default function PhotoList(props) {

    if (props.nbSearchResults === 0) {
        return (<span>No photo found</span>);

    } else {
        let morePhotosButton = null;
        if (props.nbSearchResults > props.photoContainers.length) {
            morePhotosButton = <button onClick={props.showMorePhotos} className="btn btn-default">Show more photos</button>;
        }

        return (
            <div>
                { props.photoContainers }
                { morePhotosButton }
            </div>
        );
    }
}