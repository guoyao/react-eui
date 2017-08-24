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

var _class, _temp; /**
                    * @file 多级联动Select组件
                    * @author guoyao(wuguoyao@baidu.com)
                    **/

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Control = require('./Control');

var _Control2 = _interopRequireDefault(_Control);

var _InputControl2 = require('./InputControl');

var _InputControl3 = _interopRequireDefault(_InputControl2);

var _SelectItemRenderer = require('./itemRenderers/SelectItemRenderer');

var _SelectItemRenderer2 = _interopRequireDefault(_SelectItemRenderer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Select = (_temp = _class = function (_InputControl) {
    (0, _inherits3.default)(Select, _InputControl);

    function Select() {
        var _ref;

        (0, _classCallCheck3.default)(this, Select);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = (0, _possibleConstructorReturn3.default)(this, (_ref = Select.__proto__ || (0, _getPrototypeOf2.default)(Select)).call.apply(_ref, [this].concat(args)));

        _this.state = _underscore2.default.pick(_this.props, 'datasource', 'value');
        _this.numItemRenderer = 0;
        _this.selectHandler = _this.selectHandler.bind(_this);
        return _this;
    }

    (0, _createClass3.default)(Select, [{
        key: 'getInputDOMNode',
        value: function getInputDOMNode() {
            var target = (0, _get3.default)(Select.prototype.__proto__ || (0, _getPrototypeOf2.default)(Select.prototype), 'getInputDOMNode', this).call(this);
            return target || _reactDom2.default.findDOMNode(this);
        }
    }, {
        key: 'selectHandler',
        value: function selectHandler(e, value, datasource, index) {
            var _this2 = this;

            var selectHandler = this.props.selectHandler;

            var selectedValue = this.state.value || value;

            var selectedValues = selectedValue.split(',');

            if (this.props.disableChange) {
                selectHandler(value, datasource, index, selectedValues);
                return;
            }

            selectedValues.splice(index, selectedValues.length, value);

            var selectedItem = _underscore2.default.find(datasource, function (item) {
                return item.value === value;
            });

            if (selectedItem.children && selectedItem.children.length) {
                selectedValues.push(this.props.isRawSource && selectedItem.children[0] && selectedItem.children[0].value || '');
            }

            this.setState({ value: selectedValues.join(',') }, function () {
                _this2.validate();
                selectHandler(value, datasource, index, selectedValues);
            });
        }
    }, {
        key: 'getValue',
        value: function getValue() {
            var _this3 = this;

            var _state = this.state,
                datasource = _state.datasource,
                value = _state.value;

            // 处理初始值本身是错误的问题

            if (value) {
                var i, length;

                (function () {
                    var selectedValues = value.split(',');
                    var values = [];

                    for (i = 0, length = selectedValues.length; i < length; i++) {
                        if (!datasource || datasource.length === 0) {
                            break;
                        }

                        /* eslint-disable no-loop-func */
                        var index = _underscore2.default.findIndex(_underscore2.default.pluck(datasource, 'value'), function (v) {
                            return v === selectedValues[i];
                        });
                        /* eslint-enable no-loop-func */

                        if (index > -1) {
                            values.push(selectedValues[i]);
                            datasource = datasource[index].children;
                        } else {
                            _this3.props.isRawSource && values.push(datasource[0].value || '');
                            break;
                        }
                    }

                    value = values.join(',');
                })();
            }

            if (this.props.isRawSource && value === undefined) {
                value = datasource[0] ? datasource[0].value : '';
            }

            return value ? value.replace(/,$/, '') : '';
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            (0, _get3.default)(Select.prototype.__proto__ || (0, _getPrototypeOf2.default)(Select.prototype), 'componentWillReceiveProps', this) && (0, _get3.default)(Select.prototype.__proto__ || (0, _getPrototypeOf2.default)(Select.prototype), 'componentWillReceiveProps', this).call(this, nextProps);

            var datasource = nextProps.datasource,
                value = nextProps.value;


            if (this.props.datasource !== datasource) {
                this.setState({ datasource: datasource });
            }

            if (this.props.value !== value) {
                this.setState({ value: value });
            }
        }
    }, {
        key: 'renderControl',
        value: function renderControl() {
            var _this4 = this;

            var value = this.state.value;
            var datasource = this.state.datasource;

            var selectedValues = value && value.split(',') || [''];
            var datasources = [];

            if (datasource && datasource.length > 0) {
                do {
                    var datasourceItem = { datasource: datasource };
                    var selectedItem = _underscore2.default.find(datasource, function (item) {
                        return item.value === selectedValues[0];
                    });
                    datasources.push(datasourceItem);

                    if (!selectedItem) {
                        datasourceItem.value = '';
                        break;
                    }

                    datasourceItem.value = selectedItem.value;
                    datasource = selectedItem.children;

                    if (!datasource || datasource.length === 0) {
                        break;
                    }

                    if (selectedValues.shift() && selectedValues.length === 0) {
                        selectedValues.push('');
                    }
                } while (selectedValues.length > 0);
            }

            this.numItemRenderer = datasources.length;

            var _props = this.props,
                isRawSource = _props.isRawSource,
                emptyLabel = _props.emptyLabel,
                disabled = _props.disabled,
                disableChange = _props.disableChange;


            return _react2.default.createElement(
                _Control2.default,
                { className: this.controlClassName },
                datasources.map(function (datasource, index) {
                    return _react2.default.createElement(_this4.props.itemRenderer, {
                        key: index,
                        index: index,
                        data: datasource,
                        parent: _this4,
                        isRawSource: isRawSource,
                        emptyLabel: emptyLabel,
                        disabled: !!disabled,
                        disableChange: !!disableChange,
                        selectHandler: _this4.selectHandler
                    });
                })
            );
        }
    }, {
        key: 'controlClassName',
        get: function get() {
            return (0, _classnames2.default)((0, _get3.default)(Select.prototype.__proto__ || (0, _getPrototypeOf2.default)(Select.prototype), 'controlClassName', this), 'eui-select');
        }
    }]);
    return Select;
}(_InputControl3.default), _class.propTypes = (0, _extends3.default)({}, _InputControl3.default.propTypes, {

    datasource: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.object),
    isRawSource: _react2.default.PropTypes.bool,
    emptyLabel: _react2.default.PropTypes.string,
    disableChange: _react2.default.PropTypes.bool,
    itemRenderer: _react2.default.PropTypes.func,
    selectHandler: _react2.default.PropTypes.func
}), _class.defaultProps = (0, _extends3.default)({}, _InputControl3.default.defaultProps, {

    itemRenderer: _SelectItemRenderer2.default,

    /* eslint-disable no-unused-vars */
    /**
     * 选择后的回调函数
     *
     * @param  {string} value         所选的那个子下拉组件的值
     * @param  {Array} datasource     所选的那个子下拉组件的数据源
     * @param  {int} index            所选的那个子下拉组件的序号，即第几个子下拉组件
     * @param  {Array} selectedValues 选择的值的集合
     */
    selectHandler: function selectHandler(value, datasource, index, selectedValues) {}
    /* eslint-enable no-unused-vars */
}), _temp);
exports.default = Select;