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

export default class DateTimeFieldEx extends DateTimeField {
    static get propTypes() {
        return {
            ...DateTimeField.propTypes,
            valueFormatter: React.PropTypes.func
        };
    }

    static get defaultProps() {
        return {
            ...DateTimeField.defaultProps,
            valueFormatter: v => v
        };
    }

    static get Mode() {
        return Mode;
    }

    static get Format() {
        return DEFAULT_FORMAT;
    }

    constructor(props, context) {
        super(props, context);
    }

    render() {
        const {mode, startInputProps, endInputProps} = this.props;

        let className = {
            'date-time-field': true,
            [`date-time-field-${mode}`]: true
        };

        className = classnames(className, this.props.className);

        return (
            <div className={className}>
                {super.render()}
            </div>
        );
    }
}
