import React, { Component } from 'react';

export default class YearSelect extends Component {

    constructor(props) {
        super(props);
        this.selectYear = this.selectYear.bind(this);
    }

    selectYear(yearNumber) {
        this.props.onChange(yearNumber.target.value);
    }

    render() {

        const yearOptions = [];
        for (let year = 2016; year >= 2000; year--){
            yearOptions.push(<option key={year} value={year}>{year}</option>);
        }

        return (
            <select onChange={this.selectYear} className="form-control" required>
                <option value="">Year</option>
                {yearOptions}
            </select>
        );
    }
}; 