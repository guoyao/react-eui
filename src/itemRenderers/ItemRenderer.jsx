/**
 * @file 所有ItemRenderer组件的基类
 * @author guoyao(wuguoyao@baidu.com)
 **/

import React from 'react';
import classnames from 'classnames';
import {override} from 'core-decorators';

import Control from '../Control';
import InputControl from '../InputControl';

export default class ItemRenderer extends Control {
    static propTypes = {
        ...Control.propTypes,

        data: React.PropTypes.any.isRequired,
        parent: React.PropTypes.oneOfType([
            React.PropTypes.instanceOf(Control),
            React.PropTypes.instanceOf(InputControl)
        ]).isRequired
    }

    static defaultProps = {
        ...Control.defaultProps
    }

    @override
    get controlClassName() {
        return classnames(super.controlClassName, 'eui-item-renderer');
    }

    @override
    renderControl() {
        return super.renderControl();
    }
}
