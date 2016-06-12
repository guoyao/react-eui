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
import InputControl from './InputControl';
import DateTimeField from './DateTimeField';
import util from './util/util';

const Mode = DateTimeField.Mode;
const Format = DateTimeField.Format;

function buildValue(props) {
    let startTime;
    let endTime;

    if (props.value) {
        [startTime, endTime] = props.value.split(/\s*,\s*/);
    }

    return [startTime, endTime];
}

export default class DateTimeRange extends InputControl {
    static propTypes = {
        ...InputControl.propTypes,
        mode: React.PropTypes.oneOf([Mode.date, Mode.datetime, Mode.time]),
        format: React.PropTypes.string,
        inputFormat: React.PropTypes.string,
        startTime: React.PropTypes.string,
        endTime: React.PropTypes.string,
        startInputProps: React.PropTypes.object,
        endInputProps: React.PropTypes.object,
        changeHandler: React.PropTypes.func
    }

    static defaultProps = {
        ...InputControl.defaultProps,
        startInputProps: {},
        endInputProps: {},
        changeHandler: util.emptyFunc
    }

    static Mode = Mode

    static Format = Format

    constructor(props, context) {
        super(props, context);

        this.startTimeChangeHandler = this.startTimeChangeHandler.bind(this);
        this.endTimeChangeHandler = this.endTimeChangeHandler.bind(this);
    }

    getValue() {
        return [
            this.refs.startDateTimeField.getValue(),
            this.refs.endDateTimeField.getValue()
        ].join(',');
    }

    startTimeChangeHandler(value) {
        this.validate();
        this.props.changeHandler(this.getValue());
    }

    endTimeChangeHandler(value) {
        this.validate();
        this.props.changeHandler(this.getValue());
    }

    renderInput() {
        const {mode, format, inputFormat, startInputProps, endInputProps} = this.props;

        let [startTime, endTime] = buildValue(this.props);
        let className = {
            'eui-date-time-range': true
        };

        className = classnames(className, this.props.className);

        return Wrapper.createWrapper(
            {className},
            <DateTimeField
                ref="startDateTimeField"
                key="start"
                mode={mode}
                format={format}
                inputFormat={inputFormat}
                inputProps={startInputProps}
                dateTime={startTime}
                changeHandler={this.startTimeChangeHandler}
            />,
            <DateTimeField
                ref="endDateTimeField"
                key="end"
                mode={mode}
                format={format}
                inputFormat={inputFormat}
                inputProps={endInputProps}
                dateTime={endTime}
                changeHandler={this.endTimeChangeHandler}
            />
        );
    }
}
