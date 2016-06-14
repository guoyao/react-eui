/**
 * @file demo for DateTimeRange component
 * @author guoyao(wuguoyao@baidu.com)
 **/
import React from 'react';
import {DateTimeRange} from '../../index';

export default class DateTimeRangeDemo extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = {};
        this.changeHandler = this.changeHandler.bind(this);

        // setTimeout(() => {
        //     this.setState({timeRange: '2016-05-05T00:00:00Z,2016-06-06T00:00:00Z'});
        // }, 5000);
    }

    changeHandler(value) {
        console.log(value);
    }

    render() {
        return (
            <div className="row date-time-range-demo">
                <div className="col-md-6">
                    <DateTimeRange />
                    <DateTimeRange
                        label="日期时间"
                        groupClassName="vertical"
                    />
                    <DateTimeRange
                        label="日期"
                        mode={DateTimeRange.Mode.date}
                        value={this.state.timeRange}
                        changeHandler={this.changeHandler}
                        validate="required,isTimeRange"
                        errorHelp={{
                            required: '请填写',
                            isTimeRange: '结束日期必须晚于开始日期'
                        }}
                    />
                    <DateTimeRange
                        value={this.state.timeRange}
                        changeHandler={this.changeHandler}
                        validate="isTimeRange"
                        errorHelp={{
                            isTimeRange: '结束时间必须晚于开始时间'
                        }}
                    />
                </div>
                <div className="col-md-6">
                    <DateTimeRange
                        mode={DateTimeRange.Mode.date}
                        value={this.state.timeRange}
                        changeHandler={this.changeHandler}
                        validate="isTimeRange"
                        errorHelp={{
                            isTimeRange: '结束日期必须晚于开始日期'
                        }}
                    />
                    <DateTimeRange
                        label="日期时间段"
                        className="required"
                        groupClassName="vertical"
                        value={this.state.timeRange}
                        changeHandler={this.changeHandler}
                        validate="isTimeRange"
                        errorHelp={{
                            isTimeRange: '结束时间必须晚于开始时间'
                        }}
                    />
                </div>
            </div>
        );
    }
}
