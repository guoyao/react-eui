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

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _DEFAULT_FORMAT, _class, _temp, _initialiseProps; /**
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

var DateTimeFieldEx = (_temp = _class = function (_InputControl) {
    (0, _inherits3.default)(DateTimeFieldEx, _InputControl);

    function DateTimeFieldEx() {
        var _ref;

        (0, _classCallCheck3.default)(this, DateTimeFieldEx);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = (0, _possibleConstructorReturn3.default)(this, (_ref = DateTimeFieldEx.__proto__ || (0, _getPrototypeOf2.default)(DateTimeFieldEx)).call.apply(_ref, [this].concat(args)));

        _initialiseProps.call(_this);

        var _this$props = _this.props,
            format = _this$props.format,
            inputFormat = _this$props.inputFormat,
            mode = _this$props.mode,
            value = _this$props.value;


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
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            (0, _get3.default)(DateTimeFieldEx.prototype.__proto__ || (0, _getPrototypeOf2.default)(DateTimeFieldEx.prototype), 'componentWillReceiveProps', this) && (0, _get3.default)(DateTimeFieldEx.prototype.__proto__ || (0, _getPrototypeOf2.default)(DateTimeFieldEx.prototype), 'componentWillReceiveProps', this).call(this, nextProps);

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

            return (0, _classnames2.default)((0, _get3.default)(DateTimeFieldEx.prototype.__proto__ || (0, _getPrototypeOf2.default)(DateTimeFieldEx.prototype), 'controlClassName', this), className);
        }
    }]);
    return DateTimeFieldEx;
}(_InputControl3.default), _class.propTypes = (0, _extends3.default)({}, _InputControl3.default.propTypes, _reactBootstrapDatetimepicker2.default.propTypes, {

    changeHandler: _react2.default.PropTypes.func
}), _class.defaultProps = (0, _extends3.default)({}, _InputControl3.default.defaultProps, _underscore2.default.omit(_reactBootstrapDatetimepicker2.default.defaultProps, 'dateTime', 'format'), {

    inputProps: {},
    changeHandler: _util2.default.emptyFunc
}), _class.Mode = Mode, _class.Format = DEFAULT_FORMAT, _initialiseProps = function _initialiseProps() {
    var _this2 = this;

    this.changeHandler = function (value) {
        _this2.setState({ value: value }, function () {
            _this2.props.changeHandler(_this2.getValue());
        });
    };
}, _temp);
exports.default = DateTimeFieldEx;