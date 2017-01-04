import React, { Component } from 'react';

const DEFAULT_YEAR = 0;

export default class YearSelect extends Component {

    constructor(props) {
        super(props);
        this.selectYear = this.selectYear.bind(this);
    }

    selectYear(yearNumber) {
        if (yearNumber !== DEFAULT_YEAR) {
            this.props.onChange(yearNumber.target.value);
        }
    }

    render() {

        const yearOptions = [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017].map(year =>
            <option key={year} value={year}>{year}</option>
        );

        return (
            <select onChange={this.selectYear} className="form-control">
                <option value={DEFAULT_YEAR}>Year</option>
                {yearOptions}
            </select>
        );
    }
}; 