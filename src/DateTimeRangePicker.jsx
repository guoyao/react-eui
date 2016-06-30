/**
 * @file 时间区间选择组件
 * @author guoyao(wuguoyao@baidu.com)
 **/

import './DateTimeRangePicker.less';

import React from 'react';
import u from 'underscore';
import moment from 'moment';
import classnames from 'classnames';
import {autobind, override} from 'core-decorators';
import {Button} from 'react-bootstrap';
import DateTimeRangePicker from 'react-bootstrap-datetimerangepicker';

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
    format: DEFAULT_FORMAT[Mode.date].inputFormat,
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
        '本季度': [moment().startOf('quarter'), moment().endOf('quarter')],
        '下季度': [moment().add(1, 'quarter').startOf('quarter'), moment().add(1, 'quarter').endOf('quarter')],
        '本年': [moment().startOf('year'), moment().endOf('year')],
        '全部': [moment('2000', 'YYYY').startOf('year'), moment('2050', 'YYYY').endOf('year')]
    };
}

function getSingleRanges() {
    return {
        '今天': [moment().endOf('day'), moment().endOf('day')],
        '昨天': [moment().subtract(1, 'day').endOf('day'), moment().subtract(1, 'day').endOf('day')],
        '明天': [moment().add(1, 'day').endOf('day'), moment().add(1, 'day').endOf('day')],
        '前天': [moment().subtract(2, 'day').endOf('day'), moment().subtract(2, 'day').endOf('day')],
        '后天': [moment().add(2, 'day').endOf('day'), moment().add(2, 'day').endOf('day')]
    };
}

function buildRange(value) {
    let startDate;
    let endDate;

    if (value) {
        [startDate, endDate] = value.split(/\s*,\s*/);
    }

    return {startDate, endDate};
}

function getRange(value, ranges, format, singleDatePicker) {
    const range = buildRange(value);
    let unit = 'second';

    if (format === DEFAULT_FORMAT.date.format) {
        unit = 'day';
        /Z$/.test(range.startDate) && (range.startDate = timeUtil.toTime(range.startDate));
        /Z$/.test(range.endDate) && (range.endDate = timeUtil.toTime(range.endDate));
    }

    range.startDate = range.startDate ? moment(range.startDate, format) : moment();
    range.endDate = range.endDate ? moment(range.endDate, format) : moment();

    if (singleDatePicker) {
        range.endDate = range.startDate;
    }

    u.each(ranges, (dates, key) => {
        let [rangeStart, rangeEnd] = dates;
        if (rangeStart.isSame(range.startDate, unit) && rangeEnd.isSame(range.endDate, unit)) {
            range.startDate = rangeStart;
            range.endDate = rangeEnd;
        }
    });

    return range;
}

export default class DateTimeRangePickerEx extends InputControl {
    static propTypes = {
        ...InputControl.propTypes,
        ...DateTimeRangePicker.propTypes,

        mode: React.PropTypes.oneOf([Mode.date, Mode.datetime]),
        inputFormat: React.PropTypes.string,
        changeHandler: React.PropTypes.func
    }

    static defaultProps = {
        ...InputControl.defaultProps,
        ...DateTimeRangePicker.defaultProps,
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

        const {inputFormat, mode, value, ranges, singleDatePicker} = this.props;

        this.format = DEFAULT_FORMAT[mode].format;
        this.inputFormat = inputFormat || DEFAULT_FORMAT[mode].inputFormat;
        this.ranges = ranges || (singleDatePicker ? getSingleRanges() : getRanges());
        this.state = getRange(value, this.ranges, this.format, singleDatePicker);
    }

    @override
    get controlClassName() {
        return classnames(super.controlClassName, 'eui-date-time-range-picker');
    }

    @override
    getValue() {
        const {startDate, endDate} = this.state;
        const {singleDatePicker} = this.props;

        if (/Z$/.test(this.format)) {
            if (singleDatePicker) {
                return timeUtil.timeToUtc(startDate.clone());
            }

            return `${timeUtil.timeToUtc(startDate.clone())},${timeUtil.timeToUtc(endDate.clone())}`;
        }

        if (singleDatePicker) {
            return startDate.format(this.format);
        }

        return `${startDate.format(this.format)},${endDate.format(this.format)}`;
    }

    @autobind
    _applyHandler(e, picker) {
        let {startDate, endDate} = picker;

        if (this.props.singleDatePicker) {
            endDate = startDate;
        }

        this.setState({startDate, endDate}, () => {
            this.props.changeHandler(this.getValue());
        });
    }

    componentWillReceiveProps(nextProps) {
        super.componentWillReceiveProps && super.componentWillReceiveProps(nextProps);

        if (this.props.value !== nextProps.value) {
            this.setState(getRange(nextProps.value, this.ranges, this.format, nextProps.singleDatePicker));
        }
    }

    @override
    renderControl() {
        let props = u.omit(this.props, 'className', 'mode', 'format', 'inputFormat');
        const {startDate, endDate} = this.state;

        props = u.extend(props, {
            startDate,
            endDate,
            ranges: this.ranges,
            timePicker: this.props.mode === Mode.datetime,
            locale: u.extend({}, Locale, this.props.locale, {format: this.inputFormat}),
            onApply: this._applyHandler
        });

        const start = startDate.format(this.inputFormat);
        const end = endDate.format(this.inputFormat);

        let label = start === end ? start : `${start} - ${end}`;
        let preDefinedRange;

        u.each(props.ranges, (dates, key) => {
            let [rangeStart, rangeEnd] = dates;
            if (rangeStart.isSame(startDate) && rangeEnd.isSame(endDate)) {
                preDefinedRange = key;
            }
        });

        if (preDefinedRange) {
            label = preDefinedRange === '全部' ? '全部' : preDefinedRange + ' ' + label;
        }

        return (
            <Control className={this.controlClassName}>
                <DateTimeRangePicker {...props}>
                    <Button>
                        <div className="pull-left">
                            <span>{label}</span>
                        </div>
                        <div className="pull-right">
                            <i className="fa fa-calendar" />
                        </div>
                    </Button>
                </DateTimeRangePicker>
            </Control>
        );
    }
}
