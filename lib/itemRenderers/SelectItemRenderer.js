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

var _desc, _value, _class, _class2, _temp;

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _coreDecorators = require('core-decorators');

var _reactBootstrap = require('react-bootstrap');

var _ItemRenderer2 = require('./ItemRenderer');

var _ItemRenderer3 = _interopRequireDefault(_ItemRenderer2);

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

var SelectItemRenderer = (_class = (_temp = _class2 = function (_ItemRenderer) {
    (0, _inherits3.default)(SelectItemRenderer, _ItemRenderer);

    /* eslint-enable no-unused-vars */

    function SelectItemRenderer() {
        var _Object$getPrototypeO;

        (0, _classCallCheck3.default)(this, SelectItemRenderer);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = (0, _possibleConstructorReturn3.default)(this, (_Object$getPrototypeO = (0, _getPrototypeOf2.default)(SelectItemRenderer)).call.apply(_Object$getPrototypeO, [this].concat(args)));

        _this.euiId = 'item-renderer-' + new Date().getTime();
        _this.state = { value: _this.props.data.value };
        _this.selectHandler = _this.selectHandler.bind(_this);
        _this.datasource = _this.getDatasource(_this.props);
        return _this;
    }

    (0, _createClass3.default)(SelectItemRenderer, [{
        key: 'getDatasource',
        value: function getDatasource(props) {
            var isRawSource = props.isRawSource;
            var data = props.data;
            var emptyLabel = props.emptyLabel;


            var datasource = data.datasource;

            datasource = !datasource ? [] : datasource.slice();

            if (!isRawSource && datasource[0] && datasource[0].value !== '') {
                datasource.unshift({ label: emptyLabel || '请选择', value: '' });
            }

            return datasource;
        }
    }, {
        key: 'selectHandler',
        value: function selectHandler(e, value) {
            var _this2 = this;

            if (this.props.disableChange) {
                this.props.selectHandler(e, value, this.datasource, this.props.index);

                return false;
            }

            this.setState({ value: value }, function () {
                _this2.props.selectHandler(e, value, _this2.datasource, _this2.props.index);
            });
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            (0, _get3.default)((0, _getPrototypeOf2.default)(SelectItemRenderer.prototype), 'componentWillReceiveProps', this) && (0, _get3.default)((0, _getPrototypeOf2.default)(SelectItemRenderer.prototype), 'componentWillReceiveProps', this).call(this, nextProps);

            if (this.props.data !== nextProps.data) {
                this.setState({ value: nextProps.data.value });
                this.datasource = this.getDatasource(nextProps);
            }
        }
    }, {
        key: 'renderControl',
        value: function renderControl() {
            if (this.datasource.length === 0) {
                return null;
            }

            var value = this.state.value;

            var selectedItem = _underscore2.default.find(this.datasource, function (item) {
                return item.value === value;
            });
            !selectedItem && (selectedItem = this.datasource[0]);

            var title = selectedItem.label;

            return _react2.default.createElement(
                _reactBootstrap.DropdownButton,
                {
                    id: this.euiId + '-dropdown',
                    title: title,
                    disabled: !!this.props.disabled,
                    onSelect: this.selectHandler
                },
                this.datasource.map(function (item) {
                    return _react2.default.createElement(
                        _reactBootstrap.MenuItem,
                        {
                            key: item.value,
                            eventKey: item.value,
                            disabled: !!item.disabled
                        },
                        item.label
                    );
                })
            );
        }
    }, {
        key: 'controlClassName',
        get: function get() {
            return (0, _classnames2.default)((0, _get3.default)((0, _getPrototypeOf2.default)(SelectItemRenderer.prototype), 'controlClassName', this), 'eui-select-item-renderer');
        }
    }]);
    return SelectItemRenderer;
}(_ItemRenderer3.default), _class2.propTypes = (0, _extends3.default)({}, _ItemRenderer3.default.propTypes, {

    index: _react2.default.PropTypes.number.isRequired,
    isRawSource: _react2.default.PropTypes.bool,
    emptyLabel: _react2.default.PropTypes.string,
    disableChange: _react2.default.PropTypes.bool,
    selectHandler: _react2.default.PropTypes.func
}), _class2.defaultProps = (0, _extends3.default)({}, _ItemRenderer3.default.defaultProps, {

    /* eslint-disable no-unused-vars */
    selectHandler: function selectHandler(e, value, datasource, index) {} }), _temp), (_applyDecoratedDescriptor(_class.prototype, 'controlClassName', [_coreDecorators.override], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'controlClassName'), _class.prototype)), _class);
exports.default = SelectItemRenderer;