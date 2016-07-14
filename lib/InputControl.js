'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _getOwnPropertyDescriptor = require('babel-runtime/core-js/object/get-own-property-descriptor');

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _dec, _desc, _value, _class, _class2, _temp; /**
                                                  * @file 所有input组件的基类
                                                  * @author guoyao(wuguoyao@baidu.com)
                                                  **/

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _coreDecorators = require('core-decorators');

var _FormGroup = require('react-bootstrap/lib/FormGroup');

var _FormGroup2 = _interopRequireDefault(_FormGroup);

var _reactBootstrapValidation = require('react-bootstrap-validation');

var _toConsumableArray = require('babel-runtime/helpers/to-consumable-array');

var _toConsumableArray2 = _interopRequireDefault(_toConsumableArray);

var _Control = require('./Control');

var _Control2 = _interopRequireDefault(_Control);

var _autosize = require('./util/autosize');

var _autosize2 = _interopRequireDefault(_autosize);

var _util = require('./util/util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
        desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
        desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
        return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
        desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
        desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
        Object['define' + 'Property'](target, property, desc);
        desc = null;
    }

    return desc;
}

function getInputErrorMessage(input, ruleName) {
    var errorHelp = input.props.errorHelp;

    if ((typeof errorHelp === 'undefined' ? 'undefined' : (0, _typeof3.default)(errorHelp)) === 'object') {
        return errorHelp[ruleName];
    }

    return errorHelp;
}

function compileValidationRules(input, ruleProp) {
    var rules = ruleProp.split(',').map(function (rule) {
        var params = rule.split(':');
        var name = params.shift();
        var inverse = name[0] === '!';

        if (inverse) {
            name = name.substr(1);
        }

        return { name: name, inverse: inverse, params: params };
    });

    var validator = (input.props && input.props.type) === 'file' ? _reactBootstrapValidation.FileValidator : _reactBootstrapValidation.Validator;

    return function (val) {
        var result = true;

        rules.forEach(function (rule) {
            if (typeof validator[rule.name] !== 'function') {
                throw new Error('Invalid input validation rule "' + rule.name + '"');
            }

            var ruleResult = validator[rule.name].apply(validator, [val].concat((0, _toConsumableArray2.default)(rule.params)));

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

var InputControl = (_dec = (0, _coreDecorators.debounce)(100), (_class = (_temp = _class2 = function (_ValidatedInput) {
    (0, _inherits3.default)(InputControl, _ValidatedInput);

    function InputControl() {
        var _Object$getPrototypeO;

        (0, _classCallCheck3.default)(this, InputControl);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = (0, _possibleConstructorReturn3.default)(this, (_Object$getPrototypeO = (0, _getPrototypeOf2.default)(InputControl)).call.apply(_Object$getPrototypeO, [this].concat(args)));

        var _this$props = _this.props;
        var type = _this$props.type;
        var showLengthTip = _this$props.showLengthTip;
        var validate = _this$props.validate;
        var value = _this$props.value;

        if (type === 'textarea' && showLengthTip && _underscore2.default.isString(validate)) {
            var matches = /isLength:(\d+):(\d+)/.exec(validate);
            if (matches && matches.length > 2) {
                _this.maxLength = parseInt(matches[2], 10);
                _this.currentLength = value ? value.length : 0;
            }
        }

        _this.state = {};
        return _this;
    }

    (0, _createClass3.default)(InputControl, [{
        key: 'getValue',
        value: function getValue() {
            return !this.props.type ? this.props.value : (0, _get3.default)((0, _getPrototypeOf2.default)(InputControl.prototype), 'getValue', this).call(this);
        }
    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
            (0, _get3.default)((0, _getPrototypeOf2.default)(InputControl.prototype), 'componentWillMount', this) && (0, _get3.default)((0, _getPrototypeOf2.default)(InputControl.prototype), 'componentWillMount', this).call(this);

            var _props = this.props;
            var _form = _props._form;
            var validate = _props.validate;


            if (!_form && typeof validate === 'string') {
                this.state = _underscore2.default.extend(this.state || {}, { _error: false });
                this._validators = compileValidationRules(this, this.props.validate);
            }
        }
    }, {
        key: 'renderWrapper',
        value: function renderWrapper(children) {
            if (this.maxLength) {
                var helpBlock = children.pop();

                var currentLength = this.getInputDOMNode() ? this.getValue().length : this.currentLength;
                var className = currentLength > this.maxLength ? 'length-tip overstep' : 'length-tip';

                children.push(_react2.default.createElement(
                    'span',
                    { key: 'lengthTip', className: className },
                    currentLength,
                    '/',
                    this.maxLength
                ));

                children.push(helpBlock);
            }

            return (0, _get3.default)((0, _getPrototypeOf2.default)(InputControl.prototype), 'renderWrapper', this).call(this, children);
        }
    }, {
        key: 'renderLabel',
        value: function renderLabel(children) {
            var classes = {
                'eui-input-control-label': !this.isCheckboxOrRadio(),
                'control-label': !this.isCheckboxOrRadio()
            };

            var labelClassName = this.props.labelClassName;
            var validate = this.props.validate;
            classes[labelClassName] = labelClassName;

            if (!/\brequired\b/.test(labelClassName) && (_underscore2.default.isString(validate) && /\brequired\b/.test(validate) || /\brequired\b/.test(this.props.className))) {
                classes.required = 'required';
            }

            var classNames = (0, _classnames2.default)(classes);
            var required = /\brequired\b/.test(classNames);

            return this.props.label ? _react2.default.createElement('label', {
                htmlFor: this.props.id,
                className: classNames,
                key: 'label'
            }, children, _react2.default.createElement('span', {
                dangerouslySetInnerHTML: { __html: '' + (required ? '<i>*</i>' : '') + this.props.label }
            })) : children;
        }
    }, {
        key: 'renderHelp',
        value: function renderHelp() {
            var _error = this.state._error;


            if (!this.props._form && _underscore2.default.isString(_error)) {
                return _react2.default.createElement(
                    'span',
                    { key: 'help', className: 'help-block' },
                    _error
                );
            }

            return (0, _get3.default)((0, _getPrototypeOf2.default)(InputControl.prototype), 'renderHelp', this).call(this);
        }
    }, {
        key: 'renderInput',
        value: function renderInput() {
            if (!this.props.type) {
                var control = this.renderControl();

                if (this.props.wrapperClassName) {
                    return _react2.default.cloneElement(control, _underscore2.default.extend({ key: 'control' }, control.props));
                }

                return control;
            }

            /* eslint-disable */
            switch (this.props.type) {
                case 'select':
                    return _react2.default.createElement('select', _underscore2.default.extend({}, this.props, {
                        className: (0, _classnames2.default)('eui-control', this.controlClassName, 'form-control'),
                        ref: 'input',
                        key: 'input'
                    }), this.props.children);
                case 'textarea':
                    return _react2.default.createElement('textarea', _underscore2.default.extend({}, this.props, {
                        className: (0, _classnames2.default)('eui-control', this.controlClassName, 'form-control'),
                        ref: 'input',
                        key: 'input'
                    }));
                case 'static':
                    return _react2.default.createElement('p', _underscore2.default.extend({}, this.props, {
                        className: (0, _classnames2.default)('eui-control', this.controlClassName, 'form-control-static'),
                        ref: 'input',
                        key: 'input'
                    }), this.props.value);
                default:
                    var className = this.isCheckboxOrRadio() || this.isFile() ? '' : 'form-control';
                    return _react2.default.createElement('input', _underscore2.default.extend({}, this.props, {
                        className: (0, _classnames2.default)('eui-control', this.controlClassName, className),
                        ref: 'input',
                        key: 'input'
                    }));
            }
            /* eslint-enable */
        }
    }, {
        key: 'renderControl',
        value: function renderControl() {
            return _react2.default.createElement(
                _Control2.default,
                { className: this.controlClassName },
                this.props.children
            );
        }
    }, {
        key: 'renderFormGroup',
        value: function renderFormGroup(children) {
            var group = null;
            var _props2 = this.props;
            var label = _props2.label;
            var help = _props2.help;
            var validate = _props2.validate;
            var _error = this.state._error;


            if (label || help || this.maxLength || validate || _error) {
                var props = _underscore2.default.extend({}, this.props);

                _error && (props.bsStyle = 'error');
                group = _react2.default.createElement(_FormGroup2.default, props, children);
            } else {
                group = _underscore2.default.isArray(children[1]) ? children[1][0] : children[1];
            }

            return group;
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            (0, _get3.default)((0, _getPrototypeOf2.default)(InputControl.prototype), 'componentDidMount', this) && (0, _get3.default)((0, _getPrototypeOf2.default)(InputControl.prototype), 'componentDidMount', this).call(this);

            var inputNode = this.getInputDOMNode();
            this.maxLength && inputNode.addEventListener('input', this.inputHandler);
            this.props.type === 'textarea' && (0, _autosize2.default)(inputNode);
        }
    }, {
        key: 'inputHandler',
        value: function inputHandler() {
            this.maxLength && this.forceUpdate();
        }
    }, {
        key: 'validate',
        value: function validate() {
            var _form = this.props._form;


            if (_form) {
                return _form._validateOne(this.props.name, _form.getValues());
            }

            var validate = this.props.validate;

            var value = this.getValue();

            var isValid = true;
            var result = void 0;
            var error = void 0;

            if (typeof validate === 'function') {
                result = validate(value);
            } else if (typeof validate === 'string') {
                result = this._validators(value);
            } else {
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
    }, {
        key: '_setError',
        value: function _setError(isError, errText) {
            if (isError && errText && typeof errText !== 'string' && typeof errText !== 'boolean') {
                errText = errText + '';
            }

            // set value to either bool or error description string
            this.setState({
                _error: isError ? errText || true : false
            });
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            var inputNode = this.getInputDOMNode();
            if (inputNode) {
                inputNode.removeEventListener('input', this.inputHandler);

                if (this.props.type === 'textarea') {
                    // remove autosize from textarea
                    var evt = document.createEvent('Event');
                    evt.initEvent('autosize:destroy', true, false);
                    inputNode.dispatchEvent(evt);
                }
            }

            (0, _get3.default)((0, _getPrototypeOf2.default)(InputControl.prototype), 'componentWillUnmount', this) && (0, _get3.default)((0, _getPrototypeOf2.default)(InputControl.prototype), 'componentWillUnmount', this).call(this);
            this._validators = undefined;
        }
    }, {
        key: 'controlClassName',
        get: function get() {
            return (0, _classnames2.default)('eui-input-control', this.props.className);
        }
    }]);
    return InputControl;
}(_reactBootstrapValidation.ValidatedInput), _class2.propTypes = (0, _extends3.default)({}, _reactBootstrapValidation.ValidatedInput.propTypes, {
    name: _react2.default.PropTypes.string,

    // 当有字符串长度限制时，是否展示当前已输入的字数
    showLengthTip: _react2.default.PropTypes.bool
}), _class2.defaultProps = (0, _extends3.default)({}, _reactBootstrapValidation.ValidatedInput.defaultProps, {
    _registerInput: _util2.default.emptyFunc,
    _unregisterInput: _util2.default.emptyFunc,

    showLengthTip: true
}), _temp), (_applyDecoratedDescriptor(_class.prototype, 'inputHandler', [_coreDecorators.autobind, _dec], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'inputHandler'), _class.prototype)), _class));
exports.default = InputControl;