/**
 * @file demo for InputControl
 * @author guoyao(wuguoyao@baidu.com)
 **/

import React from 'react';

import {
    Validator,
    InputControl,
    Select,
    DateTimeField,
    DateTimeRange,
    Form
} from '../../index';

const datasource = [
    {label: 'item-1', value: 'value-1'},
    {label: 'item-2', value: 'value-2', children: [
        {label: 'item-2-1', value: 'value-2-1'},
        {label: 'item-2-2', value: 'value-2-2'},
        {label: 'item-2-3', value: 'value-2-3'}
    ]},
    {label: 'item-3', value: 'value-3'},
    {label: 'item-4', value: 'value-4'},
    {label: 'item-5', value: 'value-5', children: [
        {label: 'item-5-1', value: 'value-5-1'},
        {label: 'item-5-2', value: 'value-5-2', children: [
            {label: 'item-5-2-1', value: 'value-5-2-1'},
            {label: 'item-5-2-2', value: 'value-5-2-2'},
            {label: 'item-5-2-3', value: 'value-5-2-3'}
        ]},
        {label: 'item-5-3', value: 'value-5-3'}
    ]}
];

export default class FormDemo extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = {datasource};
        this.changeHandler = this.changeHandler.bind(this);
        this.selectHandler = this.selectHandler.bind(this);
        this.validSubmitHandler = this.validSubmitHandler.bind(this);
    }

    changeHandler(value) {
        console.log(value);
    }

    selectHandler(value, datasource, index, selectedValues) {
        console.log(value, datasource, index, selectedValues);
    }

    validSubmitHandler(values) {
        console.log(values);
    }

    render() {
        return (
            <Form onValidSubmit={this.validSubmitHandler} className="row">
                <div className="col-md-6">
                    <InputControl>纯文本1</InputControl>
                    <InputControl
                        name="pureText1"
                        label="带name和label属性的纯文本，值由value属性决定，没有value属性则值为undefined"
                        groupClassName="vertical"
                    >
                        纯文本1
                    </InputControl>
                    <InputControl
                        name="pureText2"
                        value="pure-text"
                        className="text-primary"
                    >
                        纯文本2
                    </InputControl>

                    <InputControl type="text" label="无name属性不会出现在表单提交中" />
                    <InputControl
                        type="text"
                        name="abstract"
                        label="标题"
                        validate="required"
                        errorHelp={{
                            required: '请填写'
                        }}
                    />
                    <InputControl type="text" name="abstract2" label="概要内容" />

                    <InputControl type="textarea" name="detail1" />
                    <InputControl
                        type="textarea"
                        name="detai2"
                        label="详细信息"
                        validate='required,isLength:0:30'
                        errorHelp={{
                            required: '请填写',
                            isLength: "最大字符长度限制为30"
                        }}
                    />

                    <Select
                        ref="region"
                        name="region"
                        label="地区"
                        className="required"
                        datasource={this.state.datasource}
                        value={this.state.value}
                        selectHandler={this.selectHandler}
                        validate={value => {
                            let requiredLength = this.refs.region.numItemRenderer;
                            return Validator.allRequired(value, {
                                requiredLength: requiredLength,
                                errorHelp: {allRequired: '请选择地区'}
                            });
                        }}
                    />

                    <DateTimeField
                        label="日期时间"
                        name="datetime"
                        value="2016-06-01T08:00:00Z"
                        changeHandler={this.changeHandler}
                    />

                    <DateTimeRange
                        name="range"
                        label="时间段"
                        className="required"
                        groupClassName="vertical"
                        validate="isTimeRange"
                        errorHelp={{
                            isTimeRange: '结束时间必须晚于开始时间'
                        }}
                    />

                    <button type="submit" bsStyle="primary">提交</button>
                </div>
            </Form>
        );
    }
}
