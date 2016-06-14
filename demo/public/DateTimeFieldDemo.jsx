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
            <div className="row date-time-field-demo">
                <div className="col-md-4">
                    <DateTimeField changeHandler={this.changeHandler} />
                    <br />
                    <DateTimeField
                        mode={DateTimeField.Mode.date}
                        value="2016-06-01T08:00:00Z"
                        changeHandler={this.changeHandler}
                    />
                    <br />
                    <DateTimeField
                        mode={DateTimeField.Mode.time}
                        value="2016-06-01T08:00:00Z"
                        changeHandler={this.changeHandler}
                    />
                    <br />
                    <DateTimeField
                        mode={DateTimeField.Mode.datetime}
                        value="2016-06-01T08:00:00Z"
                        changeHandler={this.changeHandler}
                    />
                </div>
                <div className="col-md-4">
                    <DateTimeField
                        label="日期"
                        name="date"
                        mode={DateTimeField.Mode.date}
                        value="2016-06-01"
                        groupClassName="vertical"
                        changeHandler={this.changeHandler}
                    />
                    <DateTimeField
                        label="时间"
                        name="time"
                        mode={DateTimeField.Mode.time}
                        value="08:00:00"
                        groupClassName="vertical"
                        changeHandler={this.changeHandler}
                    />
                    <DateTimeField
                        label="日期时间"
                        name="datetime"
                        value="2016-06-01T08:00:00Z"
                        groupClassName="vertical"
                        changeHandler={this.changeHandler}
                    />
                </div>
                <div className="col-md-4">
                    <DateTimeField
                        label="日期"
                        groupClassName="horizontal"
                        mode={DateTimeField.Mode.date}
                        changeHandler={this.changeHandler}
                    />
                    <DateTimeField
                        label="时间"
                        groupClassName="horizontal"
                        mode={DateTimeField.Mode.time}
                        changeHandler={this.changeHandler}
                    />
                    <DateTimeField
                        label="日期时间"
                        groupClassName="horizontal"
                        changeHandler={this.changeHandler}
                    />
                </div>
            </div>
        );
    }
}
