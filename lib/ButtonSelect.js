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

var _class, _temp, _initialiseProps; /**
                                     * @file 按钮选择组件
                                     * @author guoyao(wuguoyao@baidu.com)
                                     **/

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Control = require('./Control');

var _Control2 = _interopRequireDefault(_Control);

var _InputControl2 = require('./InputControl');

var _InputControl3 = _interopRequireDefault(_InputControl2);

var _ButtonSelectItemRenderer = require('./itemRenderers/ButtonSelectItemRenderer');

var _ButtonSelectItemRenderer2 = _interopRequireDefault(_ButtonSelectItemRenderer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function buildValue(multiple, value) {
    if (!multiple && value) {
        return value.split(',')[0];
    }

    return value;
}

var ButtonSelect = (_temp = _class = function (_InputControl) {
    (0, _inherits3.default)(ButtonSelect, _InputControl);

    function ButtonSelect() {
        var _ref;

        (0, _classCallCheck3.default)(this, ButtonSelect);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = (0, _possibleConstructorReturn3.default)(this, (_ref = ButtonSelect.__proto__ || (0, _getPrototypeOf2.default)(ButtonSelect)).call.apply(_ref, [this].concat(args)));

        _initialiseProps.call(_this);

        var _this$props = _this.props,
            datasource = _this$props.datasource,
            value = _this$props.value,
            multiple = _this$props.multiple;


        _this.state = {
            datasource: datasource,
            value: buildValue(multiple, value)
        };
        return _this;
    }

    (0, _createClass3.default)(ButtonSelect, [{
        key: 'getValue',
        value: function getValue() {
            return this.state.value;
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            (0, _get3.default)(ButtonSelect.prototype.__proto__ || (0, _getPrototypeOf2.default)(ButtonSelect.prototype), 'componentWillReceiveProps', this) && (0, _get3.default)(ButtonSelect.prototype.__proto__ || (0, _getPrototypeOf2.default)(ButtonSelect.prototype), 'componentWillReceiveProps', this).call(this, nextProps);

            var datasource = nextProps.datasource,
                value = nextProps.value;


            if (this.props.datasource !== datasource) {
                this.setState({ datasource: datasource });
            }

            if (this.props.value !== value) {
                this.setState({ value: buildValue(this.props.multiple, value) });
            }
        }
    }, {
        key: 'renderControl',
        value: function renderControl() {
            var _this2 = this;

            var _state = this.state,
                datasource = _state.datasource,
                value = _state.value;


            if (!datasource || datasource.length === 0) {
                return null;
            }

            return _react2.default.createElement(
                _Control2.default,
                { className: this.controlClassName },
                datasource.map(function (item, index) {
                    return _react2.default.createElement(_this2.props.itemRenderer, {
                        key: index,
                        className: 'btn-group',
                        'data-toggle': 'buttons',
                        data: item,
                        parent: _this2,
                        parentValue: value,
                        changeHandler: _this2.changeHandler
                    });
                })
            );
        }
    }, {
        key: 'controlClassName',
        get: function get() {
            return (0, _classnames2.default)((0, _get3.default)(ButtonSelect.prototype.__proto__ || (0, _getPrototypeOf2.default)(ButtonSelect.prototype), 'controlClassName', this), 'eui-button-select');
        }
    }]);
    return ButtonSelect;
}(_InputControl3.default), _class.propTypes = (0, _extends3.default)({}, _InputControl3.default.propTypes, {

    itemRenderer: _react2.default.PropTypes.func,
    multiple: _react2.default.PropTypes.bool,
    keepOne: _react2.default.PropTypes.bool, // 是否至少保持一个处于选中状态
    datasource: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.object),
    changeHandler: _react2.default.PropTypes.func
}), _class.defaultProps = (0, _extends3.default)({}, _InputControl3.default.defaultProps, {

    itemRenderer: _ButtonSelectItemRenderer2.default,
    multiple: true,
    keepOne: false,

    /* eslint-disable no-unused-vars */
    changeHandler: function changeHandler(value) {}
    /* eslint-enable no-unused-vars */
}), _initialiseProps = function _initialiseProps() {
    var _this3 = this;

    this.changeHandler = function (value, checked) {
        var values = _underscore2.default.isString(_this3.state.value) ? _this3.state.value.split(',') : [];
        var index = _underscore2.default.findIndex(values, function (v) {
            return v === value;
        });

        if (checked) {
            !_this3.props.multiple && values.splice(0, values.length);
            index === -1 && values.push(value);
        } else if (index !== -1 && !(_this3.props.keepOne && values.length === 1)) {
            values.splice(index, 1);
        }

        var oldValue = _this3.getValue();
        var newValue = values.join(',');

        _this3.setState({ value: values.join(',') }, function () {
            if (oldValue !== newValue) {
                _this3.props.changeHandler(_this3.getValue());
            }
        });
    };
}, _temp);
exports.default = ButtonSelect;