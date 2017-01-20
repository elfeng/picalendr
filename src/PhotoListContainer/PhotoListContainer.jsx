
import axios from 'axios';
import React, { Component } from 'react';
import PhotoList from '../PhotoList/PhotoList';
import { getSearchUrl } from '../FlickrURLs.js';

export default class PhotoListContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchResults: []
        };
        this.getPhotosFromFlickr = this.getPhotosFromFlickr.bind(this);
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
                })
            })
            .catch(searchError => console.log(searchError));
    }

    hasSearchReturned() {
        return this.state.searchResults !== [];
    }

    render() {

        let componentToRender = null;
        if (this.hasSearchReturned()){
            componentToRender = <PhotoList photoList={this.state.searchResults} />;
        }

        return (componentToRender);
    }

};