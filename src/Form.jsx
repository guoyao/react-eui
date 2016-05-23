/**
 * @file 增强的Form组件，支持异步验证，错误定位
 * @author guoyao(wuguoyao@baidu.com)
 **/

import u from 'underscore';
import {Form} from 'react-bootstrap-validation';
import _Object$keys from 'babel-runtime/core-js/object/keys';

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

    registerInput(input) {
        super.registerInput(input);
        input._form = this;
    }

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

            return {
                isValid: isValid,
                errors: errors
            };
        }
        else {
            let promises = [];

            _Object$keys(this._inputs).forEach(iptName => {
                promises.push(_this4._validateOne(iptName, context));
            });

            return Promise.all(promises);
        }
    }

    _handleSubmit(e) {
        this._errorIptNames.length = 0;

        if (e) {
            e.preventDefault();
        }

        var values = this.getValues();

        var _validateAll2 = this._validateAll(values);

        if (isPromise(_validateAll2)) {
            _validateAll2.then((results) => {
                this.props.onValidSubmit(values);
            })
            .catch((err) => {
                this.props.onInvalidSubmit(this._errorIptNames, values);
                if (this._errorIptNames.length > 0) {
                    let input = this._inputs[this._errorIptNames[0]].getInputDOMNode && this._inputs[this._errorIptNames[0]].getInputDOMNode();
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
                    let input = this._inputs[this._errorIptNames[0]].getInputDOMNode && this._inputs[this._errorIptNames[0]].getInputDOMNode();
                    input && input.focus();
                }
            }
        }
    }
}
