/**
 * @file 多级联动Select组件
 * @author guoyao(wuguoyao@baidu.com)
 **/

import './css/Select.less';

import u from 'underscore';
import React from 'react';
import classnames from 'classnames';
import {DropdownButton, MenuItem} from 'react-bootstrap';

import Control from './Control';
import InputControl from './InputControl';

class ItemRenderer extends Control {
    static propTypes = {
        ...Control.propTypes,
        selectHandler: React.PropTypes.func
    }

    static defaultProps = {
        ...Control.defaultProps,

        /* eslint-disable no-unused-vars */
        selectHandler: (e, value, datasource, index) => {}
        /* eslint-enable no-unused-vars */
    }

    constructor(...args) {
        super(...args);

        this.state = {value: this.props.value};
        this.selectHandler = this.selectHandler.bind(this);
        this.datasource = this.getDatasource(this.props);
    }

    getDatasource(props) {
        const isRawSource = props.isRawSource;
        let {datasource, emptyLabel} = props;

        datasource = !datasource ? [] : datasource.slice();

        if (!isRawSource && datasource[0] && datasource[0].value !== '') {
            datasource.unshift({label: emptyLabel || '请选择', value: ''});
        }

        return datasource;
    }

    selectHandler(e, value) {
        if (this.props.disableChange) {
            this.props.selectHandler(e, value, this.datasource, this.props.index);

            return false;
        }

        this.setState({value}, () => {
            this.props.selectHandler(e, value, this.datasource, this.props.index);
        });
    }

    componentWillReceiveProps(nextProps) {
        super.componentWillReceiveProps && super.componentWillReceiveProps(nextProps);

        if (this.props.value !== nextProps.value) {
            this.setState({value: nextProps.value});
        }

        if (this.props.datasource !== nextProps.datasource) {
            this.datasource = this.getDatasource(nextProps);
        }
    }

    renderControl() {
        if (this.datasource.length === 0) {
            return null;
        }

        const value = this.state.value;

        let selectedItem = u.find(this.datasource, item => item.value === value);
        !selectedItem && (selectedItem = this.datasource[0]);

        let title = selectedItem.label;

        return (
            <DropdownButton
                id={this.props.id}
                title={title}
                disabled={!!this.props.disabled}
                onSelect={this.selectHandler}
            >
            {
                this.datasource.map(item => {
                    return (
                        <MenuItem
                            key={item.value}
                            eventKey={item.value}
                            disabled={!!item.disabled}
                        >
                            {item.label}
                        </MenuItem>
                    );
                })
            }
            </DropdownButton>
        );
    }
}

export default class Select extends InputControl {
    static propTypes = {
        ...InputControl.propTypes,
        selectHandler: React.PropTypes.func
    }

    static defaultProps = {
        ...InputControl.defaultProps,

        /* eslint-disable no-unused-vars */
        /**
         * 选择后的回调函数
         *
         * @param  {string} value         所选的那个子下拉组件的值
         * @param  {Array} datasource     所选的那个子下拉组件的数据源
         * @param  {int} index            所选的那个子下拉组件的序号，即第几个子下拉组件
         * @param  {Array} selectedValues 选择的值的集合
         */
        selectHandler: (value, datasource, index, selectedValues) => {}
        /* eslint-enable no-unused-vars */
    }

    constructor(...args) {
        super(...args);

        this.state = u.pick(this.props, 'datasource', 'value');
        this.numItemRenderer = 0;
        this.selectHandler = this.selectHandler.bind(this);
    }

    get controlClassName() {
        return classnames(super.controlClassName, 'eui-select');
    }

    selectHandler(e, value, datasource, index) {
        const {selectHandler} = this.props;
        const selectedValue = this.state.value || value;

        let selectedValues = selectedValue.split(',');

        if (this.props.disableChange) {
            selectHandler(value, datasource, index, selectedValues);
            return;
        }

        selectedValues.splice(index, selectedValues.length, value);

        let selectedItem = u.find(datasource, item => item.value === value);

        if (selectedItem.children && selectedItem.children.length) {
            selectedValues.push(this.props.isRawSource && selectedItem.children[0] &&
                selectedItem.children[0].value || '');
        }

        this.setState({value: selectedValues.join(',')}, () => {
            this.validate();
            selectHandler(value, datasource, index, selectedValues);
        });
    }

    getValue() {
        let {datasource, value} = this.state;

        // 处理初始值本身是错误的问题
        if (value) {
            const selectedValues = value.split(',');
            const values = [];

            for (var i = 0, length = selectedValues.length; i < length; i++) {
                if (!datasource || datasource.length === 0) {
                    break;
                }

                let index = u.findIndex(u.pluck(datasource, 'value'), v => v === selectedValues[i]);
                if (index > -1) {
                    values.push(selectedValues[i]);
                    datasource = datasource[index].children;
                }
                else {
                    this.props.isRawSource && values.push(datasource[0].value || '');
                    break;
                }
            }

            value = values.join(',');
        }

        if (this.props.isRawSource && value === undefined) {
            value = datasource[0] ? datasource[0].value : '';
        }

        return value ? value.replace(/,$/, '') : '';
    }

    getInputDOMNode() {
        let target = super.getInputDOMNode();
        return target || document.getElementById(`${this.props.name}-0`);
    }

    componentWillReceiveProps(nextProps) {
        super.componentWillReceiveProps && super.componentWillReceiveProps(nextProps);

        const {datasource, value} = nextProps;

        if (this.props.datasource !== datasource) {
            this.setState({datasource});
        }

        if (this.props.value !== value) {
            this.setState({value});
        }
    }

    renderControl() {
        const {value} = this.state;

        let {datasource} = this.state;
        let selectedValues = value && value.split(',') || [''];
        let datasources = [];

        if (datasource && datasource.length > 0) {
            do {
                let datasourceItem = {datasource};
                let selectedItem = u.find(datasource, item => item.value === selectedValues[0]);
                datasources.push(datasourceItem);

                if (!selectedItem) {
                    datasourceItem.value = '';
                    break;
                }

                datasourceItem.value = selectedItem.value;
                datasource = selectedItem.children;

                if (!datasource || datasource.length === 0) {
                    break;
                }

                if (selectedValues.shift() && selectedValues.length === 0) {
                    selectedValues.push('');
                }
            }
            while (selectedValues.length > 0);
        }

        this.numItemRenderer = datasources.length;

        return (
            <Control className={this.controlClassName}>
            {
                datasources.map((datasource, index) => {
                    return (
                        <ItemRenderer
                            key={index}
                            index={index}
                            id={`${this.props.name}-${index}`}
                            ref={`itemRenderer${index}`}
                            datasource={datasource.datasource}
                            isRawSource={this.props.isRawSource}
                            value={datasource.value}
                            emptyLabel={this.props.emptyLabel}
                            disabled={!!this.props.disabled}
                            disableChange={!!this.props.disableChange}
                            selectHandler={this.selectHandler}
                        />
                    );
                })
            }
            </Control>
        );
    }
}
