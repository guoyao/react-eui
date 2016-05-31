/**
 * @file 时间区间选择组件
 * @author guoyao(wuguoyao@baidu.com)
 **/

import './DateTimeRange.less';

import u from 'underscore';
import moment from 'moment';
import React from 'react';
import classnames from 'classnames';
import DateTimeField from 'react-bootstrap-datetimepicker';

import ValidatedInput from './ValidatedInput';

const Mode = {
    MODE_DATE: 'date',
    MODE_DATETIME: 'datetime',
    MODE_TIME: 'time'
};

const DEFAULT_FORMAT = {
    [Mode.MODE_DATE]: {
        format: 'YYYY-MM-DD',
        inputFormat: 'YYYY-MM-DD'
    },
    [Mode.MODE_DATETIME]: {
        format: 'YYYY-MM-DDTHH:mm:ssZ',
        inputFormat: 'YYYY-MM-DD HH:mm:ss'
    },
    [Mode.MODE_TIME]: {
        format: 'YYYY-MM-DDTHH:mm:ssZ',
        inputFormat: 'HH:mm:ss'
    }
};

export default class DateTimeRange extends ValidatedInput {
    static get defaultProps() {
        return {
            ...ValidatedInput.defaultProps,
            mode: Mode.MODE_DATETIME,
            startInputProps: {},
            endInputProps: {},
            valueFormatter: v => v,
            changeHandler: v => v
        };
    }

    static get propTypes() {
        return {
            ...ValidatedInput.propTypes,
            mode: React.PropTypes.oneOf([Mode.MODE_DATE, Mode.MODE_DATETIME, Mode.MODE_TIME]),
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

    static get mode() {
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
        this.setState({startTime: e});
        setTimeout(() => {
            this.validate();
            this.props.changeHandler(this.getValue());
        }, 0);
    }

    endTimeChangeHandler(e) {
        this.setState({endTime: e});
        setTimeout(() => {
            this.validate();
            this.props.changeHandler(this.getValue());
        }, 0);
    }

    validate() {
        this._form && this._form._validateOne(this.props.name, this._form.getValues());
    }

    render() {
        const {mode, startInputProps, endInputProps} = this.props;
        const format = this.getFormat();
        const inputFormat = this.getInputFormat();

        let className = {
            'form-group date-time-range-group': !this.props.standalone,
            'form-group-lg date-time-range-group-lg': !this.props.standalone && this.props.bsSize === 'large',
            'form-group-sm date-time-range-group-sm': !this.props.standalone && this.props.bsSize === 'small',
            'form-group-hidden date-time-range-group-hidden': this.props.isHidden,
            'has-feedback': this.props.hasFeedback,
            'has-success': this.props.bsStyle === 'success',
            'has-warning': this.props.bsStyle === 'warning',
            'has-error': this.props.bsStyle === 'error'
        };

        className = classnames(className, this.props.className);

        return (
            <div className={className}>
                {super.renderLabel()}
                <div className="date-time-range">
                    <DateTimeField
                        mode={mode}
                        format={format}
                        inputFormat={inputFormat}
                        inputProps={startInputProps}
                        dateTime={this.state.startTime}
                        onChange={this.startTimeChangeHandler}
                    />
                    <DateTimeField
                        mode={mode}
                        format={format}
                        inputFormat={inputFormat}
                        inputProps={endInputProps}
                        dateTime={this.state.endTime}
                        onChange={this.endTimeChangeHandler}
                    />
                </div>
                {super.renderHelp()}
            </div>
        );
    }
}
