import './App.css';
import React, { Component } from 'react';
import MonthSelect from '../MonthSelect/MonthSelect';
import YearSelect from '../YearSelect/YearSelect';
import PhotoListContainer from '../PhotoListContainer/PhotoListContainer';

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

  searchPhotos(event) {

    event.preventDefault();
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

        <form onSubmit={this.searchPhotos}>
          <div className="container-fluid App-header">

            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-offset-2 col-md-10 col-lg-offset-2 col-lg-10 ">
                <h1>Picalendr :&nbsp;</h1>
                <h2>Flickr search by month</h2>
              </div>
            </div>

            <div className="row App-form" >
              <div className="col-xs-12 col-sm-12 col-md-offset-2 col-md-3 col-lg-offset-2 col-lg-3 ">
                <input type="text" onChange={this.onInputChange}
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

        <PhotoListContainer search={this.state.search} month={this.state.month} year={this.state.year}/>
      </div>
    );
  }
}

export default App;
