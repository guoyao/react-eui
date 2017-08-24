'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

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

var _class, _temp, _class2, _temp2; /**
                                     * @file 表格组件
                                     * @author guoyao(wuguoyao@baidu.com)
                                     **/

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _objectWithoutProperties2 = require('babel-runtime/helpers/object-without-properties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _pick = require('lodash-compat/object/pick');

var _pick2 = _interopRequireDefault(_pick);

var _omit = require('lodash-compat/object/omit');

var _omit2 = _interopRequireDefault(_omit);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactBootstrapTable = require('react-bootstrap-table');

var _reactBootstrap = require('react-bootstrap');

var _ToolBar2 = require('react-bootstrap-table/lib/toolbar/ToolBar');

var _ToolBar3 = _interopRequireDefault(_ToolBar2);

var _Const = require('react-bootstrap-table/lib/Const');

var _Const3 = _interopRequireDefault(_Const);

var _Notification = require('react-bootstrap-table/lib/Notification');

var _Notification2 = _interopRequireDefault(_Notification);

require('./util/colresizable');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DropdownButtonEx = function (_DropdownButton) {
    (0, _inherits3.default)(DropdownButtonEx, _DropdownButton);

    function DropdownButtonEx() {
        (0, _classCallCheck3.default)(this, DropdownButtonEx);
        return (0, _possibleConstructorReturn3.default)(this, (DropdownButtonEx.__proto__ || (0, _getPrototypeOf2.default)(DropdownButtonEx)).apply(this, arguments));
    }

    (0, _createClass3.default)(DropdownButtonEx, [{
        key: 'render',
        value: function render() {
            var _props = this.props;
            var bsStyle = _props.bsStyle;
            var bsSize = _props.bsSize;
            var disabled = _props.disabled;
            var _props2 = this.props;
            var title = _props2.title;
            var children = _props2.children;

            var props = (0, _objectWithoutProperties3.default)(_props2, ['title', 'children']);

            var dropdownProps = (0, _pick2.default)(props, (0, _keys2.default)(_reactBootstrap.Dropdown.ControlledComponent.propTypes));
            var toggleProps = (0, _omit2.default)(props, (0, _keys2.default)(_reactBootstrap.Dropdown.ControlledComponent.propTypes));

            return _react2.default.createElement(_reactBootstrap.Dropdown, (0, _extends4.default)({}, dropdownProps, {
                bsSize: bsSize,
                bsStyle: bsStyle,
                ref: 'dropdown'
            }), _react2.default.createElement(_reactBootstrap.Dropdown.Toggle, (0, _extends4.default)({}, toggleProps, {
                disabled: disabled
            }), title), _react2.default.createElement(_reactBootstrap.Dropdown.Menu, null, children));
        }
    }]);
    return DropdownButtonEx;
}(_reactBootstrap.DropdownButton);

var TableToolBar = (_temp = _class = function (_ToolBar) {
    (0, _inherits3.default)(TableToolBar, _ToolBar);

    function TableToolBar() {
        var _ref;

        (0, _classCallCheck3.default)(this, TableToolBar);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this2 = (0, _possibleConstructorReturn3.default)(this, (_ref = TableToolBar.__proto__ || (0, _getPrototypeOf2.default)(TableToolBar)).call.apply(_ref, [this].concat(args)));

        _this2.enableCustomColumn = !!_this2.props.uniqueName;

        _this2.submitHandler = _this2.submitHandler.bind(_this2);
        _this2.cancelHandler = _this2.cancelHandler.bind(_this2);
        _this2.columnChangeHandler = _this2.columnChangeHandler.bind(_this2);
        _this2.toggleHandler = _this2.toggleHandler.bind(_this2);
        _this2.shortcutChangeHandler = _this2.shortcutChangeHandler.bind(_this2);
        _this2.handleEditRowBtnClick = _this2.handleEditRowBtnClick.bind(_this2);

        _this2.state = { visibleColumns: _this2.visibleColumns };
        _this2.allColumns = _underscore2.default.pluck(_this2.props.columns, 'field');
        _this2.allDefaultVisibleColumns = _underscore2.default.pluck(_underscore2.default.filter(_this2.props.columns, function (column) {
            return column.defaultVisible;
        }), 'field');
        _this2.allMustVisibleColumns = _underscore2.default.pluck(_underscore2.default.filter(_this2.props.columns, function (column) {
            return column.mustVisible;
        }), 'field');

        // 如果没配置必选列，则默认第一列必选
        if (_this2.allMustVisibleColumns.length === 0) {
            var firstColumn = _this2.props.columns[0];
            if (firstColumn && firstColumn.field) {
                _this2.allMustVisibleColumns.push(firstColumn.field);
            }
        }

        _underscore2.default.each(_this2.allMustVisibleColumns, function (column) {
            !_underscore2.default.contains(_this2.allDefaultVisibleColumns, column) && _this2.allDefaultVisibleColumns.push(column);
        });

        _this2.allCustomColumns = _underscore2.default.difference(_this2.allColumns, _this2.allMustVisibleColumns);
        return _this2;
    }

    (0, _createClass3.default)(TableToolBar, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            (0, _get3.default)(TableToolBar.prototype.__proto__ || (0, _getPrototypeOf2.default)(TableToolBar.prototype), 'componentDidMount', this) && (0, _get3.default)(TableToolBar.prototype.__proto__ || (0, _getPrototypeOf2.default)(TableToolBar.prototype), 'componentDidMount', this).call(this);
            this.columnVisibleUpdate();
        }
    }, {
        key: 'columnVisibleUpdate',
        value: function columnVisibleUpdate() {
            var _this3 = this;

            var parentNode = _reactDom2.default.findDOMNode(this).parentNode.parentNode;
            var heads = parentNode.querySelectorAll('thead th');
            var visibleColumns = this.visibleColumns;

            setTimeout(function () {
                var rows = parentNode.querySelectorAll('tbody tr');

                _underscore2.default.each(heads, function (item, index) {
                    var field = item.getAttribute('data-field');
                    var isSelectAll = item.querySelector('input.react-bs-select-all');
                    if (_underscore2.default.contains(visibleColumns, field) || isSelectAll) {
                        item.style.display = 'table-cell';
                        if (isSelectAll) {
                            item.style.width = '50px';
                            item.style.minWidth = '50px';
                        }
                        _underscore2.default.each(rows, function (row) {
                            var rowItem = row.children[index];
                            if (rowItem) {
                                rowItem.style.display = 'table-cell';
                                if (isSelectAll) {
                                    rowItem.style.width = '50px';
                                    rowItem.style.minWidth = '50px';
                                }
                            }
                        });
                    } else {
                        item.style.display = 'none';
                        _underscore2.default.each(rows, function (row) {
                            row.children[index] && (row.children[index].style.display = 'none');
                        });
                    }
                });

                _this3.props.table.forceUpdate();
            }, 0);
        }
    }, {
        key: 'submitHandler',
        value: function submitHandler() {
            var _this4 = this;

            var dropdown = this.refs.dropdownButton.refs.dropdown.refs.inner;
            dropdown.toggleOpen();

            var columns = [];
            _underscore2.default.each(this.refs, function (value, key) {
                if (/^column_/.test(key) && value.getChecked()) {
                    columns.push(value.props.value);
                }
            });

            localStorage.setItem(this.uniqueName, (0, _stringify2.default)(columns));
            this.props.table.initDrag({ disable: true });
            this.columnVisibleUpdate();
            setTimeout(function () {
                _this4.props.table.initDrag();
            }, 500);
        }
    }, {
        key: 'cancelHandler',
        value: function cancelHandler() {
            var dropdown = this.refs.dropdownButton.refs.dropdown.refs.inner;
            dropdown.toggleOpen();
        }
    }, {
        key: 'columnChangeHandler',
        value: function columnChangeHandler(e) {
            var visibleColumns = this.state.visibleColumns;

            if (e.target.checked) {
                visibleColumns.push(e.target.value);
            } else {
                visibleColumns.splice(_underscore2.default.indexOf(visibleColumns, e.target.value), 1);
            }
            this.setState({ visibleColumns: visibleColumns });
        }
    }, {
        key: 'toggleHandler',
        value: function toggleHandler(isOpen) {
            if (isOpen) {
                this.setState({ visibleColumns: this.visibleColumns });
            }
        }
    }, {
        key: 'selectAll',
        value: function selectAll() {
            this.setState({
                visibleColumns: _underscore2.default.map(this.props.columns, function (column) {
                    return column.field;
                })
            });
        }
    }, {
        key: 'selectDefault',
        value: function selectDefault() {
            var visibleColumns = [].concat(this.allDefaultVisibleColumns);
            visibleColumns.length === 0 && (visibleColumns = [].concat(this.allColumns));
            this.setState({ visibleColumns: visibleColumns });
        }
    }, {
        key: 'shortcutChangeHandler',
        value: function shortcutChangeHandler(e) {
            if (e.target.value === 'all') {
                this.selectAll();
            } else if (e.target.value === 'default') {
                this.selectDefault();
            }
        }
    }, {
        key: 'getShortcut',
        value: function getShortcut(visibleColumns) {
            var shortcut = 'custom';

            if (_underscore2.default.difference(visibleColumns, this.allDefaultVisibleColumns).length === 0 && _underscore2.default.difference(this.allDefaultVisibleColumns, visibleColumns).length === 0) {
                shortcut = 'default';
            } else if (_underscore2.default.difference(visibleColumns, this.allColumns).length === 0 && _underscore2.default.difference(this.allColumns, visibleColumns).length === 0) {
                shortcut = 'all';
            }

            return shortcut;
        }
    }, {
        key: 'renderCustomColumn',
        value: function renderCustomColumn() {
            var _this5 = this;

            var customColumn = null;

            if (this.enableCustomColumn) {
                var columns = this.props.columns;
                var visibleColumns = this.state.visibleColumns;

                var shortcut = this.getShortcut(visibleColumns);
                var defaultShortcut = null;
                var allMustVisibleColumns = _underscore2.default.filter(columns, function (column) {
                    return _underscore2.default.contains(_this5.allMustVisibleColumns, column.field);
                });
                var allCustomColumns = _underscore2.default.filter(columns, function (column) {
                    return _underscore2.default.contains(_this5.allCustomColumns, column.field);
                });

                if (this.allDefaultVisibleColumns.length > 0) {
                    defaultShortcut = _react2.default.createElement(_reactBootstrap.Input, {
                        type: 'radio',
                        name: 'shortcut',
                        label: '\u9ED8\u8BA4',
                        value: 'default',
                        checked: shortcut === 'default',
                        onChange: this.shortcutChangeHandler
                    });
                }

                customColumn = _react2.default.createElement(
                    'div',
                    { className: 'custom-column-dropdown-wrap' },
                    _react2.default.createElement(
                        DropdownButtonEx,
                        {
                            id: 'customColumnDropdownButton' + _underscore2.default.uniqueId(),
                            ref: 'dropdownButton',
                            title: '\u81EA\u5B9A\u4E49\u5217',
                            onToggle: this.toggleHandler
                        },
                        _react2.default.createElement(
                            'div',
                            { className: 'custom-column-area-header clearfix' },
                            defaultShortcut,
                            _react2.default.createElement(_reactBootstrap.Input, {
                                type: 'radio',
                                name: 'shortcut',
                                label: '\u5168\u9009',
                                value: 'all',
                                checked: shortcut === 'all',
                                onChange: this.shortcutChangeHandler
                            }),
                            _react2.default.createElement(_reactBootstrap.Input, {
                                type: 'radio',
                                name: 'shortcut',
                                label: '\u81EA\u5B9A\u4E49',
                                value: 'custom',
                                disabled: true,
                                checked: shortcut === 'custom',
                                onChange: this.shortcutChangeHandler
                            })
                        ),
                        _react2.default.createElement(
                            'h4',
                            { className: 'area-title' },
                            '\u5FC5\u9009\u5217'
                        ),
                        allMustVisibleColumns.map(function (column, index) {
                            return _react2.default.createElement(
                                'li',
                                { key: index, className: index % 3 === 2 ? 'last-column' : '' },
                                _react2.default.createElement(_reactBootstrap.Input, {
                                    type: 'checkbox',
                                    ref: 'column_' + column.field,
                                    label: column.title,
                                    value: column.field,
                                    disabled: true,
                                    checked: true
                                })
                            );
                        }),
                        _react2.default.createElement('div', { className: 'area-separator' }),
                        _react2.default.createElement(
                            'h4',
                            { className: 'area-title' },
                            '\u53EF\u9009\u5217'
                        ),
                        allCustomColumns.map(function (column, index) {
                            var checked = _underscore2.default.contains(visibleColumns, column.field);
                            return _react2.default.createElement(
                                'li',
                                { key: index, className: index % 3 === 2 ? 'last-column' : '' },
                                _react2.default.createElement(_reactBootstrap.Input, {
                                    type: 'checkbox',
                                    ref: 'column_' + column.field,
                                    label: column.title,
                                    value: column.field,
                                    checked: checked,
                                    onChange: _this5.columnChangeHandler
                                })
                            );
                        }),
                        _react2.default.createElement('div', { className: 'footer-separator' }),
                        _react2.default.createElement(
                            'div',
                            { className: 'custom-column-area-footer' },
                            _react2.default.createElement(
                                _reactBootstrap.Button,
                                { bsStyle: 'primary', onClick: this.submitHandler },
                                '\u786E\u5B9A'
                            ),
                            _react2.default.createElement('span', null),
                            _react2.default.createElement(
                                _reactBootstrap.Button,
                                { className: 'cancel-btn', onClick: this.cancelHandler },
                                '\u53D6\u6D88'
                            )
                        )
                    )
                );
            }

            return customColumn;
        }
    }, {
        key: 'handleEditRowBtnClick',
        value: function handleEditRowBtnClick() {
            var table = this.props.table;
            var _table$selectedRowArg = table.selectedRowArgs,
                rowKeys = _table$selectedRowArg.rowKeys,
                rows = _table$selectedRowArg.rows;

            this.props.editRowProp.handleEditRow && rowKeys && this.props.editRowProp.handleEditRow(rowKeys, rows);
        }
    }, {
        key: 'render',
        value: function render() {
            this.modalClassName = 'bs-table-modal-sm' + _ToolBar3.default.modalSeq++;
            var insertBtn = null;
            var editBtn = null;
            var deleteBtn = null;
            var exportCSV = null;
            var showSelectedOnlyBtn = null;

            if (this.props.enableInsert) {
                insertBtn = _react2.default.createElement('button', {
                    type: 'button',
                    className: 'btn btn-info react-bs-table-add-btn',
                    'data-toggle': 'modal',
                    'data-target': '.' + this.modalClassName
                }, _react2.default.createElement('i', { className: 'glyphicon glyphicon-plus' }), ' New');
            }

            if (this.props.editRowProp) {
                var editRowProp = this.props.editRowProp;
                var title = editRowProp.title;
                var text = editRowProp.text || title;
                var className = 'btn btn-default react-bs-table-edit-btn';

                if (editRowProp.disabled) {
                    className += ' btn-disabled';
                }

                editBtn = _react2.default.createElement('button', {
                    type: 'button',
                    className: className,
                    disabled: editRowProp.disabled && !editRowProp.tooltip,
                    'data-toggle': 'tooltip',
                    'data-placement': 'right',
                    title: title || 'Edit selected row',
                    onClick: this.handleEditRowBtnClick
                }, _react2.default.createElement('i', { className: 'glyphicon glyphicon-edit' }), ' ' + (text || 'Edit'));
                if (editRowProp.tooltip) {
                    var tooltip = _react2.default.createElement(
                        _reactBootstrap.Tooltip,
                        { id: editRowProp.tooltip },
                        editRowProp.tooltip
                    );
                    editBtn = _react2.default.createElement(
                        _reactBootstrap.OverlayTrigger,
                        { placement: 'right', overlay: tooltip },
                        _react2.default.createElement(
                            'span',
                            null,
                            editBtn
                        )
                    );
                }
            }

            if (this.props.enableDelete) {
                deleteBtn = _react2.default.createElement('button', {
                    type: 'button',
                    className: 'btn btn-warning react-bs-table-del-btn',
                    'data-toggle': 'tooltip',
                    'data-placement': 'right',
                    title: 'Drop selected row',
                    onClick: this.handleDropRowBtnClick
                }, _react2.default.createElement('i', { className: 'glyphicon glyphicon-trash' }), ' Delete');
            }

            if (this.props.enableShowOnlySelected) {
                showSelectedOnlyBtn = _react2.default.createElement('button', {
                    type: 'button',
                    onClick: this.handleShowOnlyToggle,
                    className: 'btn btn-primary',
                    'data-toggle': 'button',
                    'aria-pressed': 'false'
                }, this.state.showSelected ? _Const3.default.SHOW_ALL : _Const3.default.SHOW_ONLY_SELECT);
            }

            if (this.props.enableExportCSV) {
                exportCSV = _react2.default.createElement('button', {
                    type: 'button',
                    className: 'btn btn-success',
                    onClick: this.handleExportCSV
                }, _react2.default.createElement('i', { className: 'glyphicon glyphicon-export' }), this.props.exportCSVText);
            }

            var customColumn = this.renderCustomColumn();
            var searchTextInput = this.renderSearchPanel();
            var modal = this.props.enableInsert ? this.renderInsertRowModal() : null;

            return _react2.default.createElement('div', {
                className: 'row'
            }, _react2.default.createElement('div', {
                className: 'col-xs-12 col-sm-6 col-md-6 col-lg-8'
            }, _react2.default.createElement('div', {
                className: 'btn-group btn-group-sm',
                role: 'group'
            }, exportCSV, insertBtn, editBtn, deleteBtn, showSelectedOnlyBtn)), _react2.default.createElement('div', {
                className: 'col-xs-12 col-sm-6 col-md-6 col-lg-4'
            }, customColumn, searchTextInput), _react2.default.createElement(_Notification2.default, { ref: 'notifier' }), modal);
        }
    }, {
        key: 'uniqueName',
        get: function get() {
            var session = sessionStorage.getItem('login-user-name');
            return '' + (session ? session + ':' : '') + this.props.uniqueName;
        }
    }, {
        key: 'visibleColumns',
        get: function get() {
            var columns = localStorage.getItem(this.uniqueName);

            if (columns) {
                try {
                    columns = columns ? JSON.parse(columns) : [];
                } catch (error) {
                    columns = [];
                }
            }

            !_underscore2.default.isArray(columns) && (columns = []);

            if (columns.length === 0) {
                columns = _underscore2.default.pluck(_underscore2.default.filter(this.props.columns, function (column) {
                    return column.defaultVisible;
                }), 'field');
                if (columns.length === 0) {
                    columns = _underscore2.default.pluck(this.props.columns, 'field');
                }
            }

            _underscore2.default.each(this.allMustVisibleColumns, function (column) {
                !_underscore2.default.contains(columns, column) && columns.push(column);
            });

            return columns;
        }
    }]);
    return TableToolBar;
}(_ToolBar3.default), _class.propTypes = (0, _extends4.default)({}, _ToolBar3.default.propTypes, {
    uniqueName: _react2.default.PropTypes.string
}), _class.defaultProps = (0, _extends4.default)({}, _ToolBar3.default.defaultProps, {
    uniqueName: ''
}), _temp);


function getTitle(props) {
    return props.title || (_underscore2.default.isString(props.children) ? props.children : props.children.props ? props.children.props.title : _underscore2.default.isArray(props.children) ? props.children.join('') : '');
}

var Table = (_temp2 = _class2 = function (_BootstrapTable) {
    (0, _inherits3.default)(Table, _BootstrapTable);

    function Table() {
        (0, _classCallCheck3.default)(this, Table);

        var _this6 = (0, _possibleConstructorReturn3.default)(this, (Table.__proto__ || (0, _getPrototypeOf2.default)(Table)).apply(this, arguments));

        _this6.enableCustomColumn = !!_this6.props.uniqueName;
        return _this6;
    }

    (0, _createClass3.default)(Table, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            (0, _get3.default)(Table.prototype.__proto__ || (0, _getPrototypeOf2.default)(Table.prototype), 'componentWillReceiveProps', this).call(this, nextProps);
            this.refs.toolbar && this.refs.toolbar.columnVisibleUpdate();
        }
    }, {
        key: 'unselectAllRow',
        value: function unselectAllRow() {
            var selectRow = this.props.selectRow;
            selectRow.onSelectAll(false);
            this.selectedRowArgs = { rowKeys: [] };
        }
    }, {
        key: 'compactSelectedRowArgs',
        value: function compactSelectedRowArgs(rowKeys) {
            var rows = [];
            if (rowKeys && rowKeys.length) {
                var key = this.store.getKeyField();
                rows = _underscore2.default.filter(this.store.data, function (item) {
                    return _underscore2.default.contains(rowKeys, item[key]);
                });
                if (!this.props.selectCrossPage) {
                    // 如果支持跨页选择，则返回所有页选中的key，否则只有当前页的
                    rowKeys = _underscore2.default.pluck(rows, key);
                }
            }
            return { rowKeys: rowKeys, rows: rows };
        }
    }, {
        key: 'renderToolBar',
        value: function renderToolBar() {
            var _props2 = this.props;
            var selectRow = _props2.selectRow;
            var insertRow = _props2.insertRow;
            var deleteRow = _props2.deleteRow;
            var editRowProp = _props2.editRowProp;
            var search = _props2.search;
            var children = _props2.children;

            var enableShowOnlySelected = selectRow && selectRow.showOnlySelected;
            if (enableShowOnlySelected || insertRow || deleteRow || editRowProp || search || this.enableCustomColumn || this.props.exportCSV) {
                var columns = undefined;
                if (Array.isArray(children)) {
                    columns = children.map(function (column) {
                        var props = column.props;

                        return {
                            name: props.children,
                            title: getTitle(props),
                            field: props.dataField,
                            // when you want same auto generate value and not allow edit, example ID field
                            autoValue: props.autoValue || false,
                            // for create editor, no params for column.editable() indicate that editor for new row
                            editable: props.editable && typeof props.editable === 'function' ? props.editable() : props.editable,
                            format: props.dataFormat ? function (value) {
                                return props.dataFormat(value, null, props.formatExtraData).replace(/<.*?>/g, '');
                            } : false,
                            defaultVisible: !!props.defaultVisible,
                            mustVisible: !!props.mustVisible
                        };
                    });
                } else {
                    columns = [{
                        name: children.props.children,
                        title: getTitle(children.props),
                        field: children.props.dataField,
                        editable: children.props.editable,
                        defaultVisible: !!children.props.defaultVisible,
                        mustVisible: !!children.props.mustVisible
                    }];
                }

                return _react2.default.createElement('div', {
                    className: 'react-bs-table-tool-bar'
                }, _react2.default.createElement(TableToolBar, {
                    clearSearch: this.props.options.clearSearch,
                    selectRow: this.props.selectRow,
                    searchDelayTime: this.props.options.searchDelayTime,
                    enableInsert: insertRow,
                    editRowProp: editRowProp,
                    enableDelete: deleteRow,
                    enableSearch: search,
                    enableExportCSV: this.props.exportCSV,
                    enableShowOnlySelected: enableShowOnlySelected,
                    columns: columns,
                    searchPlaceholder: this.props.searchPlaceholder,
                    exportCSVText: this.props.options.exportCSVText,
                    ignoreEditable: this.props.options.ignoreEditable,
                    onAddRow: this.handleAddRow,
                    onDropRow: this.handleDropRow,
                    onSearch: this.handleSearch,
                    onExportCSV: this.handleExportCSV,
                    onShowOnlySelected: this.handleShowOnlySelected,
                    uniqueName: this.props.uniqueName,
                    table: this,
                    ref: 'toolbar'
                }));
            }

            return null;
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this7 = this;

            (0, _get3.default)(Table.prototype.__proto__ || (0, _getPrototypeOf2.default)(Table.prototype), 'componentDidMount', this) && (0, _get3.default)(Table.prototype.__proto__ || (0, _getPrototypeOf2.default)(Table.prototype), 'componentDidMount', this).call(this);
            setTimeout(function () {
                _this7.initDrag();
            }, 500);
        }
    }, {
        key: 'initDrag',
        value: function initDrag(options) {
            var _this8 = this;

            var _props3 = this.props,
                resizable = _props3.resizable,
                selectRow = _props3.selectRow;

            var selectable = selectRow && selectRow.mode !== 'none';
            var $root = (0, _jquery2.default)(_reactDom2.default.findDOMNode(this));

            selectable && $root.addClass('selectable');

            if (resizable) {
                var $table = $root.find('.react-bs-container-body table');

                $table.colResizable(_underscore2.default.extend({
                    resizeMode: this.props.resizeMode,
                    minWidth: 100,
                    partialRefresh: true,
                    disabledColumns: selectable ? [0] : [],
                    onResize: function onResize() {
                        _this8.forceUpdate();
                    }
                }, options));

                this.forceUpdate();
            }
        }
    }, {
        key: 'selectedRowArgs',
        set: function set(rowArgs) {
            var rowKeys = rowArgs.rowKeys || rowArgs;
            this.store.setSelectedRowKey(rowKeys);
            this.setState({ selectedRowKeys: rowKeys });
            var newRowArgs = this.compactSelectedRowArgs(rowKeys);

            return { rowKeys: newRowArgs.rowKeys, rows: newRowArgs.rows };
        },
        get: function get() {
            var rowKeys = this.store.getSelectedRowKeys();
            var newRowArgs = this.compactSelectedRowArgs(rowKeys);

            return { rowKeys: newRowArgs.rowKeys, rows: newRowArgs.rows };
        }
    }]);
    return Table;
}(_reactBootstrapTable.BootstrapTable), _class2.propTypes = (0, _extends4.default)({}, _reactBootstrapTable.BootstrapTable.propTypes, {
    uniqueName: _react2.default.PropTypes.string,
    resizable: _react2.default.PropTypes.bool,
    resizeMode: _react2.default.PropTypes.oneOf(['fix', 'overflow', 'flex'])
}), _class2.defaultProps = (0, _extends4.default)({}, _reactBootstrapTable.BootstrapTable.defaultProps, {
    uniqueName: '',
    resizable: true,
    resizeMode: 'overflow'
}), _temp2);
exports.default = Table;