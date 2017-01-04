import React, { Component } from 'react';
import axios from 'axios';
import Photo from './Photo.jsx';
import { getPhotoInfoUrl, getPhotoFileUrl, getPhotoLinkUrl } from './FlickrHelper.js';

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
                    let dateTaken = Date.parse(infoResponse.data.photo.dates.taken) / 1000;
                    let datePosted = infoResponse.data.photo.dates.posted;
                    if (dateTaken !== datePosted) {
                        const photoFileUrl = getPhotoFileUrl(infoResponse.data.photo);
                        const photoLinkUrl = getPhotoLinkUrl(infoResponse.data.photo);

                        self.setState({
                            id: infoResponse.data.photo.id,
                            photoFileUrl: photoFileUrl,
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
                    <Photo id={this.state.id} url={this.state.photoFileUrl} link={this.state.photoLinkUrl} dateTaken={this.state.dateTaken} />
                    : 
                    <div>Loading</div>
                }
            </div>
        );
    }

};