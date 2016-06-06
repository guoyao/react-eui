/**
 * @file 时间选择组件
 * @author guoyao(wuguoyao@baidu.com)
 **/

import './DateTimeField.less';

import u from 'underscore';
import moment from 'moment';
import React from 'react';
import classnames from 'classnames';
import DateTimeField from 'react-bootstrap-datetimepicker';

import ValidatedInput from './ValidatedInput';
import Wrapper from './Wrapper';
import timeUtil from './util/timeUtil';
import util from './util/util';

const Mode = {
    date: 'date',
    datetime: 'datetime',
    time: 'time'
};

const DEFAULT_FORMAT = {
    [Mode.date]: {
        format: 'YYYY-MM-DDTHH:mm:ssZ',
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

const propKeys = u.keys(DateTimeField.propTypes);

export default class DateTimeFieldEx extends ValidatedInput {
    static get propTypes() {
        return {
            ...ValidatedInput.propTypes,
            ...DateTimeField.propTypes,
            changeHandler: React.PropTypes.func
        };
    }

    static get defaultProps() {
        return {
            ...ValidatedInput.defaultProps,
            ...(u.omit(DateTimeField.defaultProps, 'dateTime', 'format')),
            changeHandler: util.emptyFunc
        };
    }

    static get Mode() {
        return Mode;
    }

    static get Format() {
        return DEFAULT_FORMAT;
    }

    constructor(...args) {
        super(...args);

        const {format, inputFormat, mode, dateTime} = this.props;
        this.format = format || DEFAULT_FORMAT[mode].format;
        this.inputFormat = inputFormat || DEFAULT_FORMAT[mode].inputFormat;

        this.state = {
            dateTime: (dateTime ? moment(dateTime) : moment()).format(format)
        };

        this.changeHandler = this.changeHandler.bind(this);
    }

    getValue() {
        const format = this.format;
        let dateTime = this.state.dateTime;

        if (/Z$/.test(format)) {
            dateTime = timeUtil.timeToUtc(dateTime);
        }

        return dateTime;
    }

    changeHandler(value) {
        this.setState({dateTime: value}, () => {
            this.props.changeHandler(this.getValue());
        });
    }

    renderInput() {
        const {mode} = this.props;

        let className = {
            'eui-date-time-field': true,
            [`eui-date-time-field-${mode}`]: true
        };

        className = classnames(className, this.props.className);

        const props = u.extend(
            {key: ''},
            u.pick(this.props, propKeys),
            {
                dateTime: this.state.dateTime,
                onChange: this.changeHandler,
                format: this.format,
                inputFormat: this.inputFormat
            }
        );

        return Wrapper.createWrapper(
            {className},
            <DateTimeField {...props} />
        );
    }
}
