import React from 'react';
import ReactDOM from 'react-dom';
import {Tab, Tabs} from 'react-bootstrap';

import SelectDemo from './SelectDemo';
import TableDemo from './TableDemo';
import RichTextEditorDemo from './RichTextEditorDemo';
import DateTimeFieldDemo from './DateTimeFieldDemo';
import DateTimeRangeDemo from './DateTimeRangeDemo';

import './main.less';

class Container extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = {};
        this.selectHandler = this.selectHandler.bind(this);
    }

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
                 <Tab eventKey="select" title="Select">
                     <SelectDemo />
                 </Tab>
                 <Tab eventKey="rich-text-editor" title="RichTextEditor">
                     <RichTextEditorDemo />
                 </Tab>
                 <Tab eventKey="table" title="Table">
                     <TableDemo />
                 </Tab>
                 <Tab eventKey="date-time-field" title="DateTimeField">
                     <DateTimeFieldDemo />
                 </Tab>
                 <Tab eventKey="date-time-range" title="DateTimeRange">
                     <DateTimeRangeDemo />
                 </Tab>
            </Tabs>
        );
    }
}

ReactDOM.render(
    <Container />,
    document.getElementById('react-app')
)
