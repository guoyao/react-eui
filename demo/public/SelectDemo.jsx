/**
 * @file demo for Select component
 * @author guoyao(wuguoyao@baidu.com)
 **/
import React from 'react';
import {Select, Form} from '../../index';

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
        this.state = {datasource: datasource};
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
        this.setState({selectedValue: selectedValues.join(',')});
    }

    render() {
        return (
            <Form>
                <Select
                    ref="select"
                    name="region"
                    datasource={this.state.datasource}
                    selectedValue={this.state.selectedValue}
                    selectHandler={this.selectHandler}
                />
            </Form>
        );
    }
}
