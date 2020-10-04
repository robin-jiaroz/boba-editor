import React from 'react';
import TopMenu from './TopMenu';
import VerticalMenu from './VerticalMenu';
import Editor from './Editor';
import './Editor.css';
import FileSaver from 'file-saver';
import axios from 'axios';
// import SplitPane, { Pane } from 'react-split-pane';
import SplitPane from 'react-split-pane';
import Pane from 'react-split-pane/lib/Pane';
import Console from './Console';

class App extends React.Component {
  // state = {
  //   blocks: [
  //     {
  //       id: 0,
  //       title: 'Boba Config',
  //       content: 'Please define your Boba Config here.',
  //       blockType: 'Boba Config',
  //       language: 'json',
  //       options: [],
  //       selectedOption: undefined,
  //       nextOptionId: undefined
  //     }
  //   ],
  //   expandedBlocks: [0],
  //   nextBlockId: 1,
  //   selectedBlock: 0,
  //   selectedBlockType: 'Boba Config',
  //   selectedBlockLanguage: 'json',
  //   output: 'No output yet. Please compile to see the output.',
  //   consoleSize: '30px'
  // };

  constructor(props) {
    console.log('constructor is invoked!');
    super(props);
    let blocks = JSON.parse(localStorage.getItem('blocks'));
    if (!blocks) {
      blocks = [
        {
          id: 0,
          title: 'Boba Config',
          content: 'Please define your Boba Config here.',
          blockType: 'Boba Config',
          language: 'json',
          options: [],
          selectedOption: undefined,
          nextOptionId: undefined
        }
      ];
    }
    console.log('blocks from constructor');
    console.log(blocks);
    let expandedBlocks = JSON.parse(localStorage.getItem('expandedBlocks'));
    if (!expandedBlocks) {
      expandedBlocks = [0];
    }
    console.log('expandedBlocks from constructor');
    console.log(expandedBlocks);
    let nextBlockId = localStorage.getItem('nextBlockId');
    let selectedBlock = localStorage.getItem('selectedBlock');
    let selectedBlockType = localStorage.getItem('selectedBlockType');
    let selectedBlockLanguage = localStorage.getItem('selectedBlockLanguage');
    let output = localStorage.getItem('output');
    let consoleSize = localStorage.getItem('consoleSize');

    this.state = {
      blocks: blocks,
      expandedBlocks: expandedBlocks,
      nextBlockId: nextBlockId ? nextBlockId : 1,
      selectedBlock: selectedBlock ? selectedBlock : 0,
      selectedBlockType: selectedBlockType ? selectedBlockType : 'Boba Config',
      selectedBlockLanguage: selectedBlockLanguage ? selectedBlockLanguage : 'json',
      output: output ? output: 'No output yet. Please compile to see the output.',
      consoleSize: consoleSize ? consoleSize : '30px'
    };
  }

  onBlocksUpdate = (updatedBlocks) => {
    this.setState({ blocks: updatedBlocks });
    console.log("onBlocksUpdate invoked");
    console.log(this.state.blocks);
  };

  addBlockHandler = () => {
    let clonedBlocks = this.state.blocks.map(block => ({ ...block }));
    clonedBlocks.push({
      id: this.state.nextBlockId,
      title: 'Input Script Block ' + this.state.nextBlockId,
      content: 'Please write your script for this block here.',
      blockType: undefined,
      language: undefined
    });
    this.onBlockDropDownClick(this.state.nextBlockId);
    this.setState({ blocks: clonedBlocks, nextBlockId: this.state.nextBlockId + 1 });
    console.log(this.state.nextBlockId);
  };

  addOptionWithinBlockHandler = (blockId) => {
    let clonedBlocks = this.state.blocks.map(block => ({ ...block }));
    let selectedBlockIndex;
    for (let i = 0; i < clonedBlocks.length; i++) {
      if (blockId === clonedBlocks[i].id) {
        selectedBlockIndex = i;
        break;
      }
    }
    clonedBlocks[selectedBlockIndex].options.push({
      optionId: clonedBlocks[selectedBlockIndex].nextOptionId,
      optionTitle: 'unnamed_option_' + clonedBlocks[selectedBlockIndex].nextOptionId,
      optionContent: 'Please define your option here.'
    });
    clonedBlocks[selectedBlockIndex].selectedOption = clonedBlocks[selectedBlockIndex].nextOptionId;
    clonedBlocks[selectedBlockIndex].nextOptionId = clonedBlocks[selectedBlockIndex].nextOptionId + 1;
    this.setState({
      blocks: clonedBlocks,
      selectedBlock: blockId,
      selectedBlockType: this.state.blocks[selectedBlockIndex].blockType,
      selectedBlockLanguage: this.state.blocks[selectedBlockIndex].language
    });
  };

  insertBlockAboveHandler = () => {
    let clonedBlocks = this.state.blocks.map(block => ({ ...block }));
    for (let i = 0; i < clonedBlocks.length; i++) {
      if (this.state.selectedBlock === clonedBlocks[i].id) {
        clonedBlocks.splice(i, 0, {
          id: this.state.nextBlockId,
          title: 'unnamed_block_' + this.state.nextBlockId,
          content: 'Please write your script for this block here.',
          blockType: undefined,
          language: undefined,
          options: []
        });
        break;
      }
    }
    this.onBlockDropDownClick(this.state.nextBlockId);
    this.setState({
      blocks: clonedBlocks,
      nextBlockId: this.state.nextBlockId + 1,
      selectedBlock: this.state.nextBlockId,
      selectedBlockType: undefined,
      selectedBlockLanguage: undefined
    });
    console.log(this.state.nextBlockId);
  };

  insertBlockBelowHandler = () => {
    let clonedBlocks = this.state.blocks.map(block => ({ ...block }));
    for (let i = 0; i < clonedBlocks.length; i++) {
      if (this.state.selectedBlock === clonedBlocks[i].id) {
        clonedBlocks.splice(i + 1, 0, {
          id: this.state.nextBlockId,
          title: 'unnamed_block_' + this.state.nextBlockId,
          content: 'Please write your script for this block here.',
          blockType: undefined,
          language: undefined,
          options: []
        });
        break;
      }
    }
    this.onBlockDropDownClick(this.state.nextBlockId);
    this.setState({
      blocks: clonedBlocks,
      nextBlockId: this.state.nextBlockId + 1,
      selectedBlock: this.state.nextBlockId,
      selectedBlockType: undefined,
      selectedBlockLanguage: undefined
    });
    console.log(this.state.nextBlockId);
  };

  moveSelectedBlockUpHandler = () => {
    let clonedBlocks = this.state.blocks.map(block => ({ ...block }));
    let selectedBlockIndex;
    for (let i = 0; i < clonedBlocks.length; i++) {
      if (this.state.selectedBlock === clonedBlocks[i].id) {
        selectedBlockIndex = i;
      }
    }
    console.log("moveSelectedBlockUpHandler selectedBlockIndex: " + selectedBlockIndex);
    if (!selectedBlockIndex || selectedBlockIndex === 0) {
      return;
    }
    let curSelectedBlock = clonedBlocks[selectedBlockIndex];
    clonedBlocks[selectedBlockIndex] = clonedBlocks[selectedBlockIndex - 1];
    clonedBlocks[selectedBlockIndex - 1] = curSelectedBlock;
    this.setState({ blocks: clonedBlocks });
  };

  moveSelectedBlockDownHandler = () => {
    let clonedBlocks = this.state.blocks.map(block => ({ ...block }));
    let selectedBlockIndex;
    for (let i = 0; i < clonedBlocks.length; i++) {
      if (this.state.selectedBlock === clonedBlocks[i].id) {
        selectedBlockIndex = i;
      }
    }
    console.log("moveSelectedBlockDownHandler selectedBlockIndex: " + selectedBlockIndex);
    if ((!selectedBlockIndex && selectedBlockIndex !== 0) || selectedBlockIndex === clonedBlocks.length - 1) {
      return;
    }
    let curSelectedBlock = clonedBlocks[selectedBlockIndex];
    clonedBlocks[selectedBlockIndex] = clonedBlocks[selectedBlockIndex + 1];
    clonedBlocks[selectedBlockIndex + 1] = curSelectedBlock;
    this.setState({ blocks: clonedBlocks });
  };

  onBlockDropDownClick = (blockId) => {
    // todo: Better switch to using set instead of array in the future
    // because of efficiency. But using set causes a bug that I haven't
    // figure out yet.

    // let clonedExpandedBlocks = new Set(this.state.expandedBlocks);
    // console.log(clonedExpandedBlocks);
    // clonedExpandedBlocks.add(index);
    // console.log(this.state.expandedBlocks);
    // this.setState({expandedBlocks: index});
    let clonedExpandedBlocks = [...this.state.expandedBlocks];
    if (clonedExpandedBlocks.includes(blockId)) {
      for (let i = 0; i < clonedExpandedBlocks.length; i++) {
        if (clonedExpandedBlocks[i] === blockId) {
          clonedExpandedBlocks.splice(i, 1);
        }
      }
    } else {
      clonedExpandedBlocks.push(blockId);
    }
    this.setState({ expandedBlocks: clonedExpandedBlocks });
    console.log(this.state.expandedBlocks);
  };

  removeBlockHandler = (blockId) => {
    if (this.state.blocks.length === 1) {
      return;
    }
    let selectedBlockIndex;
    for (let i = 0; i < this.state.blocks.length; i++) {
      if (this.state.selectedBlock === this.state.blocks[i].id) {
        selectedBlockIndex = i;
      }
    }
    console.log("removeBlockHandler selectedBlockIndex: " + selectedBlockIndex);
    if (selectedBlockIndex === this.state.blocks.length - 1) {
      this.setState({ selectedBlock: this.state.blocks[selectedBlockIndex - 1].id });
    } else {
      this.setState({ selectedBlock: this.state.blocks[selectedBlockIndex + 1].id });
    }
    const filteredBlcok = this.state.blocks.filter(block => block.id !== blockId);
    this.setState({ blocks: filteredBlcok });
    // console.log(this.state.blocks);
    // console.log("remove block handler invoked");
  };

  onBlockSelected = (blockId) => {
    let selectedBlockIndex;
    for (let i = 0; i < this.state.blocks.length; i++) {
      if (blockId === this.state.blocks[i].id) {
        selectedBlockIndex = i;
        break;
      }
    }
    this.setState({
      selectedBlock: blockId,
      selectedBlockType: this.state.blocks[selectedBlockIndex].blockType,
      selectedBlockLanguage: this.state.blocks[selectedBlockIndex].language
    });
    console.log("onBlockSelected invoked!");
    console.log("current selected block id: " + this.state.selectedBlock);
    console.log("current selectedBlockType: " + this.state.selectedBlockType);
    console.log("current selectedBlockLanguage: " + this.state.selectedBlockLanguage);
  };

  onOptionTabSelected = (blockId, optionId) => {
    console.log("onOptionTabSelected invoked!");
    let clonedBlocks = this.state.blocks.map(block => ({ ...block }));
    let selectedBlockIndex;
    for (let i = 0; i < clonedBlocks.length; i++) {
      if (blockId === clonedBlocks[i].id) {
        selectedBlockIndex = i;
        break;
      }
    }
    clonedBlocks[selectedBlockIndex].selectedOption = optionId;
    this.setState({
      blocks: clonedBlocks,
      selectedBlock: blockId,
      selectedBlockType: this.state.blocks[selectedBlockIndex].blockType,
      selectedBlockLanguage: this.state.blocks[selectedBlockIndex].language
    });
  };

  onOptionDeleteHandler = (blockId, optionId, event) => {
    console.log("onOptionDeleteHandler invoked!!!");
    event.stopPropagation();
    let clonedBlocks = this.state.blocks.map(block => ({ ...block }));
    for (let i = 0; i < clonedBlocks.length; i++) {
      if (blockId === clonedBlocks[i].id) {
        let selectedOptionIndex;
        for (let j = 0; j < clonedBlocks[i].options.length; j++) {
          if (optionId === clonedBlocks[i].options[j].optionId) {
            selectedOptionIndex = j;
            console.log(j);
            break;
          }
        }
        console.log(clonedBlocks[i].options[selectedOptionIndex]);
        if (selectedOptionIndex > 0) {
          clonedBlocks[i].selectedOption = clonedBlocks[i].options[selectedOptionIndex - 1].optionId;
          const filteredOptions = clonedBlocks[i].options.filter(option => option.optionId !== optionId);
          clonedBlocks[i].options = filteredOptions;
          console.log(clonedBlocks[i].options);
          this.setState({
            blocks: clonedBlocks,
            selectedBlock: blockId,
            selectedBlockType: clonedBlocks[i].blockType,
            selectedBlockLanguage: clonedBlocks[i].language
          });
        } else if (clonedBlocks[i].options.length > 1) {
          clonedBlocks[i].selectedOption = clonedBlocks[i].options[selectedOptionIndex + 1].optionId;
          const filteredOptions = clonedBlocks[i].options.filter(option => option.optionId !== optionId);
          clonedBlocks[i].options = filteredOptions;
          console.log(clonedBlocks[i].options);
          this.setState({
            blocks: clonedBlocks,
            selectedBlock: blockId,
            selectedBlockType: clonedBlocks[i].blockType,
            selectedBlockLanguage: clonedBlocks[i].language
          });
        } else {
          clonedBlocks[i].selectedOption = undefined;
          clonedBlocks[i].nextOptionId = undefined;
          clonedBlocks[i].options.pop();
          clonedBlocks[i].blockType = 'Normal Block';
          this.setState({
            blocks: clonedBlocks,
            selectedBlock: blockId,
            selectedBlockType: clonedBlocks[i].blockType,
            selectedBlockLanguage: clonedBlocks[i].language
          });
        }
        break;
      }
    }
  };

  copySelectedBlockHandler = () => {
    let curBlockContainer = document.getElementById(this.state.selectedBlock);
    let elm = curBlockContainer.querySelector('.input > .inner-block-container > .inner-block');

    // for Internet Explorer

    if (document.body.createTextRange) {
      let range = document.body.createTextRange();
      range.moveToElementText(elm);
      range.select().createTextRange();
      document.execCommand("Copy");
      alert("Copied div content to clipboard");
    } else if (window.getSelection) {
      // other browsers
      let selection = window.getSelection();
      let range = document.createRange();
      range.selectNodeContents(elm);
      selection.removeAllRanges();
      selection.addRange(range);
      document.execCommand("Copy");
      alert("Copied div content to clipboard");
    }
  };

  pasteBlockBelowHanlder = () => {
    this.insertBlockBelowHandler();
    let curBlockContainer = document.getElementById(this.state.selectedBlock);
    console.log("current selected block is: " + this.state.selectedBlock);
    let elm = curBlockContainer.querySelector('.input > .inner-block-container > .inner-block');
    elm.focus();
    document.execCommand("paste");
    console.log(elm);
    console.log("pasted text is: " + elm.textContent);
  };

  onBlockTypeSelectHandler = (e, { value }) => {
    let clonedBlocks = this.state.blocks.map(block => ({ ...block }));
    let selectedBlockIndex;
    for (let i = 0; i < clonedBlocks.length; i++) {
      if (this.state.selectedBlock === clonedBlocks[i].id) {
        selectedBlockIndex = i;
        break;
      }
    }
    // clonedBlocks[selectedBlockIndex].blockType = value;
    if (value === 'Decision Block') {
      clonedBlocks[selectedBlockIndex].blockType = value;
      clonedBlocks[selectedBlockIndex].selectedOption = 0;
      clonedBlocks[selectedBlockIndex].nextOptionId = 1;
      clonedBlocks[selectedBlockIndex].options.push({
        optionId: 0,
        optionTitle: 'unnamed_option_' + clonedBlocks[selectedBlockIndex].selectedOption,
        optionContent: clonedBlocks[selectedBlockIndex].content
      });
      clonedBlocks[selectedBlockIndex].content = "Please write your script for this block here.";
      this.setState({ blocks: clonedBlocks, selectedBlockType: value });
    } else if (clonedBlocks[selectedBlockIndex].blockType === 'Decision Block') {
      if (clonedBlocks[selectedBlockIndex].options.length > 1) {
        alert("The selected block couldn't be set to Normal Block since there are more than 1 option right now. Please delete to 1 option so that it becomes the Normal Block.");
      } else {
        console.log("could change to Normal Block now.");
        clonedBlocks[selectedBlockIndex].blockType = value;
        clonedBlocks[selectedBlockIndex].content = clonedBlocks[selectedBlockIndex].options.pop().optionContent;
        this.setState({ blocks: clonedBlocks, selectedBlockType: value });
      }
    } else {
      clonedBlocks[selectedBlockIndex].blockType = value;
      this.setState({ blocks: clonedBlocks, selectedBlockType: value });
    }
    // this.setState({ blocks: clonedBlocks, selectedBlockType: value });
    console.log("onBlockTypeSelectHandler invoked!!!");
  };

  onBlockLanguageSelectHandler = (e, { value }) => {
    let clonedBlocks = this.state.blocks.map(block => ({ ...block }));

    // only choose language for selected block
    // let selectedBlockIndex;
    // for (let i = 0; i < clonedBlocks.length; i++) {
    //   if (this.state.selectedBlock === clonedBlocks[i].id) {
    //     selectedBlockIndex = i;
    //     break;
    //   }
    // }
    // clonedBlocks[selectedBlockIndex].language = value;

    for (let i = 0; i < clonedBlocks.length; i++) {
      clonedBlocks[i].language = value;
    }
    this.setState({ blocks: clonedBlocks, selectedBlockLanguage: value });
    console.log("onBlockLanguageSelectHandler invoked!!!");
  };

  onBlockContentChangeHandler = (code, blockId) => {
    console.log("0nBlockContentChangeHandler invoked!!!");
    // this.setEndOfContenteditable(event.target);
    let clonedBlocks = this.state.blocks.map(block => ({ ...block }));
    let selectedBlockIndex;
    for (let i = 0; i < clonedBlocks.length; i++) {
      if (blockId === clonedBlocks[i].id) {
        selectedBlockIndex = i;
        break;
      }
    }
    if (!clonedBlocks[selectedBlockIndex].blockType || clonedBlocks[selectedBlockIndex].blockType === "Normal Block" || clonedBlocks[selectedBlockIndex].blockType === "Boba Config") {
      clonedBlocks[selectedBlockIndex].content = code;
    } else {
      for (let i = 0; i < clonedBlocks[selectedBlockIndex].options.length; i++) {
        if (clonedBlocks[selectedBlockIndex].options[i].optionId === clonedBlocks[selectedBlockIndex].selectedOption) {
          clonedBlocks[selectedBlockIndex].options[i].optionContent = code;
        }
      }
    }
    this.setState({ blocks: clonedBlocks });
  };

  onDownloadClickHandler = () => {
    console.log('onDownloadClickHandler is invoked!!!');
    let save = this.makeUpScriptFile();
    let blob = new Blob([save], {
      type: "text/plain;charset=utf-8"
    });
    let filename = "template";
    if (this.state.selectedBlockLanguage === "python") {
      filename += ".py";
    } else {
      filename += "." + this.state.selectedBlockLanguage;
    }
    FileSaver.saveAs(blob, filename);
  };

  onCompileClickHandler = async () => {
    const response = await axios.post(
      '/compile',
      {script: this.makeUpScriptFile()},
      { headers: { 'Content-Type': 'application/json' } }
    );
    console.log(response["data"]["you sent"]);
    this.setState({ output: response["data"]["you sent"] });
    let curConsoleSize = parseInt(this.state.consoleSize, 10);
    console.log('cur console size: ' + curConsoleSize);
    if (curConsoleSize < 250) {
      this.setState({ consoleSize: '250px' });
    }
  }

  makeUpScriptFile = () => {
    let script = "";
    for (let i = 0; i < this.state.blocks.length; i++) {
      let curBlock = this.state.blocks[i];
      if (curBlock.blockType === 'Boba Config') {
        script += "# --- (BOBA_CONFIG)\n" + curBlock.content + "\n# --- (END)\n";
      } else if (curBlock.blockType === 'Normal Block') {
        script += "# --- (" + curBlock.title + ")\n" + curBlock.content + "\n";
      } else {
        for (let j = 0; j < curBlock.options.length; j++) {
          let curOption = curBlock.options[j];
          script += "# --- (" + curBlock.title + ") " + curOption.optionTitle + "\n" + curOption.optionContent + "\n";
        }
      }
    }
    return script;
  }

  onConsoleSizeChangeHandler = (updatedSize) => {
    this.setState({ consoleSize: updatedSize});
  }

  componentDidMount() {
    window.addEventListener('beforeunload', this.cleanup);
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.cleanup);
  }

  cleanup = () => {
    localStorage.setItem('blocks', JSON.stringify(this.state.blocks));
    localStorage.setItem('expandedBlocks', JSON.stringify(this.state.expandedBlocks));
    localStorage.setItem('nextBlockId', this.state.nextBlockId);
    localStorage.setItem('selectedBlock', this.state.selectedBlock);
    localStorage.setItem('selectedBlockType', this.state.selectedBlockType);
    localStorage.setItem('selectedBlockLanguage', this.state.selectedBlockLanguage);
    localStorage.setItem('output', this.state.output);
    localStorage.setItem('consoleSize', this.state.consoleSize);
  }

  render() {
    console.log("App is rerendered, current blocks:");
    console.log(this.state.blocks);
    return (
      <React.Fragment>
          <TopMenu
            selectedBlock={this.state.selectedBlock}
            selectedBlockType={this.state.selectedBlockType}
            selectedBlockLanguage={this.state.selectedBlockLanguage}
            addBlockHandler={this.addBlockHandler}
            insertBlockAboveHandler={this.insertBlockAboveHandler}
            insertBlockBelowHandler={this.insertBlockBelowHandler}
            moveSelectedBlockUpHandler={this.moveSelectedBlockUpHandler}
            moveSelectedBlockDownHandler={this.moveSelectedBlockDownHandler}
            removeBlockHandler={this.removeBlockHandler}
            copySelectedBlockHandler={this.copySelectedBlockHandler}
            pasteBlockBelowHanlder={this.pasteBlockBelowHanlder}
            onBlockTypeSelectHandler={this.onBlockTypeSelectHandler}
            onBlockLanguageSelectHandler={this.onBlockLanguageSelectHandler}
            onDownloadClickHandler={this.onDownloadClickHandler}
            onCompileClickHandler={this.onCompileClickHandler}
          />
          <SplitPane
            split="horizontal"
            className="main-area"
            // initialSize={this.state.consoleSize}
            onChange={(size) => {
                console.log('The pane size is changing!!!');
                console.log(size[1]);
                this.setState({consoleSize: size[1]});
            }}
          >
            <div className="main-editor">
              <div className="ui container">
                <Editor
                  blocks={this.state.blocks}
                  onBlockDropDownClick={this.onBlockDropDownClick}
                  expandedBlocks={this.state.expandedBlocks}
                  removeBlockHandler={this.removeBlockHandler}
                  onBlockSelected={this.onBlockSelected}
                  selectedBlock={this.state.selectedBlock}
                  onBlocksUpdate={this.onBlocksUpdate}
                  addOptionWithinBlockHandler={this.addOptionWithinBlockHandler}
                  onOptionTabSelected={this.onOptionTabSelected}
                  onOptionDeleteHandler={this.onOptionDeleteHandler}
                  onBlockContentChangeHandler={this.onBlockContentChangeHandler}
                />
              </div>
            </div>
            <Pane
              initialSize={this.state.consoleSize}
              minSize="30px"
            >
              <Console
                output={this.state.output}
                consoleSize={this.state.consoleSize}
                onConsoleSizeChangeHandler={this.onConsoleSizeChangeHandler}
              />
            </Pane>
          </SplitPane>
      </React.Fragment>
    );
  }
}

export default App;