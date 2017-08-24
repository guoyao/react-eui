/**
 * @file demo for DateTimeRange component
 * @author guoyao(wuguoyao@baidu.com)
 **/
import moment from 'moment';
import React from 'react';

import {DateTimeRangePicker} from '../../src/index';
import timeUtil from '../../src/util/timeUtil';

export default class DateTimeRangePickerDemo extends React.Component {
    constructor(...args) {
        super(...args);

        this.state = {
            datetime: '2016-05-31T16:00:00Z',
            range: '2016-05-31T16:00:00Z,2016-06-30T15:59:59Z'
        };

        setTimeout(() => {
            this.setState({
                datetime: timeUtil.timeToUtc(moment().endOf('day')),
                range: '2016-04-30T16:00:00Z,2016-05-31T15:59:59Z'
            });
        }, 5000);
    }

    changeHandler = value => {
        console.log(value);
    }

    render() {
        return (
            <div>
                <section>
                    <DateTimeRangePicker
                        label="时间段"
                        wrapperClassName="eui-wrapper"
                        value={this.state.range}
                        changeHandler={this.changeHandler}
                    />
                    <DateTimeRangePicker
                        label="时间段"
                        wrapperClassName="eui-wrapper"
                        mode="datetime"
                        value={this.state.range}
                        changeHandler={this.changeHandler}
                    />
                    <DateTimeRangePicker
                        label="时间段"
                        wrapperClassName="eui-wrapper"
                        showDropdowns
                        timePickerSeconds
                        timePicker24Hour
                        alwaysShowCalendars={false}
                        timePickerIncrement={10}
                        mode="datetime"
                        value={this.state.range}
                        changeHandler={this.changeHandler}
                    />
                    <DateTimeRangePicker
                        label="日期"
                        wrapperClassName="eui-wrapper"
                        singleDatePicker
                        showDropdowns
                        showWeekNumbers
                        opens="left"
                        drops="down"
                        value={this.state.datetime}
                        changeHandler={this.changeHandler}
                    />
                    <DateTimeRangePicker
                        label="时间"
                        wrapperClassName="eui-wrapper"
                        singleDatePicker
                        showDropdowns={false}
                        timePickerSeconds={false}
                        timePicker24Hour={false}
                        mode="datetime"
                        value={this.state.datetime}
                        changeHandler={this.changeHandler}
                    />
                </section>
            </div>
        );
    }
}
