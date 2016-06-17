/**
 * @file demo for MultiSelect component
 * @author guoyao(wuguoyao@baidu.com)
 **/

import React from 'react';
import {MultiSelect} from '../../index';

const datasource = ['北京', '深圳', '青岛', '杭州', '香港', '美国硅谷', '上海', '亚太（新加坡）'];
const datasource2 = [
    {label: '北京', value: 'Beijing'},
    {label: '上海', value: 'Shanghai'},
    {label: '深圳', value: 'Shenzhen'}
];
const datasource3 = [
    {text: '北京', value: 'Beijing'},
    {text: '上海', value: 'Shanghai'},
    {text: '深圳', value: 'Shenzhen'}
];
const datasource4 = [
    {text: '北京', value: 'Beijing'},
    '上海',
    '深圳'
];

export default class MultiSelectDemo extends React.Component {
    constructor(...args) {
        super(...args);

        this.changeHandler = this.changeHandler.bind(this);
    }

    changeHandler(value, itemValue, itemChecked) {
        console.log(value, itemValue, itemChecked);
    }

    render() {
        return (
            <div>
                <MultiSelect
                    label="地区"
                    value="上海,美国硅谷,广州,Shanghai,Shenzhen"
                    datasource={datasource}
                    changeHandler={this.changeHandler}
                />
                <MultiSelect
                    label="地区"
                    value="上海,美国硅谷,广州,Shanghai,Shenzhen"
                    datasource={datasource2}
                    changeHandler={this.changeHandler}
                />
                <MultiSelect
                    label="地区"
                    labelField="text"
                    valueField="value"
                    value="上海,美国硅谷,广州,Shanghai,Shenzhen"
                    datasource={datasource3}
                    changeHandler={this.changeHandler}
                />
                <MultiSelect
                    label="地区"
                    labelField="text"
                    valueField="value"
                    value="上海,美国硅谷,广州,Shanghai,Shenzhen"
                    datasource={datasource4}
                    changeHandler={this.changeHandler}
                />
            </div>
        );
    }
}
