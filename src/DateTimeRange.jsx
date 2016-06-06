/**
 * @file 时间区间选择组件
 * @author guoyao(wuguoyao@baidu.com)
 **/

import './DateTimeRange.less';

import u from 'underscore';
import moment from 'moment';
import React from 'react';
import classnames from 'classnames';

import Wrapper from './Wrapper';
import DateTimeField from './DateTimeField';
import ValidatedInput from './ValidatedInput';

const Mode = {
    date: 'date',
    datetime: 'datetime',
    time: 'time'
};

const DEFAULT_FORMAT = {
    [Mode.date]: {
        format: 'YYYY-MM-DD',
        inputFormat: 'YYYY-MM-DD'
    },
    [Mode.datetime]: {
        format: 'YYYY-MM-DDTHH:mm:ssZ',
        inputFormat: 'YYYY-MM-DD HH:mm:ss'
    },
    [Mode.time]: {
        format: 'YYYY-MM-DDTHH:mm:ssZ',
        inputFormat: 'HH:mm:ss'
    }
};

export default class DateTimeRange extends ValidatedInput {
    static get propTypes() {
        return {
            ...ValidatedInput.propTypes,
            mode: React.PropTypes.oneOf([Mode.date, Mode.datetime, Mode.time]),
            format: React.PropTypes.string,
            inputFormat: React.PropTypes.string,
            startTime: React.PropTypes.string,
            endTime: React.PropTypes.string,
            startInputProps: React.PropTypes.object,
            endInputProps: React.PropTypes.object,
            valueFormatter: React.PropTypes.func,
            changeHandler: React.PropTypes.func
        };
    }

    static get defaultProps() {
        return {
            ...ValidatedInput.defaultProps,
            mode: Mode.datetime,
            startInputProps: {},
            endInputProps: {},
            valueFormatter: v => v,
            changeHandler: v => v
        };
    }

    static get Mode() {
        return Mode;
    }

    constructor(props, context) {
        super(props, context);

        let startTime;
        let endTime;

        if (props.defaultValue) {
            [startTime, endTime] = props.defaultValue.split(/\s*,\s*/);
        }

        const format = this.getFormat();
        this.state = {
            startTime: moment(startTime).format(format) || moment().format(format),
            endTime: moment(endTime).format(format) || moment().format(format)
        };

        this.startTimeChangeHandler = this.startTimeChangeHandler.bind(this);
        this.endTimeChangeHandler = this.endTimeChangeHandler.bind(this);
    }

    getValue() {
        const {valueFormatter} = this.props;
        let value = u.pick(this.state, 'startTime', 'endTime');

        value.startTime = valueFormatter(value.startTime);
        value.endTime = valueFormatter(value.endTime);

        return `${value.startTime},${value.endTime}`;
    }

    getFormat() {
        const {format, mode} = this.props;
        return format || DEFAULT_FORMAT[mode].format;
    }

    getInputFormat() {
        const {inputFormat, mode} = this.props;
        return inputFormat || DEFAULT_FORMAT[mode].inputFormat;
    }

    startTimeChangeHandler(e) {
        this.setState({startTime: e}, () => {
            this.validate();
            this.props.changeHandler(this.getValue());
        });
    }

    endTimeChangeHandler(e) {
        this.setState({endTime: e}, () => {
            this.validate();
            this.props.changeHandler(this.getValue());
        });
    }

    validate() {
        this._form && this._form._validateOne(this.props.name, this._form.getValues());
    }

    renderInput() {
        const {mode, startInputProps, endInputProps} = this.props;
        const format = this.getFormat();
        const inputFormat = this.getInputFormat();

        let className = {
            'eui-date-time-range': true
        };

        className = classnames(className, this.props.className);

        return Wrapper.createWrapper(
            {className},
            <DateTimeField
                key="start"
                mode={mode}
                format={format}
                inputFormat={inputFormat}
                inputProps={startInputProps}
                dateTime={this.state.startTime}
                changeHandler={this.startTimeChangeHandler}
            />,
            <DateTimeField
                key="end"
                mode={mode}
                format={format}
                inputFormat={inputFormat}
                inputProps={endInputProps}
                dateTime={this.state.endTime}
                changeHandler={this.endTimeChangeHandler}
            />
        );
    }
}
