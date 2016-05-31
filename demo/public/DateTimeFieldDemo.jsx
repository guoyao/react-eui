/**
 * @file demo for DateTimeRange component
 * @author guoyao(wuguoyao@baidu.com)
 **/
import React from 'react';
import {DateTimeField} from '../../index';

export default class DateTimeFieldDemo extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = {};
        this.changeHandler = this.changeHandler.bind(this);
    }

    changeHandler(value) {
        console.log(value);
    }

    render() {
        return (
            <div>
                <DateTimeField
                    mode={DateTimeField.Mode.date}
                    format={DateTimeField.Format.date.format}
                    inputFormat={DateTimeField.Format.date.inputFormat}
                    inputProps={{readOnly: true}}
                />
                <DateTimeField
                    mode={DateTimeField.Mode.time}
                    format={DateTimeField.Format.time.format}
                    inputFormat={DateTimeField.Format.time.inputFormat}
                    inputProps={{readOnly: true}}
                />
                <DateTimeField
                    mode={DateTimeField.Mode.datetime}
                    format={DateTimeField.Format.datetime.foramt}
                    inputFormat={DateTimeField.Format.datetime.inputFormat}
                    inputProps={{readOnly: true}}
                />
            </div>
        );
    }
}
