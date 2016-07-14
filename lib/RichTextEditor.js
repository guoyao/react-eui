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
                   * @file 富文本框组件
                   * @author guoyao(wuguoyao@baidu.com)
                   **/

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _InputControl2 = require('./InputControl');

var _InputControl3 = _interopRequireDefault(_InputControl2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RichTextEditor = (_temp = _class = function (_InputControl) {
    (0, _inherits3.default)(RichTextEditor, _InputControl);

    function RichTextEditor() {
        var _Object$getPrototypeO;

        (0, _classCallCheck3.default)(this, RichTextEditor);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = (0, _possibleConstructorReturn3.default)(this, (_Object$getPrototypeO = (0, _getPrototypeOf2.default)(RichTextEditor)).call.apply(_Object$getPrototypeO, [this].concat(args)));

        _this.editorId = 'rich-text-editor-' + new Date().getTime();

        if (typeof _this.props.maximumWords === 'number') {
            _this.props.config.maximumWords = _this.props.maximumWords;
        }
        return _this;
    }

    (0, _createClass3.default)(RichTextEditor, [{
        key: 'getValue',
        value: function getValue() {
            return this.editor.getContent();
        }
    }, {
        key: 'validate',
        value: function validate() {
            var maximumWords = this.props.config.maximumWords;


            var currentWords = this.editor.getContentLength(true);
            var valid = currentWords <= maximumWords;

            this.setState({ valid: valid });

            return valid;
        }
    }, {
        key: 'renderControl',
        value: function renderControl() {
            return _react2.default.createElement('div', { id: this.editorId, className: 'rich-text-editor', title: this.props.placeholder });
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            (0, _get3.default)((0, _getPrototypeOf2.default)(RichTextEditor.prototype), 'componentDidMount', this) && (0, _get3.default)((0, _getPrototypeOf2.default)(RichTextEditor.prototype), 'componentDidMount', this).call(this);

            /* eslint-disable no-undef */
            this.editor = UE.getEditor(this.editorId, this.props.config);
            /* eslint-enable */

            this.editor.ready(function () {
                _this2.editor.setContent(_this2.props.value || '');
            });
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.editor.destroy();
            (0, _get3.default)((0, _getPrototypeOf2.default)(RichTextEditor.prototype), 'componentWillUnmount', this) && (0, _get3.default)((0, _getPrototypeOf2.default)(RichTextEditor.prototype), 'componentWillUnmount', this).call(this);
        }
    }]);
    return RichTextEditor;
}(_InputControl3.default), _class.propTypes = (0, _extends3.default)({}, _InputControl3.default.propTypes, {
    placeholder: _react2.default.PropTypes.string,
    value: _react2.default.PropTypes.string,
    maximumWords: _react2.default.PropTypes.number,
    config: _react2.default.PropTypes.object
}), _class.defaultProps = (0, _extends3.default)({}, _InputControl3.default.defaultProps, {
    placeholder: '',
    value: '',
    config: {
        initialFrameHeight: 250,
        autoHeightEnabled: false,
        elementPathEnabled: false,
        enableAutoSave: false,
        maximumWords: 2000,
        zIndex: 3000,
        serverUrl: '',
        imageUrlPrefix: '',
        initialStyle: ['p,ol{line-height:1.5em; color:#494949; ' + 'font-family: Microsoft Yahei, Tahoma, Arial, Helvetica, STHeiti;; font-size:13px;}'],
        toolbars: [['source', 'undo', 'redo', 'insertunorderedlist', 'insertorderedlist', 'unlink', 'link', 'bold', 'underline', 'fontborder', 'strikethrough', 'forecolor', 'backcolor', 'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', 'removeformat', 'fontfamily', 'fontsize', '|', 'blockquote', 'cleardoc', 'formatmatch', 'indent', 'lineheight', 'paragraph', 'rowspacing', 'date', '']]
    }
}), _temp);
exports.default = RichTextEditor;