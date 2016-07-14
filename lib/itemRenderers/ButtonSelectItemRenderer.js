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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _coreDecorators = require('core-decorators');

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

function getChecked(props) {
    var parentValue = props.parentValue;
    var checked = false;

    if (_underscore2.default.isString(parentValue)) {
        var values = parentValue.split(',');
        checked = _underscore2.default.contains(values, props.data.value);
    }

    return checked;
}

var ButtonSelectItemRenderer = (_class = (_temp = _class2 = function (_ItemRenderer) {
    (0, _inherits3.default)(ButtonSelectItemRenderer, _ItemRenderer);

    /* eslint-enable no-unused-vars */

    function ButtonSelectItemRenderer() {
        var _Object$getPrototypeO;

        (0, _classCallCheck3.default)(this, ButtonSelectItemRenderer);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = (0, _possibleConstructorReturn3.default)(this, (_Object$getPrototypeO = (0, _getPrototypeOf2.default)(ButtonSelectItemRenderer)).call.apply(_Object$getPrototypeO, [this].concat(args)));

        _this.state = { checked: getChecked(_this.props) };
        return _this;
    }

    (0, _createClass3.default)(ButtonSelectItemRenderer, [{
        key: 'changeHandler',
        value: function changeHandler(e) {
            var _this2 = this;

            var value = e.target.value;


            this.setState({ checked: e.target.checked }, function () {
                _this2.props.changeHandler(value, _this2.state.checked);
            });
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            (0, _get3.default)((0, _getPrototypeOf2.default)(ButtonSelectItemRenderer.prototype), 'componentWillReceiveProps', this) && (0, _get3.default)((0, _getPrototypeOf2.default)(ButtonSelectItemRenderer.prototype), 'componentWillReceiveProps', this).call(this, nextProps);
            this.setState({ checked: getChecked(nextProps) });
        }
    }, {
        key: 'renderControl',
        value: function renderControl() {
            var data = this.props.data;
            var checked = this.state.checked;


            var className = 'btn btn-default';

            if (checked) {
                className = (0, _classnames2.default)(className, 'active');
            }

            return _react2.default.createElement(
                'label',
                { className: className },
                _react2.default.createElement('input', {
                    type: 'checkbox',
                    value: data.value || "",
                    checked: this.state.checked,
                    onChange: this.changeHandler
                }),
                data.label
            );
        }
    }, {
        key: 'controlClassName',
        get: function get() {
            return (0, _classnames2.default)((0, _get3.default)((0, _getPrototypeOf2.default)(ButtonSelectItemRenderer.prototype), 'controlClassName', this), 'eui-button-select-item-renderer');
        }
    }]);
    return ButtonSelectItemRenderer;
}(_ItemRenderer3.default), _class2.propTypes = (0, _extends3.default)({}, _ItemRenderer3.default.propTypes, {

    parentValue: _react2.default.PropTypes.any,
    changeHandler: _react2.default.PropTypes.func
}), _class2.defaultProps = (0, _extends3.default)({}, _ItemRenderer3.default.defaultProps, {

    /* eslint-disable no-unused-vars */
    changeHandler: function changeHandler(v, checked) {} }), _temp), (_applyDecoratedDescriptor(_class.prototype, 'controlClassName', [_coreDecorators.override], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'controlClassName'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'changeHandler', [_coreDecorators.autobind], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'changeHandler'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'renderControl', [_coreDecorators.override], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'renderControl'), _class.prototype)), _class);
exports.default = ButtonSelectItemRenderer;