import './main.less';

import React from 'react';
import ReactDOM from 'react-dom';
import {Tab, Tabs} from 'react-bootstrap';

import RichTextEditorDemo from './RichTextEditorDemo';
import SelectDemo from './SelectDemo';

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
            </Tabs>
        );
    }
}

ReactDOM.render(
    <Container />,
    document.getElementById('react-app')
)
