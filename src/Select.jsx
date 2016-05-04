/**
 * @file 多级联动Select组件
 * @author guoyao(wuguoyao@baidu.com)
 **/

import './css/select.less';

import React from 'react';
import u from 'underscore';
import classnames from 'classnames';
import {DropdownButton, MenuItem} from 'react-bootstrap';
import {ValidatedInput} from 'react-bootstrap-validation';

class ItemRenderer extends React.Component {
    constructor(props, context) {
        super(props, context);

        const {selectedValue} = this.props;

        this.afterSelect = false;
        this.state = {selectedValue};
    }

    get datasource() {
        let {datasource, emptyLabel, isRawSource} = this.props;
        !emptyLabel && (emptyLabel = '请选择');
        const emptyItem = {label: emptyLabel, value: ''};
        datasource = !datasource ? [] : datasource.slice();
        if (datasource.length > 0 && datasource[0].value !== '' && !isRawSource) {
            datasource.unshift(emptyItem);
        }

        return datasource;
    }

    onSelect(e, key) {
        if (this.props.disableChange) {
            this.props.onSelect && this.props.onSelect(e, key, this.datasource, this.props.index);
            return false;
        }

        this.selectedValue = key;
        this.setState({selectedValue: key});
        this.props.onSelect && this.props.onSelect(e, key, this.datasource, this.props.index);
    }

    render() {
        if (this.datasource.length === 0) {
            return null;
        }

        const selectedValue = this.selectedValue || this.props.selectedValue;
        let selectedItem = u.find(this.datasource, item => item.value === selectedValue);
        !selectedItem && (selectedItem = this.datasource[0]);
        let title = selectedItem.label;

        return (
            <DropdownButton
                title={title}
                id={this.props.id}
                disabled={!!this.props.disabled}
                onSelect={::this.onSelect}
            >
                {
                    this.datasource.map(item => {
                        return (
                            <MenuItem
                                eventKey={item.value}
                                key={item.value}
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

export default class Select extends ValidatedInput {
    constructor(props, context) {
        super(props, context);

        const {selectedValue} = this.props;

        this.state = {selectedValue};
        this.numItemRenderer = 0;
    }

    onSelect(e, key, datasource, index) {
        const {selectHandler} = this.props;
        const selectedValue = this.state.selectedValue || key;
        let selectedValues = selectedValue.split(',');

        if (this.props.disableChange) {
            selectHandler && selectHandler(key, datasource, index, selectedValues);
            return;
        }

        let selectedItem = u.find(datasource, item => item.value === key);
        selectedValues.splice(index, selectedValues.length, key);

        if (selectedItem.children && selectedItem.children.length) {
            selectedValues.push('');
        }

        this.setState({
            selectedValue: selectedValues.join(',')
        });

        this.afterSelect = true;

        selectHandler && selectHandler(key, datasource, index, selectedValues);
        setTimeout(() => {
            this._form && this._form._validateOne(this.props.name, this._form.getValues());
        }, 0);
    }

    getValue() {
        let selectedValue = this.state.selectedValue;

        // 处理初始值本身是错误的问题
        if (selectedValue) {
            const selectedValues = selectedValue.split(',');
            const datasource = this.state.datasource || this.props.datasource;
            const values = u.pluck(datasource, 'value');
            if (!u.contains(values, selectedValues[0])) {
                return '';
            }
        }

        if (this.props.isRawSource && selectedValue === undefined) {
            selectedValue = this.props.datasource[0]
                ? this.props.datasource[0].value : '';
        }

        return selectedValue ? selectedValue.replace(/,$/, '') : '';
    }

    getInputDOMNode() {
        let target = super.getInputDOMNode();
        return target || document.getElementById(`${this.props.name}-0`);
    }

    renderLabel() {
        let controlLabel;
        let classes = {
            'control-label': 'control-label'
        };

        if (this.props.label) {
            let labelClassName = this.props.labelClassName;
            let validate = this.props.validate;
            classes[labelClassName] = labelClassName;

            if (!/\brequired\b/.test(labelClassName) &&
                (u.isString(validate) &&
                /\brequired\b/.test(validate) ||
                /\brequired\b/.test(this.props.className))) {
                classes.required = 'required';
            }

            let classNames = classnames(classes);
            let required = /\brequired\b/.test(classNames);

            controlLabel = (
                <label
                    className={classNames}
                    dangerouslySetInnerHTML={{__html: `${required ? '<i>*</i>' : ''}${this.props.label}`}}
                />
            );
        }

        return controlLabel;
    }

    // 想通过props来改item的选中值，就调用它

    setSelectedValue(itemRendererNo, val) {
        this.refs['itemRenderer' + itemRendererNo].selectedValue = val;
    }

    render() {
        let {datasource, selectedValue} = this.props;

        selectedValue = this.afterSelect
            ? this.state.selectedValue
            : selectedValue;

        this.afterSelect = false;

        let selectedValues = selectedValue && selectedValue.split(',') || [''];
        let datasources = [];
        datasource = this.state.datasource || datasource;

        if (datasource && datasource.length > 0) {
            do {
                let datasourceItem = {datasource};
                let selectedItem = u.find(datasource, item => item.value === selectedValues[0]);
                datasources.push(datasourceItem);
                if (!selectedItem) {
                    // selectedValues[0] === '' && (datasourceItem.selectedValue = '');
                    datasourceItem.selectedValue = '';
                    break;
                }
                datasourceItem.selectedValue = selectedItem.value;
                let lastValue = selectedValues.shift();
                datasource = selectedItem.children;
                if (!datasource || datasource.length === 0) {
                    break;
                }
                if (selectedValues.length === 0 && lastValue) {
                    selectedValues.push('');
                }
            }
            while (selectedValues.length > 0);
        }

        let groupClassName = {
            'select-wrap': !this.props.standalone,
            'select-wrap-lg': !this.props.standalone && this.props.bsSize === 'large',
            'select-wrap-sm': !this.props.standalone && this.props.bsSize === 'small',
            'select-wrap-hidden': this.props.isHidden,
            'has-feedback': this.props.hasFeedback,
            'has-success': this.props.bsStyle === 'success',
            'has-warning': this.props.bsStyle === 'warning',
            'has-error': this.props.bsStyle === 'error'
        };

        let className = classnames(groupClassName, this.props.groupClassName);
        this.numItemRenderer = datasources.length;
        let innerclassName = classnames('select-group', this.props.className);

        return (
            <div className={className}>
                {this.renderLabel()}
                <div className={innerclassName}>
                {
                    datasources.map((datasource, index) => {
                        // prevent warning: supply id property
                        return (
                            <ItemRenderer
                                ref={`itemRenderer${index}`}
                                datasource={datasource.datasource}
                                index={index}
                                key={index}
                                id={`${this.props.name}-${index}`}
                                isRawSource={this.props.isRawSource}
                                selectedValue={datasource.selectedValue}
                                emptyLabel={this.props.emptyLabel}
                                disabled={!!this.props.disabled}
                                disableChange={!!this.props.disableChange}
                                onSelect={::this.onSelect}
                            />
                        );
                    })
                }
                </div>
                {
                    this.props.help
                        ? (<span className="help-block" key="help">{this.props.help}</span>)
                        : null
                }
            </div>
		);
    }

    componentDidMount() {
        super.componentDidMount && super.componentDidMount();
        let {datasource} = this.props;

        // 让datasource支持调用api方法
        if (datasource && u.isFunction(datasource.then)) {
            datasource.then(response => {
                let data = response.result;
                this.setState({
                    datasource: data
                });
            });
        }
    }
}

