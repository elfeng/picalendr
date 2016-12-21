import React from 'react';
import moment from 'moment';
import './Photo.css';

export function formatDateTaken(dateTakenAsSeconds) {
    const dateTaken = moment(dateTakenAsSeconds * 1000);
    return dateTaken.format('LL');
}

export default function Photo(props) {
    return (
        <div className="photo">
            <img src={props.url} alt={props.search}/>
            <div>
                Taken on: {formatDateTaken(props.dateTaken)}
            </div>
        </div>
    );

};