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

export default class DateTimeRange extends ValidatedInput {
    static propTypes = {
        ...ValidatedInput.propTypes,
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
        ...ValidatedInput.defaultProps,
        startInputProps: {},
        endInputProps: {},
        changeHandler: util.emptyFunc
    }

    static Mode = Mode

    static Format = Format

    constructor(props, context) {
        super(props, context);

        let [startTime, endTime] = buildValue(props);

        this.state = {startTime, endTime};
        this.startTimeChangeHandler = this.startTimeChangeHandler.bind(this);
        this.endTimeChangeHandler = this.endTimeChangeHandler.bind(this);
    }

    getValue() {
        return [
            this.refs.startDateTimeField.getValue(),
            this.refs.endDateTimeField.getValue()
        ].join(',');
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

    componentWillReceiveProps(nextProps) {
        super.componentWillReceiveProps && super.componentWillReceiveProps(nextProps);

        if (this.props.value !== nextProps.value) {
            let [startTime, endTime] = buildValue(nextProps);
            this.setState({startTime, endTime});
        }
    }

    renderInput() {
        const {mode, format, inputFormat, startInputProps, endInputProps} = this.props;

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
                dateTime={this.state.startTime}
                changeHandler={this.startTimeChangeHandler}
            />,
            <DateTimeField
                ref="endDateTimeField"
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
