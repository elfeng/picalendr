import React, { Component } from 'react';
import axios from 'axios';
import Photo from '../Photo/Photo';
import { getPhotoInfoUrl, getPhotoSnapshotUrl, getPhotoLinkUrl } from '../FlickrHelper.js';

export default class PhotoContainer extends Component {

    constructor(props) {
        super(props);
        this.getPhoto = this.getPhoto.bind(this);
    }

    componentDidMount() {
        this.getPhoto(this.props.photo);
    }

    getPhoto(photo) {
        const infoUrl = getPhotoInfoUrl(photo);
        const self = this;
        axios.get(infoUrl)
            .then(infoResponse => {
                if (self.isDateTakenKnown(infoResponse)) {
                    const photo = infoResponse.data.photo;
                    const dateTaken = Date.parse(photo.dates.taken) / 1000;
                    const datePosted = photo.dates.posted;
                    
                    if (dateTaken !== datePosted) {
                        const photoSnapshotUrl = getPhotoSnapshotUrl(photo);
                        const photoLinkUrl = getPhotoLinkUrl(photo);

                        self.setState({
                            id: photo.id,
                            photoSnapshotUrl: photoSnapshotUrl,
                            photoLinkUrl: photoLinkUrl,
                            dateTaken: dateTaken
                        });
                    }
                }
            })
            .catch(error => console.log(error));
    }


    isDateTakenKnown(infoResponse) {
        const granularity = infoResponse.data.photo.dates.takengranularity;
        return granularity < 5;
    }

    render() {

        return (
            <div>
                { this.state ? 
                    <Photo id={this.state.id} snapshotUrl={this.state.photoSnapshotUrl} linkUrl={this.state.photoLinkUrl} dateTaken={this.state.dateTaken} />
                    : 
                    <div>Loading</div>
                }
            </div>
        );
    }

};