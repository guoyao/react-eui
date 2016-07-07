import u from 'underscore';
import React from 'react';
import classnames from 'classnames';
import {override, autobind} from 'core-decorators';

import ItemRenderer from './ItemRenderer';

import './ButtonSelectItemRenderer.less';

function getChecked(props) {
    const parentValue = props.parentValue;
    let checked = false;

    if (parentValue) {
        const values = parentValue.split(',');
        checked = u.contains(values, props.data.value);
    }

    return checked;
}

export default class ButtonSelectItemRenderer extends ItemRenderer {
    static propTypes = {
        ...ItemRenderer.propTypes,

        parentValue: React.PropTypes.any.isRequired,
        changeHandler: React.PropTypes.func
    }

    static defaultProps = {
        ...ItemRenderer.defaultProps,

        changeHandler: (v, checked) => {}
    }

    constructor(...args) {
        super(...args);

        this.state = {checked: getChecked(this.props)};
    }

    @override
    get controlClassName() {
        return classnames(super.controlClassName, 'eui-button-select-item-renderer');
    }

    @autobind
    changeHandler(e) {
        const {value} = e.target;

        console.log(e.target.checked);

        this.setState({checked: e.target.checked}, () => {
            this.props.changeHandler(value, this.state.checked);
        })
    }

    componentWillReceiveProps(nextProps) {
        super.componentWillReceiveProps && super.componentWillReceiveProps(nextProps);

        if (this.props.parentValue !== nextProps.parentValue) {
            this.setState({checked: getChecked(nextProps)});
        }
    }

    @override
    renderControl() {
        const {data} = this.props;
        const {checked} = this.state;

        let className = 'btn btn-default';
        
        if (checked) {
            className = classnames(className, 'active');
        }

        return (
            <label className={className}>
                <input
                    type="checkbox"
                    autocomplete="off"
                    value={data.value}
                    checked={this.state.checked}
                    onChange={this.changeHandler}
                />
                {data.label}
            </label>
        );
    }
}