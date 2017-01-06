import React from 'react';
import './Photo.css';

export default function Photo(props) {
    return (
        <div className="photo">
            <a href={props.linkUrl}>
                <img src={props.snapshotUrl} alt={props.title}/>
                <div>
                    Taken on: {props.dateTakenFormatted}
                </div>
            </a>
        </div>
    );

};