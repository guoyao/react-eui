import React from 'react';
import ReactDOM from 'react-dom';
import {Tab, Tabs} from 'react-bootstrap';
import {autobind} from 'core-decorators';

import InputControlDemo from './InputControlDemo';
import SelectDemo from './SelectDemo';
import MultiSelectDemo from './MultiSelectDemo';
import TableDemo from './TableDemo';
import RichTextEditorDemo from './RichTextEditorDemo';
import DateTimeFieldDemo from './DateTimeFieldDemo';
import DateTimeRangeDemo from './DateTimeRangeDemo';
import DateTimeRangeExDemo from './DateTimeRangeExDemo';
import FormDemo from './FormDemo';

import './main.less';

class Container extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = {};
    }

    @autobind
    selectHandler(tabKey) {
        this.setState({activeTab: tabKey});
    }

    render() {
        return (
            <Tabs
                position="left"
                activeKey={this.state.activeTab}
                onSelect={this.selectHandler}
            >
                <Tab eventKey="table" title="Table">
                    <TableDemo />
                </Tab>
                <Tab eventKey="rich-text-editor" title="RichTextEditor">
                    <RichTextEditorDemo />
                </Tab>
                <Tab eventKey="input-control" title="InputControl">
                    <InputControlDemo />
                </Tab>
                <Tab eventKey="select" title="Select">
                    <SelectDemo />
                </Tab>
                <Tab eventKey="multi-select" title="MultiSelect">
                    <MultiSelectDemo />
                </Tab>
                <Tab eventKey="date-time-field" title="DateTimeField">
                    <DateTimeFieldDemo />
                </Tab>
                <Tab eventKey="date-time-range" title="DateTimeRange">
                    <DateTimeRangeDemo />
                </Tab>
                <Tab eventKey="date-time-range-ex" title="DateTimeRangeEx">
                    <DateTimeRangeExDemo />
                </Tab>
                <Tab eventKey="form" title="Form">
                    <FormDemo />
                </Tab>
            </Tabs>
        );
    }
}

ReactDOM.render(
    <Container />,
    document.getElementById('react-app')
)
