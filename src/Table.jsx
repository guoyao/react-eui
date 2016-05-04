/**
 * @file 表格组件
 * @author guoyao(wuguoyao@baidu.com)
 **/

import './css/table.less';

import u from 'underscore';
import _extends from 'babel-runtime/helpers/extends';
import _Object$keys from 'babel-runtime/core-js/object/keys';
import _objectWithoutProperties from 'babel-runtime/helpers/object-without-properties';
import _lodashCompatObjectPick2 from 'lodash-compat/object/pick';
import _lodashCompatObjectOmit2 from 'lodash-compat/object/omit';
import React from 'react';
import ReactDOM from 'react-dom';
import {BootstrapTable} from 'react-bootstrap-table';
import {DropdownButton, Dropdown, Input, Button} from 'react-bootstrap';
import ToolBar from 'react-bootstrap-table/lib/toolbar/ToolBar';
import _Const2 from 'react-bootstrap-table/lib/Const';
import _NotificationJs2 from 'react-bootstrap-table/lib/Notification';

class DropdownButtonEx extends DropdownButton {
    render() {
        let _props = this.props;
        let bsStyle = _props.bsStyle;
        let bsSize = _props.bsSize;
        let disabled = _props.disabled;
        let _props2 = this.props;
        let title = _props2.title;
        let children = _props2.children;

        let props = _objectWithoutProperties(_props2, ['title', 'children']);

        let dropdownProps = _lodashCompatObjectPick2(props, _Object$keys(Dropdown.ControlledComponent.propTypes));
        let toggleProps = _lodashCompatObjectOmit2(props, _Object$keys(Dropdown.ControlledComponent.propTypes));

        return React.createElement(
            Dropdown,
            _extends({}, dropdownProps, {
                bsSize,
                bsStyle,
                ref: 'dropdown'
            }),
            React.createElement(
                Dropdown.Toggle,
                _extends({}, toggleProps, {
                    disabled
                }),
                title
            ),
            React.createElement(
                Dropdown.Menu,
                null,
                children
            )
        );
    }
}

class TableToolBar extends ToolBar {
    static propTypes = {
        ...ToolBar.propTypes,
        uniqueName: React.PropTypes.string
    }

    static defaultProps = {
        ...ToolBar.defaultProps,
        uniqueName: ''
    }

    constructor() {
        super(...arguments);
        this.enableCustomColumn = !!this.props.uniqueName;
        this.submitHandler = this.submitHandler.bind(this);
        this.cancelHandler = this.cancelHandler.bind(this);
        this.columnChangeHandler = this.columnChangeHandler.bind(this);
        this.toggleHandler = this.toggleHandler.bind(this);
        this.shortcutChangeHandler = this.shortcutChangeHandler.bind(this);
        this.state = {visibleColumns: this.visibleColumns};
        this.allColumns = u.pluck(this.props.columns, 'field');
        this.allDefaultVisibleColumns = u.pluck(u.filter(this.props.columns, column => column.defaultVisible), 'field');
        this.allMustVisibleColumns = u.pluck(u.filter(this.props.columns, column => column.mustVisible), 'field');

        // 如果没配置必选列，则默认第一列必选
        if (this.allMustVisibleColumns.length === 0) {
            let firstColumn = this.props.columns[0];
            if (firstColumn && firstColumn.field) {
                this.allMustVisibleColumns.push(firstColumn.field);
            }
        }

        u.each(this.allMustVisibleColumns, column => {
            !u.contains(this.allDefaultVisibleColumns, column) && this.allDefaultVisibleColumns.push(column);
        });

        this.allCustomColumns = u.difference(this.allColumns, this.allMustVisibleColumns);
    }

    get uniqueName() {
        return `${sessionStorage.getItem('login-user-name')}:${this.props.uniqueName}`;
    }

    get visibleColumns() {
        let columns = localStorage.getItem(this.uniqueName);

        if (columns) {
            try {
                columns = columns ? JSON.parse(columns) : [];
            }
            catch (error) {
                columns = [];
            }
        }

        !u.isArray(columns) && (columns = []);

        if (columns.length === 0) {
            columns = u.pluck(u.filter(this.props.columns, column => column.defaultVisible), 'field');
            if (columns.length === 0) {
                columns = u.pluck(this.props.columns, 'field');
            }
        }

        u.each(this.allMustVisibleColumns, column => {
            !u.contains(columns, column) && columns.push(column);
        });

        return columns;
    }

    componentDidMount() {
        super.componentDidMount && super.componentDidMount();
        this.columnVisibleUpdate();
    }

    columnVisibleUpdate() {
        let parentNode = ReactDOM.findDOMNode(this).parentNode.parentNode;
        let heads = parentNode.querySelectorAll('thead th');
        let visibleColumns = this.visibleColumns;

        setTimeout(() => {
            let rows = parentNode.querySelectorAll('tbody tr');

            u.each(heads, (item, index) => {
                let field = item.getAttribute('data-field');
                if (u.contains(visibleColumns, field)) {
                    item.style.display = 'table-cell';
                    u.each(rows, row => {
                        row.children[index] && (row.children[index].style.display = 'table-cell');
                    });
                }
                else {
                    item.style.display = 'none';
                    u.each(rows, row => {
                        row.children[index] && (row.children[index].style.display = 'none');
                    });
                }
            });

            this.props.table.forceUpdate();
        }, 0);
    }

    submitHandler() {
        let dropdown = this.refs.dropdownButton.refs.dropdown.refs.inner;
        dropdown.toggleOpen();

        let columns = [];
        u.each(this.refs, (value, key) => {
            if (/^column_/.test(key) && value.getChecked()) {
                columns.push(value.props.value);
            }
        });

        localStorage.setItem(this.uniqueName, JSON.stringify(columns));
        this.columnVisibleUpdate();
    }

    cancelHandler() {
        let dropdown = this.refs.dropdownButton.refs.dropdown.refs.inner;
        dropdown.toggleOpen();
    }

    columnChangeHandler(e) {
        const {visibleColumns} = this.state;
        if (e.target.checked) {
            visibleColumns.push(e.target.value);
        }
        else {
            visibleColumns.splice(u.indexOf(visibleColumns, e.target.value), 1);
        }
        this.setState({visibleColumns});
    }

    toggleHandler(isOpen) {
        if (isOpen) {
            this.setState({visibleColumns: this.visibleColumns});
        }
    }

    selectAll() {
        this.setState({
            visibleColumns: u.map(this.props.columns, column => column.field)
        });
    }

    selectDefault() {
        let visibleColumns = [].concat(this.allDefaultVisibleColumns);
        visibleColumns.length === 0 && (visibleColumns = [].concat(this.allColumns));
        this.setState({visibleColumns});
    }

    shortcutChangeHandler(e) {
        if (e.target.value === 'all') {
            this.selectAll();
        }
        else if (e.target.value === 'default') {
            this.selectDefault();
        }
    }

    getShortcut(visibleColumns) {
        let shortcut = 'custom';

        if (u.difference(visibleColumns, this.allDefaultVisibleColumns).length === 0 &&
            u.difference(this.allDefaultVisibleColumns, visibleColumns).length === 0) {
            shortcut = 'default';
        }
        else if (u.difference(visibleColumns, this.allColumns).length === 0 &&
            u.difference(this.allColumns, visibleColumns).length === 0) {
            shortcut = 'all';
        }

        return shortcut;
    }

    renderCustomColumn() {
        let customColumn = null;

        if (this.enableCustomColumn) {
            const {columns} = this.props;
            const {visibleColumns} = this.state;
            let shortcut = this.getShortcut(visibleColumns);
            let defaultShortcut = null;
            let allMustVisibleColumns = u.filter(columns,
                column => u.contains(this.allMustVisibleColumns, column.field));
            let allCustomColumns = u.filter(columns, column => u.contains(this.allCustomColumns, column.field));

            if (this.allDefaultVisibleColumns.length > 0) {
                defaultShortcut = (
                    <Input
                        type="radio"
                        name="shortcut"
                        label="默认"
                        value="default"
                        checked={shortcut === 'default'}
                        onChange={this.shortcutChangeHandler}
                    />
                );
            }

            customColumn = (
                <div className="custom-column-dropdown-wrap">
                    <DropdownButtonEx
                        id={`customColumnDropdownButton${u.uniqueId()}`}
                        ref="dropdownButton"
                        title="自定义列"
                        onToggle={this.toggleHandler}
                    >
                        <div className="custom-column-area-header clearfix">
                            {defaultShortcut}
                            <Input
                                type="radio"
                                name="shortcut"
                                label="全选"
                                value="all"
                                checked={shortcut === 'all'}
                                onChange={this.shortcutChangeHandler}
                            />
                            <Input
                                type="radio"
                                name="shortcut"
                                label="自定义"
                                value="custom"
                                disabled
                                checked={shortcut === 'custom'}
                                onChange={this.shortcutChangeHandler}
                            />
                        </div>
                        <h4 className="area-title">必选列</h4>
                        {
                            allMustVisibleColumns.map((column, index) => {
                                return (
                                    <li key={index} className={index % 3 === 2 ? 'last-column' : ''}>
                                        <Input
                                            type="checkbox"
                                            ref={`column_${column.field}`}
                                            label={column.title}
                                            value={column.field}
                                            disabled
                                            checked
                                        />
                                    </li>
                                );
                            })
                        }
                        <div className="area-separator"></div>
                        <h4 className="area-title">可选列</h4>
                        {
                            allCustomColumns.map((column, index) => {
                                let checked = u.contains(visibleColumns, column.field);
                                return (
                                    <li key={index} className={index % 3 === 2 ? 'last-column' : ''}>
                                        <Input
                                            type="checkbox"
                                            ref={`column_${column.field}`}
                                            label={column.title}
                                            value={column.field}
                                            checked={checked}
                                            onChange={this.columnChangeHandler}
                                        />
                                    </li>
                                );
                            })
                        }
                        <div className="footer-separator"></div>
                        <div className="custom-column-area-footer">
                            <Button bsStyle="primary" onClick={this.submitHandler}>确定</Button>
                            <span></span>
                            <Button className="cancel-btn" onClick={this.cancelHandler}>取消</Button>
                        </div>
                    </DropdownButtonEx>
                </div>
            );
        }

        return customColumn;
    }

    render() {
        this.modalClassName = 'bs-table-modal-sm' + ToolBar.modalSeq++;
        let insertBtn = null;
        let deleteBtn = null;
        let exportCSV = null;
        let showSelectedOnlyBtn = null;

        if (this.props.enableInsert) {
            insertBtn = React.createElement('button', {
                type: 'button',
                className: 'btn btn-info react-bs-table-add-btn',
                'data-toggle': 'modal',
                'data-target': '.' + this.modalClassName
            }, React.createElement('i', {className: 'glyphicon glyphicon-plus'}), ' New');
        }

        if (this.props.enableDelete) {
            deleteBtn = React.createElement('button', {
                type: 'button',
                className: 'btn btn-warning react-bs-table-del-btn',
                'data-toggle': 'tooltip',
                'data-placement': 'right',
                title: 'Drop selected row',
                onClick: this.handleDropRowBtnClick
            }, React.createElement('i', {className: 'glyphicon glyphicon-trash'}), ' Delete');
        }

        if (this.props.enableShowOnlySelected) {
            showSelectedOnlyBtn = React.createElement('button', {
                type: 'button',
                onClick: this.handleShowOnlyToggle,
                className: 'btn btn-primary',
                'data-toggle': 'button',
                'aria-pressed': 'false'
            }, this.state.showSelected
            ? _Const2.SHOW_ALL
            : _Const2.SHOW_ONLY_SELECT);
        }

        if (this.props.enableExportCSV) {
            exportCSV = React.createElement('button', {
                type: 'button',
                className: 'btn btn-success',
                onClick: this.handleExportCSV
            }, React.createElement('i', {className: 'glyphicon glyphicon-export'}), this.props.exportCSVText);
        }

        let customColumn = this.renderCustomColumn();
        let searchTextInput = this.renderSearchPanel();
        let modal = this.props.enableInsert ? this.renderInsertRowModal() : null;

        return React.createElement('div', {
            className: 'row'
        }, React.createElement('div', {
            className: 'col-xs-12 col-sm-6 col-md-6 col-lg-8'
        }, React.createElement('div', {
            className: 'btn-group btn-group-sm',
            role: 'group'
        }, exportCSV, insertBtn, deleteBtn, showSelectedOnlyBtn)), React.createElement('div', {
            className: 'col-xs-12 col-sm-6 col-md-6 col-lg-4'
        }, customColumn, searchTextInput), React.createElement(_NotificationJs2, {ref: 'notifier'}), modal);
    }
}

function getTitle(props) {
    return props.title || (u.isString(props.children) ?
        props.children : (props.children.props ?
        props.children.props.title : (u.isArray(props.children) ? props.children.join('') : '')));
}

export default class Table extends BootstrapTable {
    static propTypes = {
        ...BootstrapTable.propTypes,
        uniqueName: React.PropTypes.string
    }

    static defaultProps = {
        ...BootstrapTable.defaultProps,
        uniqueName: ''
    }

    constructor() {
        super(...arguments);
        this.enableCustomColumn = !!this.props.uniqueName;
    }

    componentWillReceiveProps(nextProps) {
        super.componentWillReceiveProps(nextProps);
        this.refs.toolbar && this.refs.toolbar.columnVisibleUpdate();
    }

    renderToolBar() {
        let _props2 = this.props;
        let selectRow = _props2.selectRow;
        let insertRow = _props2.insertRow;
        let deleteRow = _props2.deleteRow;
        let search = _props2.search;
        let children = _props2.children;

        let enableShowOnlySelected = selectRow && selectRow.showOnlySelected;
        if (enableShowOnlySelected || insertRow || deleteRow || search ||
            this.enableCustomColumn || this.props.exportCSV) {
            let columns = undefined;
            if (Array.isArray(children)) {
                columns = children.map((column) => {
                    let props = column.props;

                    return {
                        name: props.children,
                        title: getTitle(props),
                        field: props.dataField,
                        // when you want same auto generate value and not allow edit, example ID field
                        autoValue: props.autoValue || false,
                        // for create editor, no params for column.editable() indicate that editor for new row
                        editable: props.editable && typeof props.editable === 'function'
                            ? props.editable()
                            : props.editable,
                        format: props.dataFormat
                            ? function (value) {
                                return props.dataFormat(value, null, props.formatExtraData).replace(/<.*?>/g, '');
                            }
                            : false,
                        defaultVisible: !!props.defaultVisible,
                        mustVisible: !!props.mustVisible
                    };
                });
            }
            else {
                columns = [
                    {
                        name: children.props.children,
                        title: getTitle(children.props),
                        field: children.props.dataField,
                        editable: children.props.editable,
                        defaultVisible: !!children.props.defaultVisible,
                        mustVisible: !!children.props.mustVisible
                    }
                ];
            }

            return React.createElement('div', {
                className: 'react-bs-table-tool-bar'
            }, React.createElement(TableToolBar, {
                clearSearch: this.props.options.clearSearch,
                searchDelayTime: this.props.options.searchDelayTime,
                enableInsert: insertRow,
                enableDelete: deleteRow,
                enableSearch: search,
                enableExportCSV: this.props.exportCSV,
                enableShowOnlySelected,
                columns,
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
}
