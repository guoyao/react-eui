/**
 * @file demo for DateTimeRange component
 * @author guoyao(wuguoyao@baidu.com)
 **/
import React from 'react';
import {autobind} from 'core-decorators';

import {ButtonSelect} from '../../index';

export default class ButtonSelectDemo extends React.Component {
    constructor(...args) {
        super(...args);
    }

    @autobind
    changeHandler(value) {
        console.log(value);
    }

    render() {
        return (
            <div>
                <section>
                    <ButtonSelect />
                </section>
            </div>
        );
    }
}
