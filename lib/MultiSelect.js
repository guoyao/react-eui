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

var _symbol = require('babel-runtime/core-js/symbol');

var _symbol2 = _interopRequireDefault(_symbol);

var _desc, _value, _class, _class2, _temp; /**
                                            * @file 多选下拉控件
                                            * @author chenqiang(chenqiang03@baidu.com)
                                            */

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _coreDecorators = require('core-decorators');

var _addEventListener = require('react-overlays/lib/utils/addEventListener');

var _addEventListener2 = _interopRequireDefault(_addEventListener);

var _ownerDocument = require('react-overlays/lib/utils/ownerDocument');

var _ownerDocument2 = _interopRequireDefault(_ownerDocument);

var _Control = require('./Control');

var _Control2 = _interopRequireDefault(_Control);

var _InputControl2 = require('./InputControl');

var _InputControl3 = _interopRequireDefault(_InputControl2);

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

function getSuppressRootClose() {
    var id = (0, _symbol2.default)('__click_was_inside');

    return {
        id: id,
        suppressRootClose: function suppressRootClose(event) {
            // Tag the native event to prevent the root close logic on document click.
            // This seems safer than using event.nativeEvent.stopImmediatePropagation(),
            // which is only supported in IE >= 9.
            event.nativeEvent[id] = true;
        }
    };
}

function getLabel(item, labelField) {
    return _underscore2.default.isObject(item) ? item[labelField] : item;
}

function getValue(item, valueField) {
    return _underscore2.default.isObject(item) ? item[valueField] : item;
}

var MultiSelect = (_class = (_temp = _class2 = function (_InputControl) {
    (0, _inherits3.default)(MultiSelect, _InputControl);

    /* eslint-enable */

    function MultiSelect() {
        var _Object$getPrototypeO;

        (0, _classCallCheck3.default)(this, MultiSelect);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = (0, _possibleConstructorReturn3.default)(this, (_Object$getPrototypeO = (0, _getPrototypeOf2.default)(MultiSelect)).call.apply(_Object$getPrototypeO, [this].concat(args)));

        _this.state = {
            show: false,
            datasource: _this.props.datasource,
            value: _this.props.value
        };
        return _this;
    }

    (0, _createClass3.default)(MultiSelect, [{
        key: 'getValue',
        value: function getValue() {
            return this.filteredValue;
        }
    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
            (0, _get3.default)((0, _getPrototypeOf2.default)(MultiSelect.prototype), 'componentWillMount', this) && (0, _get3.default)((0, _getPrototypeOf2.default)(MultiSelect.prototype), 'componentWillMount', this).call(this);

            var _getSuppressRootClose = getSuppressRootClose();

            var id = _getSuppressRootClose.id;
            var suppressRootClose = _getSuppressRootClose.suppressRootClose;


            this._suppressRootId = id;
            this._suppressRootCloseHandler = suppressRootClose.bind(this);
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            (0, _get3.default)((0, _getPrototypeOf2.default)(MultiSelect.prototype), 'componentDidMount', this) && (0, _get3.default)((0, _getPrototypeOf2.default)(MultiSelect.prototype), 'componentDidMount', this).call(this);

            // bindRootCloseHandler
            var doc = (0, _ownerDocument2.default)(this);
            this._onDocumentClickListener = (0, _addEventListener2.default)(doc, 'click', this.handleDocumentClick);
        }
    }, {
        key: 'changeHandler',
        value: function changeHandler(e) {
            var _this2 = this;

            var itemChecked = e.target.checked;
            var itemValue = e.target.value;
            var values = this.state.value ? this.state.value.split(',') : [];

            if (itemChecked) {
                values.push(itemValue);
            } else {
                var index = _underscore2.default.indexOf(values, itemValue);
                values.splice(index, 1);
            }

            var value = values.join();

            this.setState({ value: value }, function () {
                _this2.props.changeHandler(_this2.filteredValue, itemValue, itemChecked);
            });
        }
    }, {
        key: 'toggleDropdown',
        value: function toggleDropdown() {
            this.state.show ? this.closeDropdown() : this.openDropdown();
        }
    }, {
        key: 'openDropdown',
        value: function openDropdown() {
            this.setState({ show: true });
        }
    }, {
        key: 'closeDropdown',
        value: function closeDropdown() {
            this.setState({ show: false });
        }
    }, {
        key: 'handleDocumentClick',
        value: function handleDocumentClick(e) {
            // This is now the native event.
            if (e[this._suppressRootId]) {
                return;
            }

            this.closeDropdown();
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            (0, _get3.default)((0, _getPrototypeOf2.default)(MultiSelect.prototype), 'componentWillReceiveProps', this) && (0, _get3.default)((0, _getPrototypeOf2.default)(MultiSelect.prototype), 'componentWillReceiveProps', this).call(this, nextProps);

            if (this.props.value !== nextProps.value) {
                this.setState({ value: nextProps.value });
            }

            if (this.props.datasource !== nextProps.datasource) {
                this.datasource = nextProps.datasource;
            }
        }
    }, {
        key: 'renderDropdown',
        value: function renderDropdown() {
            var _this3 = this;

            var _props = this.props;
            var datasource = _props.datasource;
            var labelField = _props.labelField;
            var valueField = _props.valueField;

            var values = this.state.value ? this.state.value.split(',') : [];

            return _react2.default.createElement(
                'ul',
                { className: this.state.show ? 'eui-multi-select-list active' : 'eui-multi-select-list' },
                datasource.map(function (item, key) {
                    var label = getLabel(item, labelField);
                    var value = getValue(item, valueField);

                    return _react2.default.createElement(
                        'li',
                        { key: key, className: _underscore2.default.contains(values, value) ? 'active' : '' },
                        _react2.default.createElement(
                            'label',
                            null,
                            _react2.default.createElement('input', {
                                type: 'checkbox',
                                defaultValue: value,
                                defaultChecked: _underscore2.default.contains(values, value),
                                onChange: _this3.changeHandler
                            }),
                            _react2.default.createElement(
                                'span',
                                null,
                                label
                            )
                        )
                    );
                })
            );
        }
    }, {
        key: 'renderControl',
        value: function renderControl() {
            var _this4 = this;

            var datasource = this.props.datasource;

            var values = this.state.value ? this.state.value.split(',') : [];
            var labels = [];

            _underscore2.default.each(values, function (value) {
                var item = _underscore2.default.find(datasource, function (v) {
                    return getValue(v, _this4.props.valueField) === value;
                });

                item && labels.push(getLabel(item, _this4.props.labelField));
            });

            var displayContent = labels.join() || '请选择';

            return _react2.default.createElement(
                _Control2.default,
                { className: this.controlClassName, onClick: this._suppressRootCloseHandler },
                _react2.default.createElement(
                    'div',
                    {
                        className: 'eui-multi-select-head',
                        title: displayContent,
                        onClick: this.toggleDropdown
                    },
                    displayContent
                ),
                this.renderDropdown()
            );
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            (0, _get3.default)((0, _getPrototypeOf2.default)(MultiSelect.prototype), 'componentWillUnmount', this) && (0, _get3.default)((0, _getPrototypeOf2.default)(MultiSelect.prototype), 'componentWillUnmount', this).call(this);

            // unbindRootCloseHandler
            if (this._onDocumentClickListener) {
                this._onDocumentClickListener.remove();
            }
        }
    }, {
        key: 'controlClassName',
        get: function get() {
            return (0, _classnames2.default)((0, _get3.default)((0, _getPrototypeOf2.default)(MultiSelect.prototype), 'controlClassName', this), 'eui-multi-select');
        }
    }, {
        key: 'filteredValue',
        get: function get() {
            var _this5 = this;

            var _state = this.state;
            var value = _state.value;
            var datasource = _state.datasource;

            var values = value ? value.split(',') : [];
            var newValues = [];

            // 过滤掉不合法的value，即不在datasource里面的value
            _underscore2.default.each(values, function (value) {
                var item = _underscore2.default.find(datasource, function (v) {
                    return getValue(v, _this5.props.valueField) === value;
                });

                item && newValues.push(getValue(item, _this5.props.valueField));
            });

            return newValues.join();
        }
    }]);
    return MultiSelect;
}(_InputControl3.default), _class2.propTypes = (0, _extends3.default)({}, _InputControl3.default.propTypes, {

    labelField: _react2.default.PropTypes.string,
    valueField: _react2.default.PropTypes.string,
    datasource: _react2.default.PropTypes.array,
    changeHandler: _react2.default.PropTypes.func
}), _class2.defaultProps = (0, _extends3.default)({}, _InputControl3.default.defaultProps, {

    labelField: 'label',
    valueField: 'value',

    /* eslint-disable */
    /**
     * 选择后的回调函数
     *
     * @param  {string} value         选中的所有值
     * @param  {string} itemValue     子组件的值
     * @param  {boolean} itemChecked  子组件的选中状态
     */
    changeHandler: function changeHandler(value, itemValue, itemChecked) {} }), _temp), (_applyDecoratedDescriptor(_class.prototype, 'controlClassName', [_coreDecorators.override], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'controlClassName'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'getValue', [_coreDecorators.override], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'getValue'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'changeHandler', [_coreDecorators.autobind], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'changeHandler'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'toggleDropdown', [_coreDecorators.autobind], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'toggleDropdown'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'handleDocumentClick', [_coreDecorators.autobind], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'handleDocumentClick'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'renderControl', [_coreDecorators.override], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'renderControl'), _class.prototype)), _class);
exports.default = MultiSelect;