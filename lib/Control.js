'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Control = function (_React$Component) {
    (0, _inherits3.default)(Control, _React$Component);

    function Control() {
        (0, _classCallCheck3.default)(this, Control);
        return (0, _possibleConstructorReturn3.default)(this, (Control.__proto__ || (0, _getPrototypeOf2.default)(Control)).apply(this, arguments));
    }

    (0, _createClass3.default)(Control, [{
        key: 'renderControl',
        value: function renderControl() {
            return this.props.children;
        }
    }, {
        key: 'render',
        value: function render() {
            var props = _underscore2.default.extend({}, _underscore2.default.omit(this.props, 'children', 'data'), { className: this.controlClassName });

            return _react2.default.createElement(
                'div',
                props,
                this.renderControl()
            );
        }
    }, {
        key: 'controlClassName',
        get: function get() {
            return (0, _classnames2.default)('eui-control', this.props.className);
        }
    }]);
    return Control;
}(_react2.default.Component); /**
                              * @file 非input组件基类
                              * @author guoyao(wuguoyao@baidu.com)
                              **/

exports.default = Control;