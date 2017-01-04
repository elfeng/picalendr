import React, { Component } from 'react';
import './App.css';
import MonthSelect from './MonthSelect.jsx';
import YearSelect from './YearSelect.jsx';
import PhotoListContainer from './PhotoListContainer.jsx';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {}

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

  searchPhotos() {
    if (this.search && this.month && this.month) {
      this.setState({
        search: this.search,
        month: this.month,
        year: this.year
      });
    }
  }

  render() {

    return (
      <div className="App">

        <div className="container-fluid App-header">

          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-offset-2 col-md-10 col-lg-offset-2 col-lg-10 ">
              <h1>Picalendr : </h1>
              <h2>Flickr search by month</h2>
            </div>
          </div>

          <div className="row App-form" >
            <div className="col-xs-12 col-sm-12 col-md-offset-2 col-md-3 col-lg-offset-2 col-lg-3 ">
              <input type="text" onChange={this.onInputChange} className="form-control"/>
            </div>

            <div className="col-xs-6 col-sm-6 col-md-2 col-lg-2">
              <MonthSelect onChange={this.onMonthChange}/>
            </div>

            <div className="col-xs-6 col-sm-6 col-md-2 col-lg-2">
              <YearSelect onChange={this.onYearChange}/>
            </div>

            <div className="col-xs-12 col-sm-12 col-md-1 col-lg-1">
              <button onClick={this.searchPhotos} className="btn btn-default">Search</button>
            </div>
          </div>
        </div>

        <PhotoListContainer search={this.state.search} month={this.state.month} year={this.state.year}/>
      </div>
    );
  }
}

export default App;
