/**
 * @file 多选下拉控件
 * @author chenqiang(chenqiang03@baidu.com)
 */

import './MultiSelect.less';

import u from 'underscore';
import classnames from 'classnames';
import React from 'react';
import {autobind, override} from 'core-decorators';

import addEventListener from 'react-overlays/lib/utils/addEventListener';
import ownerDocument from 'react-overlays/lib/utils/ownerDocument';

import Control from './Control';
import InputControl from './InputControl';

function getSuppressRootClose() {
    let id = Symbol('__click_was_inside');

    return {
        id,
        suppressRootClose(event) {
            // Tag the native event to prevent the root close logic on document click.
            // This seems safer than using event.nativeEvent.stopImmediatePropagation(),
            // which is only supported in IE >= 9.
            event.nativeEvent[id] = true;
        }
    };
}

function getLabel(item, labelField) {
    return u.isObject(item) ? item[labelField] : item;
}

function getValue(item, valueField) {
    return u.isObject(item) ? item[valueField] : item;
}

export default class MultiSelect extends InputControl {
    static propTypes = {
        ...InputControl.propTypes,

        labelField: React.PropTypes.string,
        valueField: React.PropTypes.string,
        datasource: React.PropTypes.array,
        changeHandler: React.PropTypes.func
    }

    static defaultProps = {
        ...InputControl.defaultProps,

        labelField: 'label',
        valueField: 'value',

        /* eslint-disable */
        /**
         * 选择后的回调函数
         *
         * @param  {string} value         选中的所有值
         * @param  {string} itemValue     子组件的值
         * @param  {boolean} itemChecked  子组件的选中状态
         */
        changeHandler: (value, itemValue, itemChecked) => {}
        /* eslint-enable */
    }

    constructor(...args) {
        super(...args);

        this.state = {
            show: false,
            datasource: this.props.datasource,
            value: this.props.value
        };
    }

    @override
    get controlClassName() {
        return classnames(super.controlClassName, 'eui-multi-select');
    }

    get filteredValue() {
        const {value, datasource} = this.state;
        const values = value ? value.split(',') : [];
        const newValues = [];

        // 过滤掉不合法的value，即不在datasource里面的value
        u.each(values, (value) => {
            let item = u.find(datasource, v => {
                return getValue(v, this.props.valueField) === value;
            });

            item && newValues.push(getValue(item, this.props.valueField));
        });

        return newValues.join();
    }

    @override
    getValue() {
        return this.filteredValue;
    }

    componentWillMount() {
        super.componentWillMount && super.componentWillMount();

        let {id, suppressRootClose} = getSuppressRootClose();

        this._suppressRootId = id;
        this._suppressRootCloseHandler = suppressRootClose.bind(this);
    }

    componentDidMount() {
        super.componentDidMount && super.componentDidMount();

        // bindRootCloseHandler
        const doc = ownerDocument(this);
        this._onDocumentClickListener = addEventListener(doc, 'click', this.handleDocumentClick);
    }

    @autobind
    changeHandler(e) {
        const itemChecked = e.target.checked;
        const itemValue = e.target.value;
        const values = this.state.value ? this.state.value.split(',') : [];

        if (itemChecked) {
            values.push(itemValue);
        }
        else {
            let index = u.indexOf(values, itemValue);
            values.splice(index, 1);
        }

        let value = values.join();

        this.setState({value}, () => {
            this.props.changeHandler(this.filteredValue, itemValue, itemChecked);
        });
    }

    @autobind
    toggleDropdown() {
        this.state.show ? this.closeDropdown() : this.openDropdown();
    }

    openDropdown() {
        this.setState({show: true});
    }

    closeDropdown() {
        this.setState({show: false});
    }

    @autobind
    handleDocumentClick(e) {
        // This is now the native event.
        if (e[this._suppressRootId]) {
            return;
        }

        this.closeDropdown();
    }

    componentWillReceiveProps(nextProps) {
        super.componentWillReceiveProps && super.componentWillReceiveProps(nextProps);

        if (this.props.value !== nextProps.value) {
            this.setState({value: nextProps.value});
        }

        if (this.props.datasource !== nextProps.datasource) {
            this.datasource = nextProps.datasource;
        }
    }

    renderDropdown() {
        const {datasource, labelField, valueField} = this.props;
        const values = this.state.value ? this.state.value.split(',') : [];

        return (
            <ul className={this.state.show ? 'eui-multi-select-list active' : 'eui-multi-select-list'}>
            {
                datasource.map((item, key) => {
                    const label = getLabel(item, labelField);
                    const value = getValue(item, valueField);

                    return (
                        <li key={key} className={u.contains(values, value) ? 'active' : ''}>
                            <label>
                                <input
                                    type="checkbox"
                                    defaultValue={value}
                                    defaultChecked={u.contains(values, value)}
                                    onChange={this.changeHandler}
                                />
                                <span>{label}</span>
                            </label>
                        </li>
                    );
                })
            }
            </ul>
        );
    }

    @override
    renderControl() {
        const {datasource} = this.props;
        const values = this.state.value ? this.state.value.split(',') : [];
        const labels = [];

        u.each(values, (value) => {
            let item = u.find(datasource, v => {
                return getValue(v, this.props.valueField) === value;
            });

            item && labels.push(getLabel(item, this.props.labelField));
        });

        const displayContent = labels.join() || '请选择';

        return (
            <Control className={this.controlClassName} onClick={this._suppressRootCloseHandler}>
                <div
                    className="eui-multi-select-head"
                    title={displayContent}
                    onClick={this.toggleDropdown}
                >
                    {displayContent}
                </div>
                {this.renderDropdown()}
            </Control>
        );
    }

    componentWillUnmount() {
        super.componentWillUnmount && super.componentWillUnmount();

        // unbindRootCloseHandler
        if (this._onDocumentClickListener) {
            this._onDocumentClickListener.remove();
        }
    }
}
