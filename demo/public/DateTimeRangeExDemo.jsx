/**
 * @file demo for DateTimeRange component
 * @author guoyao(wuguoyao@baidu.com)
 **/
import moment from 'moment';
import React from 'react';
import {autobind} from 'core-decorators';
import {Button} from 'react-bootstrap';
import DatetimeRangePicker from 'react-bootstrap-datetimerangepicker';

import {DateTimeRangeEx} from '../../index';

const Locale = {
    format: 'YYYY-MM-DD',
    separator: '-',
    applyLabel: '确定',
    cancelLabel: '取消',
    fromLabel: '从',
    toLabel: '至',
    customRangeLabel: 'Custom',
    weekLabel: '周',
    daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
    monthNames: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
    firstDay: 1
};

export default class DateTimeRangeExDemo extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = {
            startDate: moment().subtract(29, 'days'),
            endDate: moment(),
            date: '2016-05-24,2016-06-22',
            time: '2016-05-24T00:00:00Z,2016-06-22T00:00:00Z',
            ranges: {
                'Today': [moment(), moment()],
                'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                'This Month': [moment().startOf('month'), moment().endOf('month')],
                'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
            },
        };
    }

    @autobind
    handleEvent(event, picker) {
        this.setState({
            startDate: picker.startDate,
            endDate: picker.endDate,
        });
    }

    @autobind
    changeHandler(value) {
        console.log(value);
    }

    render() {
        let start = this.state.startDate.format('YYYY-MM-DD');
        let end = this.state.endDate.format('YYYY-MM-DD');
        let label = start + ' - ' + end;

        if (start === end) {
            label = start;
        }

        let buttonStyle = { width: '100%' };

        return (
            <div>
                <section>
                    <DatetimeRangePicker
                        showDropdowns
                        alwaysShowCalendars
                        locale={Locale}
                        startDate={this.state.startDate}
                        endDate={this.state.endDate}
                        ranges={this.state.ranges}
                        onEvent={this.handleEvent}
                    >
                        <Button className="selected-date-range-btn" style={buttonStyle}>
                            <div className="pull-left">
                                <i className="fa fa-calendar" />
                                &nbsp;
                                <span>{label}</span>
                            </div>
                            <div className="pull-right">
                                <i className="fa fa-angle-down" />
                            </div>
                        </Button>
                    </DatetimeRangePicker>
                </section>

                <section>
                    <DateTimeRangeEx
                        label="时间段"
                        wrapperClassName="eui-wrapper"
                        mode="datetime"
                        value={this.state.tdfas}
                        changeHandler={this.changeHandler}
                    />
                </section>
            </div>
        );
    }
}
