import React, { Component } from 'react';
import axios from 'axios';
import Photo from '../Photo/Photo';
import FlickrPhotoWrapper from '../FlickrPhotoWrapper';
import { getPhotoInfoUrl, getPhotoExifUrl } from '../FlickrURLs';

export default class PhotoContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            photoWrapper: null
        };
        this.getPhotoDetailsFromFlickr = this.getPhotoDetailsFromFlickr.bind(this);
    }

    componentDidMount() {
        this.getPhotoDetailsFromFlickr(this.props.photoId);
    }

    getPhotoDetailsFromFlickr(photoId) {
        const self = this;
        const infoUrl = getPhotoInfoUrl(photoId);
        const infoUrlPromise = axios.get(infoUrl);
        const exifUrl = getPhotoExifUrl(photoId);
        const exifUrlPromise = axios.get(exifUrl);

        axios.all([infoUrlPromise, exifUrlPromise])
            .then(axios.spread(function (infoResponse, exifResponse) {
                self.handlePhotoInfoAndExifResponses(infoResponse, exifResponse);
            }))
            .catch(error => console.log(error));

    };

    handlePhotoInfoAndExifResponses(infoResponse, exifResponse) {
        const photoWrapper = new FlickrPhotoWrapper(infoResponse.data, exifResponse.data);
        if (photoWrapper.isDateTakenKnown()) {
            this.setState({
                photoWrapper: photoWrapper
            });
        }
    }

    render() {

        let componentToRender = null;
        let photoWrapper = this.state.photoWrapper;
        if (photoWrapper !== null) {
            componentToRender = <Photo id={photoWrapper.photo.id}
                snapshotUrl={photoWrapper.getSnapshotUrl() } linkUrl={photoWrapper.getLinkUrl() }
                dateTakenFormatted={photoWrapper.getDateTakenAsPlainText() }
                title={photoWrapper.getTitle() } />;
        }

        return (componentToRender);
    }

};