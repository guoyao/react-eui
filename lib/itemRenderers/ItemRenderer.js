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

var _desc, _value, _class, _class2, _temp; /**
                                            * @file 所有ItemRenderer组件的基类
                                            * @author guoyao(wuguoyao@baidu.com)
                                            **/

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _coreDecorators = require('core-decorators');

var _Control2 = require('../Control');

var _Control3 = _interopRequireDefault(_Control2);

var _InputControl = require('../InputControl');

var _InputControl2 = _interopRequireDefault(_InputControl);

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

var ItemRenderer = (_class = (_temp = _class2 = function (_Control) {
    (0, _inherits3.default)(ItemRenderer, _Control);

    function ItemRenderer() {
        (0, _classCallCheck3.default)(this, ItemRenderer);
        return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ItemRenderer).apply(this, arguments));
    }

    (0, _createClass3.default)(ItemRenderer, [{
        key: 'renderControl',
        value: function renderControl() {
            return (0, _get3.default)((0, _getPrototypeOf2.default)(ItemRenderer.prototype), 'renderControl', this).call(this);
        }
    }, {
        key: 'controlClassName',
        get: function get() {
            return (0, _classnames2.default)((0, _get3.default)((0, _getPrototypeOf2.default)(ItemRenderer.prototype), 'controlClassName', this), 'eui-item-renderer');
        }
    }]);
    return ItemRenderer;
}(_Control3.default), _class2.propTypes = (0, _extends3.default)({}, _Control3.default.propTypes, {

    data: _react2.default.PropTypes.any.isRequired,
    parent: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.instanceOf(_Control3.default), _react2.default.PropTypes.instanceOf(_InputControl2.default)]).isRequired
}), _class2.defaultProps = (0, _extends3.default)({}, _Control3.default.defaultProps), _temp), (_applyDecoratedDescriptor(_class.prototype, 'controlClassName', [_coreDecorators.override], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'controlClassName'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'renderControl', [_coreDecorators.override], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'renderControl'), _class.prototype)), _class);
exports.default = ItemRenderer;