/**
 * @file demo for Select component
 * @author guoyao(wuguoyao@baidu.com)
 **/
import React from 'react';

import {Select, Validator} from '../../index';

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

export default class SelectDemo extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = {datasource};
        this.selectHandler = this.selectHandler.bind(this);
        // this.usages();
    }

    usages() {
        setTimeout(() => {
            this.setState({datasource: [
                {
                    label: 'label001',
                    value: 'value-5',
                    children: [
                        {label: 'label001-1', value: 'value-001-1'},
                        {
                            label: 'label001-2',
                            value: 'value-001-2',
                            children: [
                                {label: 'label001-2-1', value: 'value-001-2-1'},
                                {label: 'label001-2-2', value: 'value-001-2-2'},
                                {label: 'label001-2-3', value: 'value-001-2-3'},
                            ]
                        },
                        {label: 'label001-3', value: 'value-001-3'}
                    ]
                },
            ], selectedValue: 'value-5,value-001-2,value-001-2-3'});
        }, 3000);

        setTimeout(() => {
            console.log(this.refs.select.getValue());
        }, 5000);
    }

    selectHandler(value, datasource, index, selectedValues) {
        console.log(value, datasource, index, selectedValues);
    }

    render() {
        return (
            <div>
                <section>
                    <Select datasource={this.state.datasource} />

                    <Select
                        label="地区"
                        wrapperClassName="eui-wrapper"
                        datasource={this.state.datasource}
                        value={this.state.value}
                    />

                    <Select
                        label="地区"
                        wrapperClassName="eui-wrapper"
                        validate="required"
                        datasource={this.state.datasource}
                        value={this.state.value}
                        selectHandler={this.selectHandler}
                        errorHelp={{
                            required: '请选择地区'
                        }}
                    />

                    <Select
                        ref="select"
                        name="region"
                        label="地区"
                        className="required"
                        wrapperClassName="eui-wrapper"
                        datasource={this.state.datasource}
                        value={this.state.value}
                        selectHandler={this.selectHandler}
                        validate={value => {
                            let requiredLength = this.refs.select.numItemRenderer;
                            return Validator.allRequired(value, {
                                requiredLength: requiredLength,
                                errorHelp: {allRequired: '请选择地区'}
                            });
                        }}
                    />
                </section>
                <section>
                    <Select
                        label="地区"
                        groupClassName="horizontal"
                        labelClassName="col-sm-2"
                        wrapperClassName="col-sm-10"
                        datasource={this.state.datasource}
                        value={this.state.value}
                        selectHandler={this.selectHandler}
                    />

                    <Select
                        label="地区"
                        groupClassName="horizontal"
                        labelClassName="col-sm-2"
                        wrapperClassName="col-sm-10"
                        validate="required"
                        datasource={this.state.datasource}
                        value={this.state.value}
                        selectHandler={this.selectHandler}
                        errorHelp={{
                            required: '请选择地区'
                        }}
                    />

                    <Select
                        ref="select1"
                        label="地区"
                        className="required"
                        groupClassName="horizontal"
                        labelClassName="col-sm-2"
                        wrapperClassName="col-sm-10"
                        datasource={this.state.datasource}
                        value={this.state.value}
                        selectHandler={this.selectHandler}
                        validate={value => {
                            let requiredLength = this.refs.select1.numItemRenderer;
                            return Validator.allRequired(value, {
                                requiredLength: requiredLength,
                                errorHelp: {allRequired: '请选择地区'}
                            });
                        }}
                    />
                </section>
            </div>
        );
    }
}
