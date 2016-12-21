import React, { Component } from 'react';
import axios from 'axios';
import Photo from './Photo.jsx';
import { getPhotoInfoUrl, getPhotoFileUrl } from './FlickrHelper.js';

export default class PhotoContainer extends Component {

    constructor(props) {
        super(props);
        this.getPhoto = this.getPhoto.bind(this);
    }

    componentDidMount() {
        this.getPhoto(this.props.photo);
    }

    getPhoto(photo) {
        let infoUrl = getPhotoInfoUrl(photo);
        let self = this;
        axios.get(infoUrl)
            .then(infoResponse => {
                if (self.isDateTakenKnown(infoResponse)) {
                    let dateTaken = Date.parse(infoResponse.data.photo.dates.taken) / 1000;
                    let datePosted = infoResponse.data.photo.dates.posted;
                    if (dateTaken !== datePosted) {
                        let url = getPhotoFileUrl(infoResponse.data.photo);

                        self.setState({
                            id: infoResponse.data.photo.id,
                            url: url,
                            dateTaken: dateTaken
                        });
                    }
                }
            })
            .catch(error => console.log(error));
    }


    isDateTakenKnown(infoResponse) {
        let granularity = infoResponse.data.photo.dates.takengranularity;

        return granularity < 5;
    }

    render() {

        return (
            <div>
                { this.state ? 
                    <Photo id={this.state.id} url={this.state.url} dateTaken={this.state.dateTaken} />
                    : 
                    <div>Loading</div>
                }
            </div>
        );
    }

};