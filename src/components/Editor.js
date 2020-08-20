import React from 'react';
import './Editor.css';
import Accordion from './Accordion';
import BlockList from './BlockList';

class Editor extends React.Component {

  render() {
    return (
      <div className="ten wide column">
        <div className="ui segment editor">
          {/* <Accordion
            blocks={this.props.blocks}
            onBlockDropDownClick={this.props.onBlockDropDownClick}
            expandedBlocks={this.props.expandedBlocks}
            removeBlockHandler={this.props.removeBlockHandler}
          /> */}
          <BlockList
            blocks={this.props.blocks}
            onBlockDropDownClick={this.props.onBlockDropDownClick}
            expandedBlocks={this.props.expandedBlocks}
            removeBlockHandler={this.props.removeBlockHandler}
            onBlockSelected={this.props.onBlockSelected}
            selectedBlock={this.props.selectedBlock}
            onBlocksUpdate={this.props.onBlocksUpdate}
            addOptionWithinBlockHandler={this.props.addOptionWithinBlockHandler}
            onOptionTabSelected={this.props.onOptionTabSelected}
            onOptionDeleteHandler={this.props.onOptionDeleteHandler}
            onBlockContentChangeHandler={this.props.onBlockContentChangeHandler}
          />
        </div>
      </div>
    );
  }
}

export default Editor;