/**
* @file demo for Table component
* @author guoyao(wuguoyao@baidu.com)
**/
import u from 'underscore';
import React from 'react';
import {TableHeaderColumn} from 'react-bootstrap-table';

import {Table} from '../../src/index';

const datasource = [
    {id: 1, name: '张三', age: 20, gender: '男', tel: '13012345678', address: '北京市海淀区'},
    {id: 2, name: '李四', age: 30, gender: '女', tel: '13512345678', address: '上海市浦东新区'},
    {id: 3, name: '王五', age: 40, gender: '未知', tel: '13612345678', address: '湖南省长沙市'},
    {id: 4, name: '孙六', age: 50, gender: '女', tel: '13812345678', address: '黑龙江省哈尔滨市'},
    {id: 5, name: '赵七', age: 60, gender: '男', tel: '13912345678', address: '湖南省永州市'}
];

export default class TableDemo extends React.Component {
    constructor(...args) {
        super(...args);

        this.state = {datasource, disableEditRow: true};
        this.selectStatusMap = {};
    }

    rowSelectHandler = (selectItem, selected, e) => {
        console.log(selectItem, selected);
        selected && (this.selectStatusMap[selectItem.id] = true);
        !selected && (delete this.selectStatusMap[selectItem.id]);
        this.setState({disableEditRow: u.isEmpty(this.selectStatusMap)});
    }

    selectAllHandler = (selected, selects) => {
        console.log(selected, selects);
        !selected && (this.selectStatusMap = {});
        if (selected) {
            u.each(selects, item => this.selectStatusMap[item.id] = true);
        }
        this.setState({disableEditRow: u.isEmpty(this.selectStatusMap)});
    }

    render() {
        let selectRowProp = {
            mode: 'checkbox',
            clickToSelect: true,
            onSelect: this.rowSelectHandler,
            onSelectAll: this.selectAllHandler
        };

        let editRowProp = {
            text: '批量操作',
            title: '批量操作',
            tooltip: this.state.disableEditRow && '批量操作用户信息',
            disabled: this.state.disableEditRow,
            handleEditRow: (rowKeys, rows) => {
                if (!this.state.disableEditRow) {
                    console.log(rows);
                }
            }
        };

        return (
            <Table
                keyField="id"
                striped={true}
                hover={true}
                uniqueName="user-table"
                data={this.state.datasource}
                selectRow={selectRowProp}
                editRowProp={editRowProp}
                resizeMode="fix"
            >
                <TableHeaderColumn dataField="name" mustVisible>姓名</TableHeaderColumn>
                <TableHeaderColumn dataField="age" defaultVisible>年龄</TableHeaderColumn>
                <TableHeaderColumn dataField="gender" defaultVisible>性别</TableHeaderColumn>
                <TableHeaderColumn dataField="tel">联系电话</TableHeaderColumn>
                <TableHeaderColumn dataField="address">联系地址</TableHeaderColumn>
            </Table>
        );
    }
}
