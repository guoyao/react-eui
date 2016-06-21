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
            <div>
                <section>
                    <DateTimeRange />
                    <DateTimeRange
                        label="起止时间"
                        wrapperClassName="eui-wrapper"
                    />
                    <DateTimeRange
                        label="起止日期"
                        wrapperClassName="eui-wrapper"
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
                </section>
                <section>
                    <DateTimeRange
                        label="起止日期"
                        className="required"
                        groupClassName="horizontal"
                        labelClassName="col-sm-2"
                        wrapperClassName="col-sm-10"
                        mode={DateTimeRange.Mode.date}
                        value={this.state.timeRange}
                        changeHandler={this.changeHandler}
                        validate="isTimeRange"
                        errorHelp={{
                            isTimeRange: '结束日期必须晚于开始日期'
                        }}
                    />
                    <DateTimeRange
                        label="起止时间"
                        className="required"
                        groupClassName="horizontal"
                        labelClassName="col-sm-2"
                        wrapperClassName="col-sm-10"
                        value={this.state.timeRange}
                        changeHandler={this.changeHandler}
                        validate="isTimeRange"
                        errorHelp={{
                            isTimeRange: '结束时间必须晚于开始时间'
                        }}
                    />
                </section>
            </div>
        );
    }
}
