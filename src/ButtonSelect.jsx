/**
* @file 按钮选择组件
* @author guoyao(wuguoyao@baidu.com)
**/

import './css/ButtonSelect.less';

import u from 'underscore';
import React from 'react';
import classnames from 'classnames';
import {autobind, override} from 'core-decorators';

import Control from './Control';
import InputControl from './InputControl';
import ButtonSelectItemRenderer from './itemRenderers/ButtonSelectItemRenderer';
import util from './util/util';

export default class ButtonSelect extends InputControl {
    static propTypes = {
        ...InputControl.propTypes,

        itemRenderer: React.PropTypes.func,
        changeHandler: React.PropTypes.func
    }

    static defaultProps = {
        ...InputControl.defaultProps,

        itemRenderer: ButtonSelectItemRenderer,
        changeHandler: util.emptyFunc
    }

    @override
    get controlClassName() {
        return classnames(super.controlClassName, 'eui-button-select');
    }

    @override
    renderControl() {
        return (
            <Control className={this.controlClassName}>
                <this.props.itemRenderer
                    className="btn-group"
                    data-toggle="buttons"
                />
                <this.props.itemRenderer
                    className="btn-group"
                    data-toggle="buttons"
                />
                <this.props.itemRenderer
                    className="btn-group"
                    data-toggle="buttons"
                />
            </Control>
        );
    }
}
