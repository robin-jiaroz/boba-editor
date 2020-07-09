import React from 'react';
import TopMenu from './TopMenu';
import VerticalMenu from './VerticalMenu';
import Editor from './Editor';

class App extends React.Component {
  state = { blocks: [
    {
      id: 0,
      title: 'Boba Config',
      content: 'Please define your Boba Config here.'
    }
  ], selectedBlock: [0], nextBlockId: 1 };

  addBlockHandler = () => {
    let clonedBlocks = this.state.blocks.map(block => ({...block}));
    // console.log(this.state.blocks);
    clonedBlocks.push({
      id: this.state.nextBlockId,
      title: 'Input Script Block ' + this.state.nextBlockId,
      content: 'Please write your script for this block here.'
    });
    this.onBlockDropDownClick(this.state.nextBlockId);
    this.setState({blocks: clonedBlocks, nextBlockId: this.state.nextBlockId + 1});
    console.log(this.state.nextBlockId);
  }

  onBlockDropDownClick = (blockId) => {
    // todo: Better switch to using set instead of array in the future
    // because of efficiency. But using set causes a bug that I haven't
    // figure out yet.

    // let clonedSelectedBlock = new Set(this.state.selectedBlock);
    // console.log(clonedSelectedBlock);
    // clonedSelectedBlock.add(index);
    // console.log(this.state.selectedBlock);
    // this.setState({selectedBlock: index});
    let clonedSelectedBlock = [...this.state.selectedBlock];
    if (clonedSelectedBlock.includes(blockId)) {
      for (let i = 0; i < clonedSelectedBlock.length; i++) {
        if (clonedSelectedBlock[i] === blockId) {
          clonedSelectedBlock.splice(i, 1);
        }
      }
    } else {
      clonedSelectedBlock.push(blockId);
    }
    this.setState({selectedBlock: clonedSelectedBlock});
    console.log(this.state.selectedBlock);
  }

  removeBlockHandler = (blockId) => {
    const filteredBlcok = this.state.blocks.filter(block => block.id !== blockId);
    this.setState({blocks: filteredBlcok});
    console.log(this.state.blocks);
    console.log("remove block handler invoked");
  }

  render() {
    return (
      <div className="ui container">
        <TopMenu addBlockHandler={this.addBlockHandler}/>
        <div className="ui grid">
          <VerticalMenu />
          <Editor
            blocks={this.state.blocks}
            onBlockDropDownClick={this.onBlockDropDownClick}
            selectedBlock={this.state.selectedBlock}
            removeBlockHandler={this.removeBlockHandler}
          />
        </div>
      </div>
    );
  }
}

export default App;