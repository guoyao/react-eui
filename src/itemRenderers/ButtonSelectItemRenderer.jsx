import u from 'underscore';
import React from 'react';
import classnames from 'classnames';

import ItemRenderer from './ItemRenderer';

function getChecked(props) {
    const parentValue = props.parentValue;
    let checked = false;

    if (u.isString(parentValue)) {
        const values = parentValue.split(',');
        checked = u.contains(values, props.data.value);
    }

    return checked;
}

export default class ButtonSelectItemRenderer extends ItemRenderer {
    static propTypes = {
        ...ItemRenderer.propTypes,

        parentValue: React.PropTypes.any,
        changeHandler: React.PropTypes.func
    }

    static defaultProps = {
        ...ItemRenderer.defaultProps,

        /* eslint-disable no-unused-vars */
        changeHandler: (v, checked) => {}
        /* eslint-enable no-unused-vars */
    }

    constructor(...args) {
        super(...args);

        this.state = {checked: getChecked(this.props)};
    }

    get controlClassName() {
        return classnames(super.controlClassName, 'eui-button-select-item-renderer');
    }

    changeHandler = e => {
        const {value} = e.target;

        this.setState({checked: e.target.checked}, () => {
            this.props.changeHandler(value, this.state.checked);
        });
    }

    componentWillReceiveProps(nextProps) {
        super.componentWillReceiveProps && super.componentWillReceiveProps(nextProps);
        this.setState({checked: getChecked(nextProps)});
    }

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
                    value={data.value || ""}
                    checked={this.state.checked}
                    onChange={this.changeHandler}
                />
                {data.label}
            </label>
        );
    }
}
