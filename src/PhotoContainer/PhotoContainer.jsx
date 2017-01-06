import React, { Component } from 'react';
import axios from 'axios';
import Photo from '../Photo/Photo';
import FlickrPhotoWrapper from '../FlickrPhotoWrapper';
import { getPhotoInfoUrl } from '../FlickrURLs';

export default class PhotoContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            photoWrapper: null
        };
        this.getPhotoInfoFromFlickr = this.getPhotoInfoFromFlickr.bind(this);
    }

    componentDidMount() {
        this.getPhotoInfoFromFlickr(this.props.photoId);
    }

    getPhotoInfoFromFlickr(photoId) {
        const self = this;
        const infoUrl = getPhotoInfoUrl(photoId);
        axios.get(infoUrl)
            .then(infoResponse => self.handlePhotoInfoResponse(infoResponse))
            .catch(error => console.log(error));
    }

    handlePhotoInfoResponse(infoResponse) {
        const photoWrapper = new FlickrPhotoWrapper(infoResponse.data);
        if (photoWrapper.isDateTakenKnown()) {
            this.setState({
                photoWrapper: photoWrapper
            });
        }
    }

    render() {

        let componentToRender = null;
        if (this.state.photoWrapper !== null) {
            componentToRender = <Photo id={this.state.photoWrapper.photo.id}
                snapshotUrl={this.state.photoWrapper.getSnapshotUrl()} linkUrl={this.state.photoWrapper.getLinkUrl()}
                dateTakenFormatted={this.state.photoWrapper.getDateTakenFormatted()} 
                title={this.state.photoWrapper.getTitle()} />;
        }

        return (componentToRender);
    }

};