'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

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

var _class, _temp2; /**
                     * @file 时间区间选择组件
                     * @author guoyao(wuguoyao@baidu.com)
                     **/

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Control = require('./Control');

var _Control2 = _interopRequireDefault(_Control);

var _InputControl2 = require('./InputControl');

var _InputControl3 = _interopRequireDefault(_InputControl2);

var _DateTimeField = require('./DateTimeField');

var _DateTimeField2 = _interopRequireDefault(_DateTimeField);

var _util = require('./util/util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var DateTimeRange = (_temp2 = _class = function (_InputControl) {
    (0, _inherits3.default)(DateTimeRange, _InputControl);

    function DateTimeRange() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, DateTimeRange);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = DateTimeRange.__proto__ || (0, _getPrototypeOf2.default)(DateTimeRange)).call.apply(_ref, [this].concat(args))), _this), _this.startTimeChangeHandler = function (value) {
            _this.validate();
            _this.props.changeHandler(_this.getValue());
        }, _this.endTimeChangeHandler = function (value) {
            _this.validate();
            _this.props.changeHandler(_this.getValue());
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(DateTimeRange, [{
        key: 'getValue',
        value: function getValue() {
            return [this.refs.startDateTimeField.getValue(), this.refs.endDateTimeField.getValue()].join(',');
        }

        /* eslint-disable no-unused-vars */

    }, {
        key: 'renderControl',

        /* eslint-enable no-unused-vars */

        value: function renderControl() {
            var _props = this.props,
                mode = _props.mode,
                format = _props.format,
                inputFormat = _props.inputFormat,
                startInputProps = _props.startInputProps,
                endInputProps = _props.endInputProps;

            var _buildValue = buildValue(this.props),
                _buildValue2 = (0, _slicedToArray3.default)(_buildValue, 2),
                startTime = _buildValue2[0],
                endTime = _buildValue2[1];

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
            return (0, _classnames2.default)((0, _get3.default)(DateTimeRange.prototype.__proto__ || (0, _getPrototypeOf2.default)(DateTimeRange.prototype), 'controlClassName', this), 'eui-date-time-range');
        }
    }]);
    return DateTimeRange;
}(_InputControl3.default), _class.propTypes = (0, _extends3.default)({}, _InputControl3.default.propTypes, {

    mode: _react2.default.PropTypes.oneOf([Mode.date, Mode.datetime, Mode.time]),
    format: _react2.default.PropTypes.string,
    inputFormat: _react2.default.PropTypes.string,
    startTime: _react2.default.PropTypes.string,
    endTime: _react2.default.PropTypes.string,
    startInputProps: _react2.default.PropTypes.object,
    endInputProps: _react2.default.PropTypes.object,
    changeHandler: _react2.default.PropTypes.func
}), _class.defaultProps = (0, _extends3.default)({}, _InputControl3.default.defaultProps, {

    startInputProps: {},
    endInputProps: {},
    changeHandler: _util2.default.emptyFunc
}), _class.Mode = Mode, _class.Format = Format, _temp2);
exports.default = DateTimeRange;