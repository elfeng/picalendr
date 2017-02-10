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
        const self = this;
        this.getPhotoDetailsFromFlickr(this.props.photoId)
            .then(photoWrapper => {
                if (photoWrapper.isDateTakenKnown()) {
                    self.setState({
                        photoWrapper: photoWrapper
                    });
                }
            })
            .catch(error => console.log(error));
    }

    getPhotoDetailsFromFlickr(photoId) {
        const infoUrl = getPhotoInfoUrl(photoId);
        const infoUrlPromise = axios.get(infoUrl);
        const exifUrl = getPhotoExifUrl(photoId);
        const exifUrlPromise = axios.get(exifUrl);

        return axios.all([infoUrlPromise, exifUrlPromise])
            .then(axios.spread(function (infoResponse, exifResponse) {
                const photoWrapper = new FlickrPhotoWrapper(infoResponse.data, exifResponse.data);
                return photoWrapper;
            }));
    };

    render() {

        let componentToRender = null;
        let photoWrapper = this.state.photoWrapper;
        if (photoWrapper !== null) {
            componentToRender = <Photo id={photoWrapper.getId()}
                snapshotUrl={photoWrapper.getSnapshotUrl() } linkUrl={photoWrapper.getLinkUrl() }
                dateTakenFormatted={photoWrapper.getDateTakenAsPlainText() }
                title={photoWrapper.getTitle() } />;
        }

        return (componentToRender);
    }

};