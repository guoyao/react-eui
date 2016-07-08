/**
 * @file demo for DateTimeRange component
 * @author guoyao(wuguoyao@baidu.com)
 **/

import React from 'react';
import {autobind} from 'core-decorators';

import {ButtonSelect} from '../../index';

const datasource = [
    {label: 'label1', value: 'value1'},
    {label: 'label2', value: 'value2'},
    {label: 'label3', value: 'value3'}
];

export default class ButtonSelectDemo extends React.Component {
    constructor(...args) {
        super(...args);

        this.state = {datasource, value: 'value1,value3'};

        setTimeout(() => {
            this.usage();
        }, 5000);
    }

    @autobind
    changeHandler(value) {
        console.log(value);
    }

    usage() {
        this.setState({value: 'value2,value3'});
    }

    render() {
        return (
            <div>
                <section>
                    <ButtonSelect datasource={this.state.datasource} />
                    <br />
                    <ButtonSelect
                        datasource={this.state.datasource}
                        value={this.state.value}
                        changeHandler={this.changeHandler}
                    />
                    <br />
                    <ButtonSelect
                        multiple={false}
                        datasource={this.state.datasource}
                        value={this.state.value}
                        changeHandler={this.changeHandler}
                    />
                    <ButtonSelect
                        label="多选"
                        wrapperClassName="eui-wrapper"
                        datasource={this.state.datasource}
                        value={this.state.value}
                        changeHandler={this.changeHandler}
                    />
                    <ButtonSelect
                        label="单选"
                        wrapperClassName="eui-wrapper"
                        multiple={false}
                        datasource={this.state.datasource}
                        value={this.state.value}
                        changeHandler={this.changeHandler}
                    />
                </section>
            </div>
        );
    }
}
