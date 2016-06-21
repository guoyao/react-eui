/**
 * @file 时间选择组件
 * @author guoyao(wuguoyao@baidu.com)
 **/

import './DateTimeField.less';

import u from 'underscore';
import moment from 'moment';
import React from 'react';
import classnames from 'classnames';
import {autobind, override} from 'core-decorators';
import DateTimeField from 'react-bootstrap-datetimepicker';
import Constants from 'react-bootstrap-datetimepicker/lib/Constants';

import Control from './Control';
import InputControl from './InputControl';
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

export default class DateTimeFieldEx extends InputControl {
    static propTypes = {
        ...InputControl.propTypes,
        ...DateTimeField.propTypes,

        changeHandler: React.PropTypes.func
    }

    static defaultProps = {
        ...InputControl.defaultProps,
        ...(u.omit(DateTimeField.defaultProps, 'dateTime', 'format')),

        inputProps: {},
        changeHandler: util.emptyFunc
    }

    static Mode = Mode

    static Format = DEFAULT_FORMAT

    constructor(...args) {
        super(...args);

        const {format, inputFormat, mode, value} = this.props;

        this.format = format || DEFAULT_FORMAT[mode].format;
        this.inputFormat = inputFormat || DEFAULT_FORMAT[mode].inputFormat;

        this.state = {
            value: (value ? moment(value, this.format) : moment()).format(this.format)
        };
    }

    @override
    get controlClassName() {
        const {mode} = this.props;

        let className = {
            'eui-date-time-field': true,
            [`eui-date-time-field-${mode}`]: true
        };

        return classnames(super.controlClassName, className);
    }

    @override
    getValue() {
        let value = this.state.value;

        if (/Z$/.test(this.format)) {
            value = timeUtil.timeToUtc(value);
        }

        return value;
    }

    @autobind
    changeHandler(value) {
        this.setState({value}, () => {
            this.props.changeHandler(this.getValue());
        });
    }

    componentWillReceiveProps(nextProps) {
        super.componentWillReceiveProps && super.componentWillReceiveProps(nextProps);

        if (this.props.value !== nextProps.value) {
            this.setState({
                value: moment(nextProps.value, this.format).format(this.format)
            });
        }
    }

    @override
    renderControl() {
        const props = u.extend(
            {key: ''},
            u.pick(this.props, propKeys),
            {
                dateTime: this.state.value,
                onChange: this.changeHandler,
                format: this.format,
                inputFormat: this.inputFormat
            }
        );

        props.inputProps.readOnly = true;

        return (
            <Control className={this.controlClassName}>
                <DateTimeField {...props} />
            </Control>
        );
    }
}
