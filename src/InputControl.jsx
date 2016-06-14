/**
 * @file 所有input组件的基类
 * @author guoyao(wuguoyao@baidu.com)
 **/

import './InputControl.less';

import u from 'underscore';
import React from 'react';
import classnames from 'classnames';
import {ValidatedInput, Validator, FileValidator} from 'react-bootstrap-validation';
import toConsumableArray from 'babel-runtime/helpers/to-consumable-array';

import Control from './Control';
import autosize from './util/autosize';
import util from './util/util';

function getInputErrorMessage(input, ruleName) {
    const errorHelp = input.props.errorHelp;

    if (typeof errorHelp === 'object') {
        return errorHelp[ruleName];
    }

    return errorHelp;
}

function compileValidationRules(input, ruleProp) {
    const rules = ruleProp.split(',').map(function (rule) {
        const params = rule.split(':');
        let name = params.shift();
        const inverse = name[0] === '!';

        if (inverse) {
            name = name.substr(1);
        }

        return {name, inverse, params};
    });

    const validator = (input.props && input.props.type) === 'file' ? FileValidator : Validator;

    return function (val) {
        let result = true;

        rules.forEach(function (rule) {
            if (typeof validator[rule.name] !== 'function') {
                throw new Error('Invalid input validation rule "' + rule.name + '"');
            }

            let ruleResult = validator[rule.name].apply(validator, [val].concat(toConsumableArray(rule.params)));

            if (rule.inverse) {
                ruleResult = !ruleResult;
            }

            if (result === true && ruleResult !== true) {
                result = getInputErrorMessage(input, rule.name) || false;
            }
        });

        return result;
    };
}

export default class InputControl extends ValidatedInput {
    static propTypes = {
        ...ValidatedInput.propTypes,
        name: React.PropTypes.string,

        // 当有字符串长度限制时，是否展示当前已输入的字数
        showLengthTip: React.PropTypes.bool
    }

    static defaultProps = {
        ...ValidatedInput.defaultProps,
        _registerInput: util.emptyFunc,
        _unregisterInput: util.emptyFunc,

        showLengthTip: true
    }

    constructor(props, context) {
        super(props, context);

        const {type, showLengthTip, validate} = props;
        if (type === 'textarea' && showLengthTip && u.isString(validate)) {
            let matches = /isLength:(\d+):(\d+)/.exec(validate);
            if (matches && matches.length > 2) {
                this.maxLength = parseInt(matches[2], 10);
                this.currentLength = props.defaultValue ? props.defaultValue.length : 0;
            }
        }

        this.state = {};
        this.inputHandler = this.inputHandler.bind(this);
    }

    get controlClassName() {
        return classnames('eui-input-control', this.props.className);
    }

    getValue() {
        return !this.props.type ? this.props.value : super.getValue();
    }

    componentWillMount() {
        super.componentWillMount && super.componentWillMount();

        if (!this._form && typeof this.props.validate === 'string') {
            this.state = u.extend(this.state || {}, {_error: false});
            this._validators = compileValidationRules(this, this.props.validate);
        }
    }

    renderLabel(children) {
        let classes = {
            'control-label': !this.isCheckboxOrRadio()
        };

        let labelClassName = this.props.labelClassName;
        let validate = this.props.validate;
        classes[labelClassName] = labelClassName;

        if (!/\brequired\b/.test(labelClassName)
            && (u.isString(validate) && /\brequired\b/.test(validate) || /\brequired\b/.test(this.props.className))) {
            classes.required = 'required';
        }

        let classNames = classnames(classes);
        let required = /\brequired\b/.test(classNames);

        return this.props.label ? React.createElement(
            'label',
            {
                htmlFor: this.props.id,
                className: classNames,
                key: 'label'
            },
            children,
            React.createElement(
                'span',
                {
                    dangerouslySetInnerHTML: {__html: `${required ? '<i>*</i>' : ''}${this.props.label}`}
                }
            )
        ) : children;
    }

    renderHelp() {
        if (!this._form && this.state._error && typeof this.state._error === 'string') {
            return <span key="help" className="help-block">{this.state._error}</span>;
        }

        return super.renderHelp();
    }

    renderInput() {
        if (!this.props.type) {
            return this.renderControl();
        }

        /* eslint-disable */
        switch (this.props.type) {
            case 'select':
                return React.createElement('select', u.extend({}, this.props, {
                    className: classnames('eui-control', this.controlClassName, 'form-control'),
                    ref: 'input',
                    key: 'input'
                }), this.props.children);
            case 'textarea':
                return React.createElement('textarea', u.extend({}, this.props, {
                    className: classnames('eui-control', this.controlClassName, 'form-control'),
                    ref: 'input',
                    key: 'input'
                }));
            case 'static':
                return React.createElement('p', u.extend({}, this.props, {
                    className: classnames('eui-control', this.controlClassName, 'form-control-static'),
                    ref: 'input',
                    key: 'input'
                }), this.props.value);
            default:
                let className = this.isCheckboxOrRadio() || this.isFile() ? '' : 'form-control';
                return React.createElement('input', u.extend({}, this.props, {
                    className: classnames('eui-control', this.controlClassName, className),
                    ref: 'input',
                    key: 'input'
                }));
        }
        /* eslint-enable */
    }

    renderControl() {
        return (
            <Control className={this.controlClassName}>
                {this.props.children}
            </Control>
        );
    }

    renderFormGroup(children) {
        if (this.maxLength) {
            let currentLength = this.getInputDOMNode() ? this.getValue().length : this.currentLength;
            let className = currentLength > this.maxLength ? 'length-tip overstep' : 'length-tip';

            children.push(
                <span key="lengthTip" className={className}>
                    {currentLength}/{this.maxLength}
                </span>
            );
        }

        let group = null;

        if (this.props.label || this.props.help || this.maxLength ||
            this.props.validate || this.state._error) {
            group = super.renderFormGroup(children);

            if (this.state._error) {
                const props = u.extend({}, this.props, {bsStyle: 'error'});
                group = React.cloneElement(group, props);
                // group = React.createElement(FormGroup, props, children);
            }
        }
        else {
            group = u.isArray(children[1]) ? children[1][0] : children[1];
        }

        return group;
    }

    componentDidMount() {
        super.componentDidMount && super.componentDidMount();

        let inputNode = this.getInputDOMNode();
        this.maxLength && inputNode.addEventListener('input', this.inputHandler);
        this.props.type === 'textarea' && autosize(inputNode);
    }

    inputHandler() {
        this.maxLength && this.forceUpdate();
    }

    validate() {
        if (this._form) {
            return this._form._validateOne(this.props.name, this._form.getValues());
        }

        const {validate} = this.props;
        const value = this.getValue();

        let isValid = true;
        let result;
        let error;

        if (typeof validate === 'function') {
            result = validate(value);
        }
        else if (typeof validate === 'string') {
            result = this._validators(value);
        }
        else {
            result = true;
        }

        // if result is !== true, it is considered an error
        // it can be either bool or string error
        if (result !== true) {
            isValid = false;

            if (typeof result === 'string') {
                error = result;
            }
        }

        this._setError(!isValid, error);

        return isValid;
    }

    _setError(isError, errText) {
        if (isError && errText && typeof errText !== 'string' && typeof errText !== 'boolean') {
            errText = errText + '';
        }

        // set value to either bool or error description string
        this.setState({
            _error: isError ? errText || true : false
        });
    }

    componentWillUnmount() {
        let inputNode = this.getInputDOMNode();
        if (inputNode) {
            inputNode.removeEventListener('input', this.inputHandler);

            if (this.props.type === 'textarea') {
                // remove autosize from textarea
                var evt = document.createEvent('Event');
                evt.initEvent('autosize:destroy', true, false);
                inputNode.dispatchEvent(evt);
            }
        }

        super.componentWillUnmount && super.componentWillUnmount();
        this._validators = undefined;
    }
}
