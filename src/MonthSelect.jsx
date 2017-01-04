import React, { Component } from 'react';
import { TWELVE_MONTHS } from './Month.js';

const DEFAULT_MONTH = 0;

export default class MonthSelect extends Component {

    constructor(props) {
        super(props);
        this.selectMonth = this.selectMonth.bind(this);
    }

    selectMonth(monthNumber) {
        if (monthNumber !== DEFAULT_MONTH) {
            const month = TWELVE_MONTHS[monthNumber.target.value - 1];
            this.props.onChange(month);
        }
    }

    render() {
        const monthOptions = TWELVE_MONTHS.map(month =>
            <option key={month.number} value={month.number}>{month.name}</option>
        );

        return (
            <select onChange={this.selectMonth} className="form-control">
                <option value={DEFAULT_MONTH}>Month</option>
                {monthOptions}
            </select>
        );
    }

}; 