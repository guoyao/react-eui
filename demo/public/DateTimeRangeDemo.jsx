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
                    name="timeRange"
                    label="时间段"
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
