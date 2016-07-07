/**
* @file 按钮选择组件
* @author guoyao(wuguoyao@baidu.com)
**/

import './ButtonSelect.less';

import u from 'underscore';
import React from 'react';
import classnames from 'classnames';
import {autobind, override} from 'core-decorators';

import Control from './Control';
import InputControl from './InputControl';
import ButtonSelectItemRenderer from './itemRenderers/ButtonSelectItemRenderer';

function buildValue(multiple, value) {
    if (!multiple && value) {
        return value.split(',')[0];
    }

    return value;
}

export default class ButtonSelect extends InputControl {
    static propTypes = {
        ...InputControl.propTypes,

        itemRenderer: React.PropTypes.func,
        multiple: React.PropTypes.bool,
        datasource: React.PropTypes.arrayOf(React.PropTypes.object),
        changeHandler: React.PropTypes.func
    }

    static defaultProps = {
        ...InputControl.defaultProps,

        itemRenderer: ButtonSelectItemRenderer,
        multiple: true,
        changeHandler: (value) => {}
    }

    constructor(...args) {
        super(...args);

        const {datasource, value, multiple} = this.props;

        this.state = {
            datasource,
            value: buildValue(multiple, value)
        };
    }

    @override
    get controlClassName() {
        return classnames(super.controlClassName, 'eui-button-select');
    }

    @override
    getValue() {
        return this.state.value;
    }

    @autobind
    changeHandler(value, checked) {
        const values = this.state.value ? this.state.value.split(',') : [];
        const index = u.findIndex(values, (v) => v === value);

        if (checked) {
            !this.props.multiple && values.splice(0, values.length);
            index === -1 && values.push(value);
        }
        else if (index !== -1) {
            values.splice(index, 1);
        }

        this.setState({value: values.join(',')}, () => {
            this.props.changeHandler(this.state.value);
        })
    }

    componentWillReceiveProps(nextProps) {
        super.componentWillReceiveProps && super.componentWillReceiveProps(nextProps);

        const {datasource, value} = nextProps;

        if (this.props.datasource !== datasource) {
            this.setState({datasource});
        }

        if (this.props.value !== value) {
            this.setState({value: buildValue(this.props.multiple, value)});
        }
    }

    @override
    renderControl() {
        const {datasource, value} = this.state;

        return (
            <Control className={this.controlClassName}>
            {
                datasource.map((item, index) => {
                    return (
                        <this.props.itemRenderer
                            key={index}
                            className="btn-group"
                            data-toggle="buttons"
                            data={item}
                            parent={this}
                            parentValue={value}
                            changeHandler={this.changeHandler}
                        />
                    );
                })
            }
            </Control>
        );
    }
}
