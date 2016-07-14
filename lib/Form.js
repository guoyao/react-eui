'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _class, _temp; /**
                    * @file 增强的Form组件，支持异步验证，错误定位
                    * @author guoyao(wuguoyao@baidu.com)
                    **/

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactBootstrapValidation = require('react-bootstrap-validation');

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _InputControl = require('./InputControl');

var _InputControl2 = _interopRequireDefault(_InputControl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isPromise(obj) {
    return obj && _underscore2.default.isFunction(obj.then);
}

var FormEx = (_temp = _class = function (_Form) {
    (0, _inherits3.default)(FormEx, _Form);

    function FormEx(props, context) {
        (0, _classCallCheck3.default)(this, FormEx);

        var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(FormEx).call(this, props, context));

        _this._errorIptNames = [];
        return _this;
    }

    /* eslint-disable */


    (0, _createClass3.default)(FormEx, [{
        key: '_renderChildren',
        value: function _renderChildren(children) {
            var _this2 = this;

            if ((typeof children === 'undefined' ? 'undefined' : (0, _typeof3.default)(children)) !== 'object' || children === null) {
                return children;
            }

            var model = this.props.model || {};

            var processChild = function processChild(child) {
                if ((typeof child === 'undefined' ? 'undefined' : (0, _typeof3.default)(child)) !== 'object' || child === null || !child.props.name && (child.type === _InputControl2.default || child.type.prototype instanceof _InputControl2.default)) {
                    return child;
                }

                if (child.type === _reactBootstrapValidation.ValidatedInput || child.type === _reactBootstrapValidation.RadioGroup || child.type && child.type.prototype != null && (child.type.prototype instanceof _reactBootstrapValidation.ValidatedInput || child.type.prototype instanceof _reactBootstrapValidation.RadioGroup)) {
                    var _ret = function () {
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
                            v: _react2.default.cloneElement(child, newProps)
                        };
                    }();

                    if ((typeof _ret === 'undefined' ? 'undefined' : (0, _typeof3.default)(_ret)) === 'object') return _ret.v;
                } else {
                    return _react2.default.cloneElement(child, {}, _this2._renderChildren(child.props && child.props.children));
                }
            };

            var childrenCount = _react2.default.Children.count(children);

            if (childrenCount === 1) {
                return processChild(children);
            } else if (childrenCount > 1) {
                return _react2.default.Children.map(children, processChild);
            }
        }
        /* eslint-enable */

    }, {
        key: '_validateOne',
        value: function _validateOne(iptName, context) {
            var _this3 = this;

            var input = this._inputs[iptName];

            if (Array.isArray(input)) {
                console.warn('Multiple inputs use the same name "' + iptName + '"');

                return false;
            }

            var value = context[iptName];

            var promise = new _promise2.default(function (resolve, reject) {
                var isValid = true;
                var validate = input.props.validate;
                var result = undefined;
                var error = undefined;

                if (typeof _this3.props.validateOne === 'function') {
                    result = _this3.props.validateOne(iptName, value, context);
                } else if (typeof validate === 'function') {
                    result = validate(value, context);
                } else if (typeof validate === 'string') {
                    result = _this3._validators[iptName](value);
                } else {
                    result = true;
                }

                if (isPromise(result)) {
                    result.then(function (data) {
                        if (data === true) {
                            _this3._setError(iptName, !isValid, error);
                            resolve(true);
                        } else {
                            isValid = false;
                            if (typeof data === 'string') {
                                error = data;
                            }
                            _this3._setError(iptName, !isValid, error);
                            reject(error);
                        }
                    }).catch(function (err) {
                        isValid = false;
                        error = err;
                        _this3._setError(iptName, !isValid, error);
                        reject(error);
                    });
                } else {
                    // if result is !== true, it is considered an error
                    // it can be either bool or string error
                    if (result !== true) {
                        isValid = false;

                        if (typeof result === 'string') {
                            error = result;
                        }
                        _this3._setError(iptName, !isValid, error);
                        reject(error);
                    } else {
                        _this3._setError(iptName, !isValid, error);
                        resolve(true);
                    }
                }
            });

            promise.catch(function () {
                _this3._errorIptNames.push(iptName);
            });

            return promise;
        }
    }, {
        key: '_validateAll',
        value: function _validateAll(context) {
            var _this4 = this;

            var isValid = true;
            var errors = [];

            if (typeof this.props.validateAll === 'function') {
                /* eslint-disable */
                (function () {
                    var result = _this4.props.validateAll(context);

                    if (result !== true) {
                        isValid = false;

                        (0, _keys2.default)(result).forEach(function (iptName) {
                            errors.push(iptName);

                            _this4._setError(iptName, true, result[iptName]);
                        });
                    }
                })();
                /* eslint-enable */

                return { isValid: isValid, errors: errors };
            }

            var promises = [];

            (0, _keys2.default)(this._inputs).forEach(function (iptName) {
                promises.push(_this4._validateOne(iptName, context));
            });

            return _promise2.default.all(promises);
        }
    }, {
        key: '_handleSubmit',
        value: function _handleSubmit(e) {
            var _this5 = this;

            this._errorIptNames.length = 0;

            if (e) {
                e.preventDefault();
            }

            var values = this.getValues();

            var _validateAll2 = this._validateAll(values);

            if (isPromise(_validateAll2)) {
                _validateAll2.then(function () {
                    _this5.props.onValidSubmit(values);
                }).catch(function () {
                    _this5.props.onInvalidSubmit(_this5._errorIptNames, values);
                    if (_this5._errorIptNames.length > 0) {
                        var input = _this5._inputs[_this5._errorIptNames[0]].getInputDOMNode && _this5._inputs[_this5._errorIptNames[0]].getInputDOMNode();

                        input && input.focus();
                    }
                });
            } else {
                var isValid = _validateAll2.isValid;
                var errors = _validateAll2.errors;

                if (isValid) {
                    this.props.onValidSubmit(values);
                } else {
                    this.props.onInvalidSubmit(errors, values);
                    if (this._errorIptNames.length > 0) {
                        var input = this._inputs[this._errorIptNames[0]].getInputDOMNode && this._inputs[this._errorIptNames[0]].getInputDOMNode();

                        input && input.focus();
                    }
                }
            }
        }
    }]);
    return FormEx;
}(_reactBootstrapValidation.Form), _class.defaultProps = (0, _extends3.default)({}, _reactBootstrapValidation.Form.defaultProps, {
    onValidSubmit: function onValidSubmit() {}
}), _temp);
exports.default = FormEx;