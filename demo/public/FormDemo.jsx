/**
 * @file demo for InputControl
 * @author guoyao(wuguoyao@baidu.com)
 **/

import React from 'react';
import {autobind} from 'core-decorators';

import {
    Validator,
    InputControl,
    Select,
    DateTimeField,
    DateTimeRange,
    ButtonSelect,
    Form
} from '../../src/index';

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

const datasource2 = [
    {label: '全部', value: ''},
    {label: 'label1', value: 'value1'},
    {label: 'label2', value: 'value2'},
    {label: 'label3', value: 'value3'}
];

export default class FormDemo extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = {datasource};
    }

    @autobind
    changeHandler(value) {
        console.log(value);
    }

    @autobind
    selectHandler(value, datasource, index, selectedValues) {
        console.log(value, datasource, index, selectedValues);
    }

    @autobind
    validSubmitHandler(values) {
        console.log(values);
    }

    render() {
        return (
            <div>
                <section>
                    <Form onValidSubmit={this.validSubmitHandler}>
                        <InputControl>最简单的纯文本</InputControl>

                        <InputControl
                            name="pureText1"
                            label="带name和label属性的纯文本，值由value属性决定，没有value属性则值为undefined"
                            wrapperClassName="eui-wrapper"
                            >
                            带name和label的纯文本
                        </InputControl>

                        <InputControl
                            name="pureText2"
                            value="pure-text"
                            className="text-primary"
                            >
                            带value不带label的纯文本
                        </InputControl>

                        <InputControl type="text" label="无name属性不会出现在表单提交中" />

                        <ButtonSelect
                            name="payment"
                            datasource={datasource2}
                            validate="required"
                            errorHelp={{
                                required: '请选择'
                            }}
                        />

                        <br />

                        <button type="submit">提交</button>
                    </Form>
                </section>

                <section>
                    <Form onValidSubmit={this.validSubmitHandler}>
                        <InputControl
                            type="text"
                            name="abstract"
                            label="标题"
                            groupClassName="horizontal"
                            labelClassName="col-sm-2"
                            wrapperClassName="col-sm-10"
                            validate="required"
                            errorHelp={{
                                required: '请填写'
                            }}
                        />

                        <InputControl
                            type="text"
                            name="abstract2"
                            label="概要内容"
                            groupClassName="horizontal"
                            labelClassName="col-sm-2"
                            wrapperClassName="col-sm-10"
                        />

                        <InputControl
                            type="textarea"
                            name="detai2"
                            label="详细信息"
                            groupClassName="horizontal"
                            labelClassName="col-sm-2"
                            wrapperClassName="col-sm-10"
                            validate='required,isLength:0:30'
                            errorHelp={{
                                required: '请填写',
                                isLength: "最大字符长度限制为30"
                            }}
                        />

                        <InputControl
                            type="textarea"
                            name="remark"
                            label="备注"
                            groupClassName="horizontal"
                            labelClassName="col-sm-2"
                            wrapperClassName="col-sm-10"
                            showLengthTip={false}
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
                            groupClassName="horizontal"
                            labelClassName="col-sm-2"
                            wrapperClassName="col-sm-10"
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
                            groupClassName="horizontal"
                            labelClassName="col-sm-2"
                            wrapperClassName="col-sm-10"
                            changeHandler={this.changeHandler}
                        />

                        <DateTimeRange
                            name="range"
                            label="时间段"
                            className="required"
                            groupClassName="horizontal"
                            labelClassName="col-sm-2"
                            wrapperClassName="col-sm-10"
                            validate="isTimeRange"
                            errorHelp={{
                                isTimeRange: '结束时间必须晚于开始时间'
                            }}
                        />

                        <div className="col-sm-10 col-sm-offset-2">
                            <button type="submit">提交</button>
                        </div>
                    </Form>
                </section>
            </div>
        );
    }
}
