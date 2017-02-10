import './App.css';
import React, { Component } from 'react';
import MonthSelect from '../MonthSelect/MonthSelect';
import { YearSelect, getCurrentYear } from '../YearSelect/YearSelect';
import PhotoListContainer from '../PhotoListContainer/PhotoListContainer';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {};

    this.searchPhotos = this.searchPhotos.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onMonthChange = this.onMonthChange.bind(this);
    this.onYearChange = this.onYearChange.bind(this);
  }

  onInputChange(search) {
    this.search = search.target.value;
  }

  onMonthChange(month) {
    this.month = month;
  }

  onYearChange(year) {
    this.year = year;
  }

  isDateSelectedAndNotInTheFuture() {
    return this.month && this.year &&
      (this.year < getCurrentYear() || this.month.isNotAfterCurrentMonth());
  }

  searchPhotos(event) {
    event.preventDefault();
    if (this.search && this.year && this.month) {
      this.setState({
        search: this.search,
        month: this.month,
        year: this.year
      });
    }
  }

  render() {

    const currentMillis = Date.now();
    let searchResults = null;
    if (this.state.search && this.isDateSelectedAndNotInTheFuture()) {
      searchResults = <PhotoListContainer key={currentMillis} search={this.state.search} month={this.state.month} year={this.state.year}/>;
    }

    return (
      <div className="App">

        <form onSubmit={this.searchPhotos}>
          <div className="container-fluid App-header">

            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-offset-2 col-md-10 col-lg-offset-2 col-lg-10 ">
                <h1>Picalendr:&nbsp;</h1>
                <h2>Flickr search by month</h2>
              </div>
            </div>

            <div className="row App-form" >
              <div className="col-xs-12 col-sm-12 col-md-offset-2 col-md-3 col-lg-offset-2 col-lg-3 ">
                <input type="text" onChange={this.onInputChange}
                  id="picalendr-search" name="picalendr-search"
                  className="form-control"
                  autoFocus
                  required />
              </div>

              <div className="col-xs-6 col-sm-6 col-md-2 col-lg-2">
                <MonthSelect onChange={this.onMonthChange} />
              </div>

              <div className="col-xs-6 col-sm-6 col-md-2 col-lg-2">
                <YearSelect onChange={this.onYearChange}/>
              </div>

              <div className="col-xs-12 col-sm-12 col-md-1 col-lg-1">
                <input type="submit" className="btn btn-default" value="Search"/>
              </div>
            </div>
          </div>
        </form>

        <div className="container">

          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-offset-1 col-md-5 col-md-offset-1 col-lg-5 App-photos">
              {searchResults}
            </div>
            <div className="col-xs-12 col-sm-12 col-md-5 col-lg-5 App-intro">
              <h2>Welcome to Picalendr!</h2>
              <p>
                Picalendr is a search engine that gives you the possibility to search photographs by month and by year very quickly.
                All the pictures come from Flickr and all the displayed dates are consistent.
              </p>
              <h2>Why use this site?</h2>
              <p>
                This site is meant to help you plan your next trip, by showing you pictures of your destination
                at the time of the year you wish to travel.
                Was there snow last year in April at your favorite ski resort?
                When should you visit the Salar de Uyuni to see the incredible mirror effect?
                What is the best month to see the rice terraces of Yuanyang?
                Sometimes it's hard to find the relevant information on the web, and Google Images won't be of any help.
                This is where Picalendr comes to the rescue.
              </p>
              <h2>How does it work?</h2>
              <p>
                To make sure the photos are useful to you, dates are double-checked using EXIF tags.
                As a consequence, photos without EXIF tags are not shown.
                And be careful: nothing can detect a camera with incorrect date/time settings.
              </p>
              <div className="App-footer">
                <a href="https://jffourmond.github.io/">blog</a> -&nbsp;
                <a href="https://www.flickr.com/photos/21668212@N02/albums">Flickr</a> -&nbsp;
                <a href="https://github.com/jffourmond">GitHub</a> -&nbsp;
                <a href="https://twitter.com/jf_fourmond">Twitter</a>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default App;