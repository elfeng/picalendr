import React, { Component } from 'react';
import PhotoContainer from '../PhotoContainer/PhotoContainer';

const NB_PHOTOS_TO_DOWNLOAD = 10;

export default class PhotoList extends Component {

    constructor(props) {
        super(props);
        this.photoContainers = [];
        this.state = {
            photoContainers: []
        };
        this.showMorePhotos = this.showMorePhotos.bind(this);
    }

    getNumberOfPhotosRemaining() {
        return this.props.photoList.length - this.state.photoContainers.length;
    }

    componentDidMount(){
        this.showMorePhotos();
    }

    getNextLastPhotoIndex() {
        const nbPhotosRemaining = this.getNumberOfPhotosRemaining();
        const lastPhotoIndex = this.state.photoContainers.length;
        if (nbPhotosRemaining > NB_PHOTOS_TO_DOWNLOAD) {
            return lastPhotoIndex + NB_PHOTOS_TO_DOWNLOAD;
        } else if (nbPhotosRemaining > 0) {
             return lastPhotoIndex + nbPhotosRemaining;
        } else {
            return lastPhotoIndex;
        }
    }

    showMorePhotos() {
        const lastPhotoIndex = this.getNextLastPhotoIndex();
        for (let i = this.state.photoContainers.length; i < lastPhotoIndex; i++) {
            const photo = this.props.photoList[i];
            this.photoContainers.push(<PhotoContainer key={photo.id} photoId={photo.id} />)
        }
        this.setState({
            photoContainers: this.photoContainers
        })
    }

    render() {

        if (this.props.photoList.length === 0) {
            return (<span>No photo found</span>);
        } else {
            let morePhotosButton = null;
            if (this.getNumberOfPhotosRemaining() > 0) {
                morePhotosButton = <button onClick={this.showMorePhotos} className="btn btn-default">Show more photos</button>;
            }

            return (
                <div>
                    { this.state.photoContainers }
                    { morePhotosButton }
                </div>
            );
        }


    }


};