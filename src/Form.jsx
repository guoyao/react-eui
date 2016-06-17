/**
 * @file 增强的Form组件，支持异步验证，错误定位
 * @author guoyao(wuguoyao@baidu.com)
 **/

import u from 'underscore';
import React from 'react';
import {Form, ValidatedInput, RadioGroup} from 'react-bootstrap-validation';
import _Object$keys from 'babel-runtime/core-js/object/keys';

import InputControl from './InputControl';

function isPromise(obj) {
    return obj && u.isFunction(obj.then);
}

export default class FormEx extends Form {
    static defaultProps = {
        ...Form.defaultProps,
        onValidSubmit: () => {}
    }

    constructor(props, context) {
        super(props, context);

        this._errorIptNames = [];
    }

    /* eslint-disable */
    _renderChildren(children) {
        var _this2 = this;

        if (typeof children !== 'object' || children === null) {
            return children;
        }

        var model = this.props.model || {};

        var processChild = function processChild(child) {
            if (typeof child !== 'object' || child === null ||
                (!child.props.name && (child.type === InputControl || child.type.prototype instanceof InputControl))) {
                return child;
            }

            if (child.type === ValidatedInput || child.type === RadioGroup || child.type && child.type.prototype != null && (child.type.prototype instanceof ValidatedInput || child.type.prototype instanceof RadioGroup)) {
                var _ret = (function () {
                    var name = child.props && child.props.name;

                    if (!name) {
                        throw new Error('Can not add input without "name" attribute');
                    }

                    var newProps = {
                        _registerInput: _this2.registerInput.bind(_this2),
                        _unregisterInput: _this2.unregisterInput.bind(_this2),
                        _form: _this2
                    };

                    var evtName = child.props.validationEvent ? child.props.validationEvent : _this2.props.validationEvent;

                    var origCallback = child.props[evtName];

                    newProps[evtName] = function (e) {
                        _this2._validateInput(name);

                        return origCallback && origCallback(e);
                    };

                    if (name in model) {
                        if (child.props.type === 'checkbox') {
                            newProps.defaultChecked = model[name];
                        } else {
                            newProps.defaultValue = model[name];
                        }
                    }

                    var error = _this2._hasError(name);

                    if (error) {
                        newProps.bsStyle = 'error';

                        if (typeof error === 'string') {
                            newProps.help = error;
                        } else if (child.props.errorHelp) {
                            newProps.help = child.props.errorHelp;
                        }
                    }

                    return {
                        v: React.cloneElement(child, newProps)
                    };
                })();

                if (typeof _ret === 'object') return _ret.v;
            } else {
                return React.cloneElement(child, {}, _this2._renderChildren(child.props && child.props.children));
            }
        };

        var childrenCount = React.Children.count(children);

        if (childrenCount === 1) {
            return processChild(children);
        } else if (childrenCount > 1) {
            return React.Children.map(children, processChild);
        }
    }
    /* eslint-enable */

    _validateOne(iptName, context) {
        var input = this._inputs[iptName];

        if (Array.isArray(input)) {
            console.warn('Multiple inputs use the same name "' + iptName + '"');

            return false;
        }

        var value = context[iptName];

        let promise = new Promise((resolve, reject) => {
            var isValid = true;
            var validate = input.props.validate;
            var result = undefined;
            var error = undefined;

            if (typeof this.props.validateOne === 'function') {
                result = this.props.validateOne(iptName, value, context);
            }
            else if (typeof validate === 'function') {
                result = validate(value, context);
            }
            else if (typeof validate === 'string') {
                result = this._validators[iptName](value);
            }
            else {
                result = true;
            }

            if (isPromise(result)) {
                result.then((data) => {
                    if (data === true) {
                        this._setError(iptName, !isValid, error);
                        resolve(true);
                    }
                    else {
                        isValid = false;
                        if (typeof data === 'string') {
                            error = data;
                        }
                        this._setError(iptName, !isValid, error);
                        reject(error);
                    }
                })
                .catch((err) => {
                    isValid = false;
                    error = err;
                    this._setError(iptName, !isValid, error);
                    reject(error);
                });
            }
            else {
                // if result is !== true, it is considered an error
                // it can be either bool or string error
                if (result !== true) {
                    isValid = false;

                    if (typeof result === 'string') {
                        error = result;
                    }
                    this._setError(iptName, !isValid, error);
                    reject(error);
                }
                else {
                    this._setError(iptName, !isValid, error);
                    resolve(true);
                }
            }
        });

        promise.catch(() => {
            this._errorIptNames.push(iptName);
        });

        return promise;
    }

    _validateAll(context) {
        var _this4 = this;

        var isValid = true;
        var errors = [];

        if (typeof this.props.validateAll === 'function') {
            /* eslint-disable */
            (function () {
                var result = _this4.props.validateAll(context);

                if (result !== true) {
                    isValid = false;

                    _Object$keys(result).forEach(function (iptName) {
                        errors.push(iptName);

                        _this4._setError(iptName, true, result[iptName]);
                    });
                }
            })();
            /* eslint-enable */

            return {isValid, errors};
        }

        let promises = [];

        _Object$keys(this._inputs).forEach(iptName => {
            promises.push(_this4._validateOne(iptName, context));
        });

        return Promise.all(promises);
    }

    _handleSubmit(e) {
        this._errorIptNames.length = 0;

        if (e) {
            e.preventDefault();
        }

        var values = this.getValues();

        var _validateAll2 = this._validateAll(values);

        if (isPromise(_validateAll2)) {
            _validateAll2.then(() => {
                this.props.onValidSubmit(values);
            })
            .catch(() => {
                this.props.onInvalidSubmit(this._errorIptNames, values);
                if (this._errorIptNames.length > 0) {
                    let input = this._inputs[this._errorIptNames[0]].getInputDOMNode &&
                        this._inputs[this._errorIptNames[0]].getInputDOMNode();

                    input && input.focus();
                }
            });
        }
        else {
            var isValid = _validateAll2.isValid;
            var errors = _validateAll2.errors;

            if (isValid) {
                this.props.onValidSubmit(values);
            }
            else {
                this.props.onInvalidSubmit(errors, values);
                if (this._errorIptNames.length > 0) {
                    let input = this._inputs[this._errorIptNames[0]].getInputDOMNode &&
                        this._inputs[this._errorIptNames[0]].getInputDOMNode();

                    input && input.focus();
                }
            }
        }
    }
}
