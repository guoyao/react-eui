/**
 * @file 时间区间选择组件
 * @author guoyao(wuguoyao@baidu.com)
 **/

import './DateTimeRangeEx.less';

import React from 'react';
import u from 'underscore';
import moment from 'moment';
import classnames from 'classnames';
import {autobind, override} from 'core-decorators';
import {Button} from 'react-bootstrap';
import DatetimeRangePicker from 'react-bootstrap-datetimerangepicker';

import Control from './Control';
import InputControl from './InputControl';
import util from './util/util';
import timeUtil from './util/timeUtil';

const Mode = {
    date: 'date',
    datetime: 'datetime'
};

const DEFAULT_FORMAT = {
    [Mode.date]: {
        format: 'YYYY-MM-DD',
        inputFormat: 'YYYY-MM-DD'
    },
    [Mode.datetime]: {
        format: 'YYYY-MM-DDTHH:mm:ssZ',
        inputFormat: 'YYYY-MM-DD HH:mm:ss'
    }
};

const Locale = {
    format: DEFAULT_FORMAT[Mode.date].format,
    separator: '-',
    applyLabel: '确定',
    cancelLabel: '取消',
    fromLabel: '从',
    toLabel: '至',
    customRangeLabel: '自定义',
    weekLabel: '周',
    daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
    monthNames: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    firstDay: 1
};

function getRanges() {
    return {
        '本月': [moment().startOf('month'), moment().endOf('month')],
        '上月': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
        '本季度': [moment().startOf('quarter'), moment()],
        '上季度': [moment().subtract(1, 'quarter').startOf('quarter'), moment().subtract(1, 'quarter').endOf('quarter')],
        '本年': [moment().startOf('year'), moment()],
        '全部': [moment('2000', 'YYYY').startOf('year'), moment()]
    };
}

function buildValue(props) {
    let startDate;
    let endDate;

    if (props.value) {
        [startDate, endDate] = props.value.split(/\s*,\s*/);
    }

    return [startDate, endDate];
}

export default class DateTimeRangeEx extends InputControl {
    static propTypes = {
        ...InputControl.propTypes,
        ...DatetimeRangePicker.propTypes,

        mode: React.PropTypes.oneOf([Mode.date, Mode.datetime]),
        format: React.PropTypes.string,
        inputFormat: React.PropTypes.string,
        changeHandler: React.PropTypes.func
    }

    static defaultProps = {
        ...InputControl.defaultProps,
        ...DatetimeRangePicker.defaultProps,
        showDropdowns: true,
        alwaysShowCalendars: true,
        timePicker: false,
        timePickerSeconds: true,
        timePicker24Hour: true,
        linkedCalendars: false,

        mode: Mode.date,
        changeHandler: util.emptyFunc
    }

    static Mode = Mode

    static Format = DEFAULT_FORMAT

    constructor(...args) {
        super(...args);

        const {format, inputFormat, mode} = this.props;
        const [startDate, endDate] = buildValue(this.props);

        this.format = format || DEFAULT_FORMAT[mode].format;
        this.inputFormat = inputFormat || DEFAULT_FORMAT[mode].inputFormat;

        this.state = {
            startDate: startDate ? moment(startDate, this.format) : moment(),
            endDate: endDate ? moment(endDate, this.format) : moment()
        };
    }

    @override
    get controlClassName() {
        return classnames(super.controlClassName, 'eui-date-time-range-ex');
    }

    @override
    getValue() {
        const {startDate, endDate} = this.state;

        if (/Z$/.test(this.format)) {
            return `${timeUtil.timeToUtc(startDate)},${timeUtil.timeToUtc(endDate)}`;
        }

        return `${startDate.format(this.format)},${endDate.format(this.format)}`;
    }

    @autobind
    changeHandler(e, picker) {
        this.setState({
            startDate: picker.startDate,
            endDate: picker.endDate
        }, () => {
            this.props.changeHandler(this.getValue());
        });
    }

    @override
    renderControl() {
        let props = u.omit(this.props, 'className', 'mode', 'format', 'inputFormat');
        const {startDate, endDate} = this.state;

        props = u.extend({
            ranges: getRanges(),
        }, props, {
            startDate,
            endDate,
            timePicker: this.props.mode === Mode.datetime,
            locale: u.extend({}, Locale, this.props.locale, {format: this.inputFormat}),
            onEvent: this.changeHandler
        });

        let start;
        let end;

        if (/Z$/.test(this.format)) {
            start = timeUtil.toTime(timeUtil.timeToUtc(startDate));
            end = timeUtil.toTime(timeUtil.timeToUtc(endDate));
            props.startDate = moment(start, this.inputFormat);
            props.endDate = moment(end, this.inputFormat);
        }
        else {
            start = startDate.format(this.inputFormat);
            end = endDate.format(this.inputFormat);
        }

        const label = start === end ? start : `${start} - ${end}`;

        return (
            <Control className={this.controlClassName}>
                <DatetimeRangePicker {...props}>
                    <Button>
                        <div className="pull-left">
                            <i className="fa fa-calendar" />
                            <span>{label}</span>
                        </div>
                        <div className="pull-right">
                            <i className="fa fa-angle-down" />
                        </div>
                    </Button>
                </DatetimeRangePicker>
            </Control>
        );
    }
}
