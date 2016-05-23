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
    static propTypes = {
        ...React.Component.propTypes,
        selectHandler: React.PropTypes.func
    }

    static defaultProps = {
        ...React.Component.defaultProps,
        selectHandler: (e, value, datasource, index) => {}
    }

    constructor(props, context) {
        super(props, context);

        this.state = {selectedValue: this.props.selectedValue};
        this.selectHandler = this.selectHandler.bind(this);
        // this.datasource = this.getDatasource();
    }

    get datasource() {
        const isRawSource = this.props.isRawSource;
        let {datasource, emptyLabel} = this.props;

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

        this.setState({selectedValue: value});
        this.props.selectHandler(e, value, this.datasource, this.props.index);
    }

    render() {
        if (this.datasource.length === 0) {
            return null;
        }

        const selectedValue = this.state.selectedValue;
        let selectedItem = u.find(this.datasource, item => item.value === selectedValue);
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

export default class Select extends ValidatedInput {
    static propTypes = {
        ...ValidatedInput.propTypes,
        selectHandler: React.PropTypes.func
    }

    static defaultProps = {
        ...ValidatedInput.defaultProps,
        selectHandler: (value, datasource, index, selectedValues) => {}
    }

    constructor(props, context) {
        super(props, context);

        this.selectHandler = this.selectHandler.bind(this);
    }

    selectHandler(e, value, datasource, index) {
        const {selectHandler} = this.props;
        const selectedValue = this.props.selectedValue || value;
        let selectedValues = selectedValue.split(',');

        if (this.props.disableChange) {
            selectHandler(value, datasource, index, selectedValues);
            return;
        }

        selectedValues.splice(index, selectedValues.length, value);

        let selectedItem = u.find(datasource, item => item.value === value);

        if (selectedItem.children && selectedItem.children.length) {
            selectedValues.push('');
        }

        selectHandler(value, datasource, index, selectedValues);

        setTimeout(() => {
            this._form && this._form._validateOne(this.props.name, this._form.getValues());
        }, 0);
    }

    getValue() {
        const datasource = this.props.datasource;
        let selectedValue = this.props.selectedValue;

        // 处理初始值本身是错误的问题
        if (selectedValue) {
            const selectedValues = selectedValue.split(',');
            const values = u.pluck(datasource, 'value');
            if (!u.contains(values, selectedValues[0])) {
                return '';
            }
        }

        if (this.props.isRawSource && selectedValue === undefined) {
            selectedValue = datasource[0] ? datasource[0].value : '';
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

    render() {
        const {selectedValue} = this.props;
        console.log(selectedValue);
        let datasource = this.props.datasource;
        let selectedValues = selectedValue && selectedValue.split(',') || [''];
        let datasources = [];

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
        let innerclassName = classnames('select-group', this.props.className);

        return (
            <div className={className}>
                {this.renderLabel()}
                <div className={innerclassName}>
                {
                    datasources.map((datasource, index) => {
                        return (
                            <ItemRenderer
                                id={`${this.props.name}-${index}`}
                                ref={`itemRenderer${index}`}
                                datasource={datasource.datasource}
                                index={index}
                                key={index}
                                isRawSource={this.props.isRawSource}
                                selectedValue={datasource.selectedValue}
                                emptyLabel={this.props.emptyLabel}
                                disabled={!!this.props.disabled}
                                disableChange={!!this.props.disableChange}
                                selectHandler={this.selectHandler}
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
}
