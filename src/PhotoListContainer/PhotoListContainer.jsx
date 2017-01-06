import React, { Component } from 'react';
import axios from 'axios';
import PhotoList from '../PhotoList/PhotoList';
import { getSearchUrl } from '../FlickrURLs.js';

export default class PhotoListContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchResults: null
        };
        this.getPhotos = this.getPhotos.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.getPhotos(nextProps.search, nextProps.month, nextProps.year);
    }

    /**
     * Calls the Flickr API to search for photos.
     */
    getPhotos(search, month, year) {

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
        return this.state.searchResults !== null;
    }

    hasSearchReturnedWithResults() {
        return this.hasSearchReturned() && this.state.searchResults.length > 0;
    }

    hasSearchReturnedEmpty() {
        return this.hasSearchReturned() && this.state.searchResults.length === 0;
    }

    render() {

        let componentToRender = null;
        if (this.hasSearchReturnedWithResults()) {
            componentToRender = <PhotoList photoList={this.state.searchResults} />;
        } else if (this.hasSearchReturnedEmpty()){
            componentToRender = <span>No photo found</span>;
        }

        return (
            <div>
                {componentToRender}
            </div>
        );
    }

};