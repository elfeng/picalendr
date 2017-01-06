import React, { Component } from 'react';
import axios from 'axios';
import Photo from '../Photo/Photo';
import FlickrPhotoWrapper from '../FlickrPhotoWrapper';
import { getPhotoInfoUrl } from '../FlickrURLs';

export default class PhotoContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            photoId: null
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
                photoId: photoWrapper.photo.id,
                photoSnapshotUrl: photoWrapper.getSnapshotUrl(),
                photoLinkUrl: photoWrapper.getLinkUrl(),
                dateTakenFormatted: photoWrapper.getDateTakenFormatted()
            });
        }
    }

    render() {

        let componentToRender = null;
        if (this.state.photoId !== null) {
            componentToRender = <Photo id={this.state.photoId}
                snapshotUrl={this.state.photoSnapshotUrl} linkUrl={this.state.photoLinkUrl}
                dateTakenFormatted={this.state.dateTakenFormatted} />;
        }

        return (componentToRender);
    }

};