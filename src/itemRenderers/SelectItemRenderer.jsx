import u from 'underscore';
import classnames from 'classnames';
import React from 'react';
import {DropdownButton, MenuItem} from 'react-bootstrap';

import ItemRenderer from './ItemRenderer';

export default class SelectItemRenderer extends ItemRenderer {
    static propTypes = {
        ...ItemRenderer.propTypes,

        index: React.PropTypes.number.isRequired,
        isRawSource: React.PropTypes.bool,
        emptyLabel: React.PropTypes.string,
        disableChange: React.PropTypes.bool,
        selectHandler: React.PropTypes.func
    }

    static defaultProps = {
        ...ItemRenderer.defaultProps,

        /* eslint-disable no-unused-vars */
        selectHandler: (e, value, datasource, index) => {}
        /* eslint-enable no-unused-vars */
    }

    constructor(...args) {
        super(...args);

        this.euiId = `item-renderer-${new Date().getTime()}`;
        this.state = {value: this.props.data.value};
        this.selectHandler = this.selectHandler.bind(this);
        this.datasource = this.getDatasource(this.props);
    }

    get controlClassName() {
        return classnames(super.controlClassName, 'eui-select-item-renderer');
    }

    getDatasource(props) {
        const isRawSource = props.isRawSource;
        const {data, emptyLabel} = props;

        let datasource = data.datasource;

        datasource = !datasource ? [] : datasource.slice();

        if (!isRawSource && datasource[0] && datasource[0].value !== '') {
            datasource.unshift({label: emptyLabel || '请选择', value: ''});
        }

        return datasource;
    }

    selectHandler(e, value) {
        if (this.props.disableChange) {
            this.props.selectHandler(e, value, this.datasource, this.props.index);

            return false;
        }

        this.setState({value}, () => {
            this.props.selectHandler(e, value, this.datasource, this.props.index);
        });
    }

    componentWillReceiveProps(nextProps) {
        super.componentWillReceiveProps && super.componentWillReceiveProps(nextProps);

        if (this.props.data !== nextProps.data) {
            this.setState({value: nextProps.data.value});
            this.datasource = this.getDatasource(nextProps);
        }
    }

    renderControl() {
        if (this.datasource.length === 0) {
            return null;
        }

        const value = this.state.value;

        let selectedItem = u.find(this.datasource, item => item.value === value);
        !selectedItem && (selectedItem = this.datasource[0]);

        let title = selectedItem.label;

        return (
            <DropdownButton
                id={`${this.euiId}-dropdown`}
                title={title}
                disabled={!!this.props.disabled}
                onSelect={this.selectHandler}
            >
            {
                this.datasource.map(item => {
                    return (
                        <MenuItem
                            key={item.value}
                            eventKey={item.value}
                            disabled={!!item.disabled}
                        >
                            {item.label}
                        </MenuItem>
                    );
                })
            }
            </DropdownButton>
        );
    }
}
