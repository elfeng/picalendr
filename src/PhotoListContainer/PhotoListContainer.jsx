
import axios from 'axios';
import React, { Component } from 'react';
import PhotoList from '../PhotoList/PhotoList';
import PhotoContainer from '../PhotoContainer/PhotoContainer';
import { getSearchUrl } from '../FlickrURLs.js';

const NB_PHOTOS_TO_DOWNLOAD = 15;

export default class PhotoListContainer extends Component {

    constructor(props) {
        super(props);
        this.photoContainers = [];
        this.state = {
            searchResults: null,
            photoContainers: []
        };
        this.getPhotosFromFlickr = this.getPhotosFromFlickr.bind(this);
        this.showMorePhotos = this.showMorePhotos.bind(this);
    }

    componentDidMount() {
        this.getPhotosFromFlickr(this.props.search, this.props.month, this.props.year);
    }

    getPhotosFromFlickr(search, month, year) {
        const self = this;
        const searchUrl = getSearchUrl(search, month, year);
        axios.get(searchUrl)
            .then(searchResponse => {
                self.setState({
                    searchResults: searchResponse.data.photos.photo
                });
                self.showMorePhotos();
            })
            .catch(searchError => console.log(searchError));
    }

    /**
     * @return {number} the index of the last photo that will be displayed if more photos are shown.
     */
    getNextLastPhotoIndex() {
        const lastPhotoIndex = this.state.photoContainers.length;
        const nbPhotosRemaining = this.state.searchResults.length - lastPhotoIndex;
        if (nbPhotosRemaining > NB_PHOTOS_TO_DOWNLOAD) {
            return lastPhotoIndex + NB_PHOTOS_TO_DOWNLOAD;
        } else if (nbPhotosRemaining > 0) {
            return lastPhotoIndex + nbPhotosRemaining;
        } else {
            return lastPhotoIndex;
        }
    }

    buildNewPhotoContainers() {
        const lastPhotoIndex = this.getNextLastPhotoIndex();
        for (let i = this.state.photoContainers.length; i < lastPhotoIndex; i++) {
            const photo = this.state.searchResults[i];
            this.photoContainers.push(<PhotoContainer key={photo.id} photoId={photo.id} />)
        }
    }

    showMorePhotos() {
        if (this.state.searchResults !== null) {
            this.buildNewPhotoContainers();
            this.setState({
                 photoContainers: this.photoContainers
            });
        }
    }

    render() {

        let componentToRender = null;
        if (this.state.searchResults !== null) {
            componentToRender =
                <PhotoList
                    nbSearchResults={this.state.searchResults.length}
                    photoContainers={this.state.photoContainers}
                    showMorePhotos={this.showMorePhotos}/>;
        }

        return (componentToRender);
    }

};