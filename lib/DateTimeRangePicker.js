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

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _DEFAULT_FORMAT, _desc, _value, _class, _class2, _temp; /**
                                                             * @file 时间区间选择组件
                                                             * @author guoyao(wuguoyao@baidu.com)
                                                             **/

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _coreDecorators = require('core-decorators');

var _reactBootstrap = require('react-bootstrap');

var _reactBootstrapDatetimerangepicker = require('react-bootstrap-datetimerangepicker');

var _reactBootstrapDatetimerangepicker2 = _interopRequireDefault(_reactBootstrapDatetimerangepicker);

var _Control = require('./Control');

var _Control2 = _interopRequireDefault(_Control);

var _InputControl2 = require('./InputControl');

var _InputControl3 = _interopRequireDefault(_InputControl2);

var _util = require('./util/util');

var _util2 = _interopRequireDefault(_util);

var _timeUtil = require('./util/timeUtil');

var _timeUtil2 = _interopRequireDefault(_timeUtil);

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
    date: 'date',
    datetime: 'datetime'
};

var DEFAULT_FORMAT = (_DEFAULT_FORMAT = {}, (0, _defineProperty3.default)(_DEFAULT_FORMAT, Mode.date, {
    format: 'YYYY-MM-DD',
    inputFormat: 'YYYY-MM-DD'
}), (0, _defineProperty3.default)(_DEFAULT_FORMAT, Mode.datetime, {
    format: 'YYYY-MM-DDTHH:mm:ssZ',
    inputFormat: 'YYYY-MM-DD HH:mm:ss'
}), _DEFAULT_FORMAT);

var Locale = {
    format: DEFAULT_FORMAT[Mode.date].inputFormat,
    separator: '-',
    applyLabel: '确定',
    cancelLabel: '取消',
    fromLabel: '从',
    toLabel: '至',
    customRangeLabel: '自定义',
    weekLabel: '周',
    daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
    monthNames: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    firstDay: 1
};

function getRanges() {
    return {
        本月: [(0, _moment2.default)().startOf('month'), (0, _moment2.default)().endOf('month')],
        上月: [(0, _moment2.default)().subtract(1, 'month').startOf('month'), (0, _moment2.default)().subtract(1, 'month').endOf('month')],
        本季度: [(0, _moment2.default)().startOf('quarter'), (0, _moment2.default)().endOf('quarter')],
        下季度: [(0, _moment2.default)().add(1, 'quarter').startOf('quarter'), (0, _moment2.default)().add(1, 'quarter').endOf('quarter')],
        本年: [(0, _moment2.default)().startOf('year'), (0, _moment2.default)().endOf('year')],
        全部: [(0, _moment2.default)('2000', 'YYYY').startOf('year'), (0, _moment2.default)('2050', 'YYYY').endOf('year')]
    };
}

function getSingleRanges() {
    return {
        今天: [(0, _moment2.default)().endOf('day'), (0, _moment2.default)().endOf('day')],
        昨天: [(0, _moment2.default)().subtract(1, 'day').endOf('day'), (0, _moment2.default)().subtract(1, 'day').endOf('day')],
        明天: [(0, _moment2.default)().add(1, 'day').endOf('day'), (0, _moment2.default)().add(1, 'day').endOf('day')],
        前天: [(0, _moment2.default)().subtract(2, 'day').endOf('day'), (0, _moment2.default)().subtract(2, 'day').endOf('day')],
        后天: [(0, _moment2.default)().add(2, 'day').endOf('day'), (0, _moment2.default)().add(2, 'day').endOf('day')]
    };
}

function buildRange(value) {
    var startDate = void 0;
    var endDate = void 0;

    if (value) {
        var _value$split = value.split(/\s*,\s*/);

        var _value$split2 = (0, _slicedToArray3.default)(_value$split, 2);

        startDate = _value$split2[0];
        endDate = _value$split2[1];
    }

    return { startDate: startDate, endDate: endDate };
}

function getRange(value, ranges, format, singleDatePicker) {
    var range = buildRange(value);
    var unit = 'second';

    if (format === DEFAULT_FORMAT.date.format) {
        unit = 'day';
        /Z$/.test(range.startDate) && (range.startDate = _timeUtil2.default.toTime(range.startDate));
        /Z$/.test(range.endDate) && (range.endDate = _timeUtil2.default.toTime(range.endDate));
    }

    range.startDate = range.startDate ? (0, _moment2.default)(range.startDate, format) : (0, _moment2.default)();
    range.endDate = range.endDate ? (0, _moment2.default)(range.endDate, format) : (0, _moment2.default)();

    if (singleDatePicker) {
        range.endDate = range.startDate;
    }

    _underscore2.default.each(ranges, function (dates) {
        var _dates = (0, _slicedToArray3.default)(dates, 2);

        var rangeStart = _dates[0];
        var rangeEnd = _dates[1];

        if (rangeStart.isSame(range.startDate, unit) && rangeEnd.isSame(range.endDate, unit)) {
            range.startDate = rangeStart;
            range.endDate = rangeEnd;
        }
    });

    return range;
}

var DateTimeRangePickerEx = (_class = (_temp = _class2 = function (_InputControl) {
    (0, _inherits3.default)(DateTimeRangePickerEx, _InputControl);

    function DateTimeRangePickerEx() {
        var _Object$getPrototypeO;

        (0, _classCallCheck3.default)(this, DateTimeRangePickerEx);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = (0, _possibleConstructorReturn3.default)(this, (_Object$getPrototypeO = (0, _getPrototypeOf2.default)(DateTimeRangePickerEx)).call.apply(_Object$getPrototypeO, [this].concat(args)));

        var _this$props = _this.props;
        var inputFormat = _this$props.inputFormat;
        var mode = _this$props.mode;
        var value = _this$props.value;
        var ranges = _this$props.ranges;
        var singleDatePicker = _this$props.singleDatePicker;


        _this.format = DEFAULT_FORMAT[mode].format;
        _this.inputFormat = inputFormat || DEFAULT_FORMAT[mode].inputFormat;
        _this.ranges = ranges || (singleDatePicker ? getSingleRanges() : getRanges());
        _this.state = getRange(value, _this.ranges, _this.format, singleDatePicker);
        return _this;
    }

    (0, _createClass3.default)(DateTimeRangePickerEx, [{
        key: 'getValue',
        value: function getValue() {
            var _state = this.state;
            var startDate = _state.startDate;
            var endDate = _state.endDate;
            var singleDatePicker = this.props.singleDatePicker;


            if (/Z$/.test(this.format)) {
                if (singleDatePicker) {
                    return _timeUtil2.default.timeToUtc(startDate.clone());
                }

                return _timeUtil2.default.timeToUtc(startDate.clone()) + ',' + _timeUtil2.default.timeToUtc(endDate.clone());
            }

            if (singleDatePicker) {
                return startDate.format(this.format);
            }

            return startDate.format(this.format) + ',' + endDate.format(this.format);
        }
    }, {
        key: '_applyHandler',
        value: function _applyHandler(e, picker) {
            var _this2 = this;

            var startDate = picker.startDate;
            var endDate = picker.endDate;


            if (this.props.singleDatePicker) {
                endDate = startDate;
            }

            this.setState({ startDate: startDate, endDate: endDate }, function () {
                _this2.props.changeHandler(_this2.getValue());
            });
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            (0, _get3.default)((0, _getPrototypeOf2.default)(DateTimeRangePickerEx.prototype), 'componentWillReceiveProps', this) && (0, _get3.default)((0, _getPrototypeOf2.default)(DateTimeRangePickerEx.prototype), 'componentWillReceiveProps', this).call(this, nextProps);

            if (this.props.value !== nextProps.value) {
                this.setState(getRange(nextProps.value, this.ranges, this.format, nextProps.singleDatePicker));
            }
        }
    }, {
        key: 'renderControl',
        value: function renderControl() {
            var props = _underscore2.default.omit(this.props, 'className', 'mode', 'format', 'inputFormat');
            var _state2 = this.state;
            var startDate = _state2.startDate;
            var endDate = _state2.endDate;


            props = _underscore2.default.extend(props, {
                startDate: startDate,
                endDate: endDate,
                ranges: this.ranges,
                timePicker: this.props.mode === Mode.datetime,
                locale: _underscore2.default.extend({}, Locale, this.props.locale, { format: this.inputFormat }),
                onApply: this._applyHandler
            });

            var start = startDate.format(this.inputFormat);
            var end = endDate.format(this.inputFormat);

            var label = start === end ? start : start + ' - ' + end;
            var preDefinedRange = void 0;

            _underscore2.default.each(props.ranges, function (dates, key) {
                var _dates2 = (0, _slicedToArray3.default)(dates, 2);

                var rangeStart = _dates2[0];
                var rangeEnd = _dates2[1];

                if (rangeStart.isSame(startDate) && rangeEnd.isSame(endDate)) {
                    preDefinedRange = key;
                }
            });

            if (preDefinedRange) {
                label = preDefinedRange === '全部' ? '全部' : preDefinedRange + ' ' + label;
            }

            return _react2.default.createElement(
                _Control2.default,
                { className: this.controlClassName },
                _react2.default.createElement(
                    _reactBootstrapDatetimerangepicker2.default,
                    props,
                    _react2.default.createElement(
                        _reactBootstrap.Button,
                        null,
                        _react2.default.createElement(
                            'div',
                            { className: 'pull-left' },
                            _react2.default.createElement(
                                'span',
                                null,
                                label
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'pull-right' },
                            _react2.default.createElement('i', { className: 'fa fa-calendar' })
                        )
                    )
                )
            );
        }
    }, {
        key: 'controlClassName',
        get: function get() {
            return (0, _classnames2.default)((0, _get3.default)((0, _getPrototypeOf2.default)(DateTimeRangePickerEx.prototype), 'controlClassName', this), 'eui-date-time-range-picker');
        }
    }]);
    return DateTimeRangePickerEx;
}(_InputControl3.default), _class2.propTypes = (0, _extends3.default)({}, _InputControl3.default.propTypes, _reactBootstrapDatetimerangepicker2.default.propTypes, {

    mode: _react2.default.PropTypes.oneOf([Mode.date, Mode.datetime]),
    inputFormat: _react2.default.PropTypes.string,
    changeHandler: _react2.default.PropTypes.func
}), _class2.defaultProps = (0, _extends3.default)({}, _InputControl3.default.defaultProps, _reactBootstrapDatetimerangepicker2.default.defaultProps, {
    showDropdowns: true,
    alwaysShowCalendars: true,
    timePicker: false,
    timePickerSeconds: true,
    timePicker24Hour: true,
    linkedCalendars: false,

    mode: Mode.date,
    changeHandler: _util2.default.emptyFunc
}), _class2.Mode = Mode, _class2.Format = DEFAULT_FORMAT, _temp), (_applyDecoratedDescriptor(_class.prototype, 'controlClassName', [_coreDecorators.override], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'controlClassName'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'getValue', [_coreDecorators.override], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'getValue'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, '_applyHandler', [_coreDecorators.autobind], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, '_applyHandler'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'renderControl', [_coreDecorators.override], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'renderControl'), _class.prototype)), _class);
exports.default = DateTimeRangePickerEx;