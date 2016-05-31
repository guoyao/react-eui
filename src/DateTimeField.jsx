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

const propKeys = u.keys(DateTimeField.propTypes);

export default class DateTimeFieldEx extends ValidatedInput {
    static get propTypes() {
        return {
            ...ValidatedInput.propTypes,
            ...DateTimeField.propTypes,
            valueFormatter: React.PropTypes.func
        };
    }

    static get defaultProps() {
        return {
            ...ValidatedInput.defaultProps,
            ...(u.omit(DateTimeField.defaultProps, 'dateTime')),
            valueFormatter: v => v
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

        console.log(...args);

        const format = this.format;
        const {dateTime} = this.props;

        this.state = {
            dateTime: (dateTime ? moment(dateTime) : moment()).format(format)
        };

        this.onChange = this.onChange.bind(this);
    }

    get format() {
        const {format, mode} = this.props;
        return format || DEFAULT_FORMAT[mode].format;
    }

    get inputFormat() {
        const {inputFormat, mode} = this.props;
        return inputFormat || DEFAULT_FORMAT[mode].inputFormat;
    }

    getValue() {
        return `${this.props.valueFormatter(this.state.datetime)}`;
    }

    validate() {
        this._form && this._form._validateOne(this.props.name, this._form.getValues());
    }

    onChange(value) {
        console.log(value);
    }

    render() {
        const {mode} = this.props;

        let className = {
            'date-time-field': true,
            [`date-time-field-${mode}`]: true
        };

        className = classnames(className, this.props.className);

        const props = u.extend(
            u.pick(this.props, propKeys),
            {dateTime: this.state.dateTime, onChange: this.onChange}
        );

        console.log(props);

        return (
            <div className={className}>
                <DateTimeField {...props} />
            </div>
        );
    }
}
