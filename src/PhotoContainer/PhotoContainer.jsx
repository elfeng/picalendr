import React, { Component } from 'react';
import axios from 'axios';
import Photo from '../Photo/Photo';
import FlickrPhotoWrapper from '../FlickrPhotoWrapper';
import { getPhotoInfoUrl } from '../FlickrURLs';

export default class PhotoContainer extends Component {

    constructor(props) {
        super(props);
        this.getPhotoInfo = this.getPhotoInfo.bind(this);
    }

    componentDidMount() {
        this.getPhotoInfo(this.props.photo);
    }

    /**
     * Calls the Flickr API to get photo details.
     */
    getPhotoInfo(photo) {
        const self = this;
        const infoUrl = getPhotoInfoUrl(photo);
        axios.get(infoUrl)
            .then(infoResponse => self.handlePhotoInfoResponse(infoResponse))
            .catch(error => console.log(error));
    }

    handlePhotoInfoResponse(infoResponse) {
        const photo = new FlickrPhotoWrapper(infoResponse.data);
        if (photo.isDateTakenKnown()) {
            this.setState({
                id: photo.id,
                photoSnapshotUrl: photo.getSnapshotUrl(),
                photoLinkUrl: photo.getLinkUrl(),
                dateTakenFormatted: photo.getDateTakenFormatted()
            });
        }
    }

    render() {

        return (
            <div>
                { this.state ?
                    <Photo id={this.state.id} snapshotUrl={this.state.photoSnapshotUrl} linkUrl={this.state.photoLinkUrl} dateTakenFormatted={this.state.dateTakenFormatted} />
                    :
                    <div>Loading</div>
                }
            </div>
        );
    }

};