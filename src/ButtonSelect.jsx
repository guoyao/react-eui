/**
* @file 按钮选择组件
* @author guoyao(wuguoyao@baidu.com)
**/

import u from 'underscore';
import React from 'react';
import classnames from 'classnames';

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
        keepOne: React.PropTypes.bool, // 是否至少保持一个处于选中状态
        datasource: React.PropTypes.arrayOf(React.PropTypes.object),
        changeHandler: React.PropTypes.func
    }

    static defaultProps = {
        ...InputControl.defaultProps,

        itemRenderer: ButtonSelectItemRenderer,
        multiple: true,
        keepOne: false,

        /* eslint-disable no-unused-vars */
        changeHandler: (value) => {}
        /* eslint-enable no-unused-vars */
    }

    constructor(...args) {
        super(...args);

        const {datasource, value, multiple} = this.props;

        this.state = {
            datasource,
            value: buildValue(multiple, value)
        };
    }

    get controlClassName() {
        return classnames(super.controlClassName, 'eui-button-select');
    }

    getValue() {
        return this.state.value;
    }

    changeHandler = (value, checked) => {
        const values = u.isString(this.state.value) ? this.state.value.split(',') : [];
        const index = u.findIndex(values, (v) => v === value);

        if (checked) {
            !this.props.multiple && values.splice(0, values.length);
            index === -1 && values.push(value);
        }
        else if (index !== -1 && !(this.props.keepOne && values.length === 1)) {
            values.splice(index, 1);
        }

        var oldValue = this.getValue();
        var newValue = values.join(',');

        this.setState({value: values.join(',')}, () => {
            if (oldValue !== newValue) {
                this.props.changeHandler(this.getValue());
            }
        });
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

    renderControl() {
        const {datasource, value} = this.state;

        if (!datasource || datasource.length === 0) {
            return null;
        }

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
