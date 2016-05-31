/**
 * @file demo for DateTimeRange component
 * @author guoyao(wuguoyao@baidu.com)
 **/
import React from 'react';
import {DateTimeRange, Form} from '../../index';

export default class DateTimeRangeDemo extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = {};
        this.changeHandler = this.changeHandler.bind(this);
    }

    changeHandler(value) {
        console.log(value);
    }

    render() {
        return (
            <Form>
                <DateTimeRange
                    name="dateRange"
                    label="日期段"
                    className="required"
                    mode={DateTimeRange.Mode.date}
                    defaultValue={this.state.timeRange}
                    startInputProps={{readOnly: true}}
                    endInputProps={{readOnly: true}}
                    changeHandler={this.changeHandler}
                    validate="isTimeRange"
                    errorHelp={{
                        isTimeRange: '结束日期必须晚于开始日期'
                    }}
                />
                <DateTimeRange
                    name="timeRange"
                    label="日期时间段"
                    className="required"
                    defaultValue={this.state.timeRange}
                    startInputProps={{readOnly: true}}
                    endInputProps={{readOnly: true}}
                    changeHandler={this.changeHandler}
                    validate="isTimeRange"
                    errorHelp={{
                        isTimeRange: '结束时间必须晚于开始时间'
                    }}
                />
            </Form>
        );
    }
}
