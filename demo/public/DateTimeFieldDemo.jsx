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
            <div>
                <section>
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
                </section>
                <section>
                    <DateTimeField
                        label="日期"
                        name="date"
                        wrapperClassName="eui-wrapper"
                        mode={DateTimeField.Mode.date}
                        value="2016-06-01"
                        changeHandler={this.changeHandler}
                    />
                    <DateTimeField
                        label="时间"
                        name="time"
                        wrapperClassName="eui-wrapper"
                        mode={DateTimeField.Mode.time}
                        value="08:00:00"
                        changeHandler={this.changeHandler}
                    />
                    <DateTimeField
                        label="日期时间"
                        name="datetime"
                        wrapperClassName="eui-wrapper"
                        value="2016-06-01T08:00:00Z"
                        changeHandler={this.changeHandler}
                    />
                </section>
                <section>
                    <DateTimeField
                        label="日期"
                        groupClassName="horizontal"
                        labelClassName="col-sm-2"
                        wrapperClassName="col-sm-10"
                        mode={DateTimeField.Mode.date}
                        changeHandler={this.changeHandler}
                    />
                    <DateTimeField
                        label="时间"
                        groupClassName="horizontal"
                        labelClassName="col-sm-2"
                        wrapperClassName="col-sm-10"
                        mode={DateTimeField.Mode.time}
                        changeHandler={this.changeHandler}
                    />
                    <DateTimeField
                        label="日期时间"
                        groupClassName="horizontal"
                        labelClassName="col-sm-2"
                        wrapperClassName="col-sm-10"
                        changeHandler={this.changeHandler}
                    />
                </section>
            </div>
        );
    }
}
