import React, { Component } from 'react';
import axios from 'axios';
import PhotoList from './PhotoList.jsx';
import { getSearchUrl } from './FlickrHelper.js';

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

    getPhotos(search, month, year) {

        let self = this;
        let searchUrl = getSearchUrl(search, month, year);
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

    hasPhotos() {
        return this.hasSearchReturned() && this.state.searchResults.length > 0
    }

    render() {

        let componentToDisplay = null;
        if (this.hasSearchReturned()) {
            if (this.hasPhotos()) {
                componentToDisplay = <PhotoList photoList={this.state.searchResults} />;
            } else {
                componentToDisplay = <span>No photo found</span>;
            }
        }

        return (
            <div>
                {componentToDisplay}
            </div>
        );
    }

};