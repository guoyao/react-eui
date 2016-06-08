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
import Constants from 'react-bootstrap-datetimepicker/lib/Constants'

import ValidatedInput from './ValidatedInput';
import Wrapper from './Wrapper';
import timeUtil from './util/timeUtil';
import util from './util/util';

const Mode = {
    date: Constants.MODE_DATE,
    datetime: Constants.MODE_DATETIME,
    time: Constants.MODE_TIME
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
        format: 'HH:mm:ss',
        inputFormat: 'HH:mm:ss'
    }
};

const propKeys = u.keys(DateTimeField.propTypes);

export default class DateTimeFieldEx extends ValidatedInput {
    static propTypes = {
        ...ValidatedInput.propTypes,
        ...DateTimeField.propTypes,
        changeHandler: React.PropTypes.func
    }

    static defaultProps = {
        ...ValidatedInput.defaultProps,
        ...(u.omit(DateTimeField.defaultProps, 'dateTime', 'format')),
        inputProps: {},
        changeHandler: util.emptyFunc
    }

    static Mode = Mode

    static Format = DEFAULT_FORMAT

    constructor(...args) {
        super(...args);

        const {format, inputFormat, mode, dateTime} = this.props;

        this.format = format || DEFAULT_FORMAT[mode].format;
        this.inputFormat = inputFormat || DEFAULT_FORMAT[mode].inputFormat;

        this.state = {
            dateTime: (dateTime ? moment(dateTime, this.format) : moment()).format(this.format)
        };

        this.changeHandler = this.changeHandler.bind(this);
    }

    getValue() {
        let dateTime = this.state.dateTime;

        if (/Z$/.test(this.format)) {
            dateTime = timeUtil.timeToUtc(dateTime);
        }

        return dateTime;
    }

    changeHandler(value) {
        this.setState({dateTime: value}, () => {
            this.props.changeHandler(this.getValue());
        });
    }

    componentWillReceiveProps(nextProps) {
        super.componentWillReceiveProps && super.componentWillReceiveProps(nextProps);

        if (this.props.dateTime !== nextProps.dateTime) {
            this.setState({
                dateTime: moment(nextProps.dateTime, this.format).format(this.format)
            });
        }
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

        props.inputProps.readOnly = true;

        return Wrapper.createWrapper(
            {className},
            <DateTimeField {...props} />
        );
    }
}
