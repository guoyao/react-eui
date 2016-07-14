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

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _desc, _value, _class, _class2, _temp; /**
                                            * @file 时间区间选择组件
                                            * @author guoyao(wuguoyao@baidu.com)
                                            **/

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _coreDecorators = require('core-decorators');

var _Control = require('./Control');

var _Control2 = _interopRequireDefault(_Control);

var _InputControl2 = require('./InputControl');

var _InputControl3 = _interopRequireDefault(_InputControl2);

var _DateTimeField = require('./DateTimeField');

var _DateTimeField2 = _interopRequireDefault(_DateTimeField);

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

var Mode = _DateTimeField2.default.Mode;
var Format = _DateTimeField2.default.Format;

function buildValue(props) {
    var startTime = void 0;
    var endTime = void 0;

    if (props.value) {
        var _props$value$split = props.value.split(/\s*,\s*/);

        var _props$value$split2 = (0, _slicedToArray3.default)(_props$value$split, 2);

        startTime = _props$value$split2[0];
        endTime = _props$value$split2[1];
    }

    return [startTime, endTime];
}

var DateTimeRange = (_class = (_temp = _class2 = function (_InputControl) {
    (0, _inherits3.default)(DateTimeRange, _InputControl);

    function DateTimeRange() {
        (0, _classCallCheck3.default)(this, DateTimeRange);
        return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(DateTimeRange).apply(this, arguments));
    }

    (0, _createClass3.default)(DateTimeRange, [{
        key: 'getValue',
        value: function getValue() {
            return [this.refs.startDateTimeField.getValue(), this.refs.endDateTimeField.getValue()].join(',');
        }

        /* eslint-disable no-unused-vars */

    }, {
        key: 'startTimeChangeHandler',
        value: function startTimeChangeHandler(value) {
            this.validate();
            this.props.changeHandler(this.getValue());
        }
    }, {
        key: 'endTimeChangeHandler',
        value: function endTimeChangeHandler(value) {
            this.validate();
            this.props.changeHandler(this.getValue());
        }
        /* eslint-enable no-unused-vars */

    }, {
        key: 'renderControl',
        value: function renderControl() {
            var _props = this.props;
            var mode = _props.mode;
            var format = _props.format;
            var inputFormat = _props.inputFormat;
            var startInputProps = _props.startInputProps;
            var endInputProps = _props.endInputProps;

            var _buildValue = buildValue(this.props);

            var _buildValue2 = (0, _slicedToArray3.default)(_buildValue, 2);

            var startTime = _buildValue2[0];
            var endTime = _buildValue2[1];


            return _react2.default.createElement(
                _Control2.default,
                { className: this.controlClassName },
                _react2.default.createElement(_DateTimeField2.default, {
                    ref: 'startDateTimeField',
                    key: 'start',
                    mode: mode,
                    format: format,
                    inputFormat: inputFormat,
                    inputProps: startInputProps,
                    dateTime: startTime,
                    changeHandler: this.startTimeChangeHandler
                }),
                _react2.default.createElement(_DateTimeField2.default, {
                    ref: 'endDateTimeField',
                    key: 'end',
                    mode: mode,
                    format: format,
                    inputFormat: inputFormat,
                    inputProps: endInputProps,
                    dateTime: endTime,
                    changeHandler: this.endTimeChangeHandler
                })
            );
        }
    }, {
        key: 'controlClassName',
        get: function get() {
            return (0, _classnames2.default)((0, _get3.default)((0, _getPrototypeOf2.default)(DateTimeRange.prototype), 'controlClassName', this), 'eui-date-time-range');
        }
    }]);
    return DateTimeRange;
}(_InputControl3.default), _class2.propTypes = (0, _extends3.default)({}, _InputControl3.default.propTypes, {

    mode: _react2.default.PropTypes.oneOf([Mode.date, Mode.datetime, Mode.time]),
    format: _react2.default.PropTypes.string,
    inputFormat: _react2.default.PropTypes.string,
    startTime: _react2.default.PropTypes.string,
    endTime: _react2.default.PropTypes.string,
    startInputProps: _react2.default.PropTypes.object,
    endInputProps: _react2.default.PropTypes.object,
    changeHandler: _react2.default.PropTypes.func
}), _class2.defaultProps = (0, _extends3.default)({}, _InputControl3.default.defaultProps, {

    startInputProps: {},
    endInputProps: {},
    changeHandler: _util2.default.emptyFunc
}), _class2.Mode = Mode, _class2.Format = Format, _temp), (_applyDecoratedDescriptor(_class.prototype, 'controlClassName', [_coreDecorators.override], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'controlClassName'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'getValue', [_coreDecorators.override], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'getValue'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'startTimeChangeHandler', [_coreDecorators.autobind], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'startTimeChangeHandler'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'endTimeChangeHandler', [_coreDecorators.autobind], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'endTimeChangeHandler'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'renderControl', [_coreDecorators.override], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'renderControl'), _class.prototype)), _class);
exports.default = DateTimeRange;