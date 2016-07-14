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

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _DEFAULT_FORMAT, _desc, _value, _class, _class2, _temp; /**
                                                             * @file 时间选择组件
                                                             * @author guoyao(wuguoyao@baidu.com)
                                                             **/

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _coreDecorators = require('core-decorators');

var _reactBootstrapDatetimepicker = require('react-bootstrap-datetimepicker');

var _reactBootstrapDatetimepicker2 = _interopRequireDefault(_reactBootstrapDatetimepicker);

var _Constants = require('react-bootstrap-datetimepicker/lib/Constants');

var _Constants2 = _interopRequireDefault(_Constants);

var _Control = require('./Control');

var _Control2 = _interopRequireDefault(_Control);

var _InputControl2 = require('./InputControl');

var _InputControl3 = _interopRequireDefault(_InputControl2);

var _timeUtil = require('./util/timeUtil');

var _timeUtil2 = _interopRequireDefault(_timeUtil);

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

var Mode = {
    date: _Constants2.default.MODE_DATE,
    datetime: _Constants2.default.MODE_DATETIME,
    time: _Constants2.default.MODE_TIME
};

var DEFAULT_FORMAT = (_DEFAULT_FORMAT = {}, (0, _defineProperty3.default)(_DEFAULT_FORMAT, Mode.date, {
    format: 'YYYY-MM-DD',
    inputFormat: 'YYYY-MM-DD'
}), (0, _defineProperty3.default)(_DEFAULT_FORMAT, Mode.datetime, {
    format: 'YYYY-MM-DDTHH:mm:ssZ',
    inputFormat: 'YYYY-MM-DD HH:mm:ss'
}), (0, _defineProperty3.default)(_DEFAULT_FORMAT, Mode.time, {
    format: 'HH:mm:ss',
    inputFormat: 'HH:mm:ss'
}), _DEFAULT_FORMAT);

var propKeys = _underscore2.default.keys(_reactBootstrapDatetimepicker2.default.propTypes);

var DateTimeFieldEx = (_class = (_temp = _class2 = function (_InputControl) {
    (0, _inherits3.default)(DateTimeFieldEx, _InputControl);

    function DateTimeFieldEx() {
        var _Object$getPrototypeO;

        (0, _classCallCheck3.default)(this, DateTimeFieldEx);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = (0, _possibleConstructorReturn3.default)(this, (_Object$getPrototypeO = (0, _getPrototypeOf2.default)(DateTimeFieldEx)).call.apply(_Object$getPrototypeO, [this].concat(args)));

        var _this$props = _this.props;
        var format = _this$props.format;
        var inputFormat = _this$props.inputFormat;
        var mode = _this$props.mode;
        var value = _this$props.value;


        _this.format = format || DEFAULT_FORMAT[mode].format;
        _this.inputFormat = inputFormat || DEFAULT_FORMAT[mode].inputFormat;

        _this.state = {
            value: (value ? (0, _moment2.default)(value, _this.format) : (0, _moment2.default)()).format(_this.format)
        };
        return _this;
    }

    (0, _createClass3.default)(DateTimeFieldEx, [{
        key: 'getValue',
        value: function getValue() {
            var value = this.state.value;

            if (/Z$/.test(this.format)) {
                value = _timeUtil2.default.timeToUtc(value);
            }

            return value;
        }
    }, {
        key: 'changeHandler',
        value: function changeHandler(value) {
            var _this2 = this;

            this.setState({ value: value }, function () {
                _this2.props.changeHandler(_this2.getValue());
            });
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            (0, _get3.default)((0, _getPrototypeOf2.default)(DateTimeFieldEx.prototype), 'componentWillReceiveProps', this) && (0, _get3.default)((0, _getPrototypeOf2.default)(DateTimeFieldEx.prototype), 'componentWillReceiveProps', this).call(this, nextProps);

            if (this.props.value !== nextProps.value) {
                this.setState({
                    value: (0, _moment2.default)(nextProps.value, this.format).format(this.format)
                });
            }
        }
    }, {
        key: 'renderControl',
        value: function renderControl() {
            var props = _underscore2.default.extend({ key: '' }, _underscore2.default.pick(this.props, propKeys), {
                dateTime: this.state.value,
                onChange: this.changeHandler,
                format: this.format,
                inputFormat: this.inputFormat
            });

            props.inputProps.readOnly = true;

            return _react2.default.createElement(
                _Control2.default,
                { className: this.controlClassName },
                _react2.default.createElement(_reactBootstrapDatetimepicker2.default, props)
            );
        }
    }, {
        key: 'controlClassName',
        get: function get() {
            var mode = this.props.mode;


            var className = (0, _defineProperty3.default)({
                'eui-date-time-field': true
            }, 'eui-date-time-field-' + mode, true);

            return (0, _classnames2.default)((0, _get3.default)((0, _getPrototypeOf2.default)(DateTimeFieldEx.prototype), 'controlClassName', this), className);
        }
    }]);
    return DateTimeFieldEx;
}(_InputControl3.default), _class2.propTypes = (0, _extends3.default)({}, _InputControl3.default.propTypes, _reactBootstrapDatetimepicker2.default.propTypes, {

    changeHandler: _react2.default.PropTypes.func
}), _class2.defaultProps = (0, _extends3.default)({}, _InputControl3.default.defaultProps, _underscore2.default.omit(_reactBootstrapDatetimepicker2.default.defaultProps, 'dateTime', 'format'), {

    inputProps: {},
    changeHandler: _util2.default.emptyFunc
}), _class2.Mode = Mode, _class2.Format = DEFAULT_FORMAT, _temp), (_applyDecoratedDescriptor(_class.prototype, 'controlClassName', [_coreDecorators.override], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'controlClassName'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'getValue', [_coreDecorators.override], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'getValue'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'changeHandler', [_coreDecorators.autobind], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'changeHandler'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'renderControl', [_coreDecorators.override], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'renderControl'), _class.prototype)), _class);
exports.default = DateTimeFieldEx;