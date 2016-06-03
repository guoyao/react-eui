/**
 * @file demo for DateTimeRange component
 * @author guoyao(wuguoyao@baidu.com)
 **/
import React from 'react';
import {DateTimeField} from '../../index';

export default class DateTimeFieldDemo extends React.Component {
    constructor(...args) {
        super(...args);
        this.changeHandler = this.changeHandler.bind(this);
    }

    changeHandler(value) {
        console.log(value);
    }

    render() {
        return (
            <div className="date-time-field-demo">
                <DateTimeField
                    name="date"
                    mode={DateTimeField.Mode.date}
                    inputProps={{readOnly: true}}
                    dateTime="2016-06-01"
                    changeHandler={this.changeHandler}
                />
                <DateTimeField
                    name="time"
                    mode={DateTimeField.Mode.time}
                    inputProps={{readOnly: true}}
                    dateTime="2016-06-01T08:00:00Z"
                    changeHandler={this.changeHandler}
                />
                <DateTimeField
                    name="datetime"
                    mode={DateTimeField.Mode.datetime}
                    inputProps={{readOnly: true}}
                    dateTime="2016-06-01T08:00:00Z"
                    changeHandler={this.changeHandler}
                />
            </div>
        );
    }
}
