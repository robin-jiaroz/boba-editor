import React from 'react';
import './Editor.css';
import Accordion from './Accordion';

class Editor extends React.Component {

  render() {
    return (
      <div className="ten wide column">
        <div className="ui segment editor">
          <Accordion
            blocks={this.props.blocks}
            onBlockDropDownClick={this.props.onBlockDropDownClick}
            selectedBlock={this.props.selectedBlock}
            removeBlockHandler={this.props.removeBlockHandler}
          />
        </div>
      </div>
    );
  }
}

export default Editor;