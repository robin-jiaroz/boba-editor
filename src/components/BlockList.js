import React from 'react';
import './BlockList.css';
import AceEditor from "react-ace";
import "brace/theme/iplastic";
import 'brace/mode/matlab';
import 'brace/mode/r';
import 'brace/mode/plain_text';
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/ext-language_tools"

// import "ace-builds/src-noconflict/theme-twilight";
// import "brace/theme/tomorrow";
// import "brace/theme/ambiance";
// import "brace/theme/chaos";
// import "brace/theme/chrome";
// import "brace/theme/clouds";
// import "brace/theme/clouds_midnight";
// import "brace/theme/cobalt";
// import "brace/theme/crimson_editor";
// import "brace/theme/dawn";
// import "brace/theme/dracula";
// import "brace/theme/dreamweaver";
// import "brace/theme/eclipse";
// import "brace/theme/gob";
// import "brace/theme/gruvbox";
// import "brace/theme/idle_fingers";  // Intellij
// import "brace/theme/katzenmilch";
// import "brace/theme/kr_theme";
// import "brace/theme/kuroir";
// import "brace/theme/merbivore";
// import "brace/theme/merbivore_soft";
// import "brace/theme/mono_industrial";
// import "brace/theme/monokai";
// import "brace/theme/pastel_on_dark";
// import "brace/theme/solarized_light";
// import "brace/theme/sqlserver";
// import "brace/theme/vibrant_ink";

class BlockList extends React.Component {

  editBlockNameHandler = () => {
    console.log("file name edited hah!");
    let curBlockContainer = document.getElementById(this.props.selectedBlock);
    curBlockContainer.querySelector('.input > .inner-block-container > .block-name-container > .block-name-wrapper > .saved-block-name').classList.add('hidden');
    curBlockContainer.querySelector('.input > .inner-block-container > .block-name-container > .block-name-wrapper > .edit-block-name').classList.remove('hidden');
  }

  onMouseOverHanlder = (event) => {
    event.target.classList.remove('outline');
  }

  onMouseLeaveHanlder = (event) => {
    event.target.classList.add('outline');
  }

  // onMouseOverOptionTabHanlder = (event, selectedOption, optionId) => {
  //   if (selectedOption !== optionId) {
  //     event.target.querySelector('.edit').classList.remove('invisible');
  //     event.target.querySelector('.close').classList.remove('invisible');
  //   }
  // }

  // onMouseLeaveOptionTabHanlder = (event, selectedOption, optionId) => {
  //   if (selectedOption !== optionId) {
  //     event.target.querySelector('.edit').classList.add('invisible');
  //     event.target.querySelector('.close').classList.add('invisible');
  //   }
  // }

  onBlockNameSubmitHandler = (event) => {
    event.preventDefault();
    console.log(event.target.querySelector('input').value);
    let clonedBlocks = this.props.blocks.map(block => ({ ...block }));
    for (let i = 0; i < clonedBlocks.length; i++) {
      if (this.props.selectedBlock === clonedBlocks[i].id) {
        clonedBlocks[i].title = event.target.querySelector('input').value;
        break;
      }
    }
    this.props.onBlocksUpdate(clonedBlocks);
    let curBlockContainer = document.getElementById(this.props.selectedBlock);
    curBlockContainer.querySelector('.input > .inner-block-container > .block-name-container > .block-name-wrapper > .saved-block-name').classList.remove('hidden');
    curBlockContainer.querySelector('.input > .inner-block-container > .block-name-container > .block-name-wrapper > .edit-block-name').classList.add('hidden');
  }

  editOptionNameHandler = (blockId) => {
    let curBlockContainer = document.getElementById(blockId);
    console.log(curBlockContainer);
    let curOptionNameContainer = curBlockContainer.querySelector('.input > .inner-block-container > .inner-block-tab-container-wrapper > .options-tab-container > .option-tab-selected > .option-name-container');
    console.log(curOptionNameContainer);
    curOptionNameContainer.querySelector('.saved-option-name').classList.add('hidden');
    curOptionNameContainer.querySelector('.edit-option-name').classList.remove('hidden');
    // curBlockContainer.querySelector('.input > .inner-block-container > .inner-block-tab-container-wrapper > .options-tab-container > .option-tab-selected > .option-name-container > .saved-option-name').classList.add('hidden');
    // curBlockContainer.querySelector('.input > .inner-block-container > .inner-block-tab-container-wrapper > .options-tab-container > .option-tab-selected > .option-name-container > .edit-option-name').classList.remove('hidden');
  }

  onOptionNameSubmitHandler = (event, blockId, optionId) => {
    event.preventDefault();
    console.log(event.target.querySelector('input').value);
    let clonedBlocks = this.props.blocks.map(block => ({ ...block }));
    for (let i = 0; i < clonedBlocks.length; i++) {
      if (blockId === clonedBlocks[i].id) {
        for (let j = 0; j < clonedBlocks[i].options.length; j++) {
          if (optionId === clonedBlocks[i].options[j].optionId) {
            clonedBlocks[i].options[j].optionTitle = event.target.querySelector('input').value;
            break;
          }
        }
        break;
      }
    }
    this.props.onBlocksUpdate(clonedBlocks);
    let curBlockContainer = document.getElementById(blockId);
    let curOptionNameContainer = curBlockContainer.querySelector('.input > .inner-block-container > .inner-block-tab-container-wrapper > .options-tab-container > .option-tab-selected > .option-name-container');
    curOptionNameContainer.querySelector('.saved-option-name').classList.remove('hidden');
    curOptionNameContainer.querySelector('.edit-option-name').classList.add('hidden');
  }

  // onOptionDeleteHandler = (blockId, optionId) => {
  //   console.log("onOptionDeleteHandler invoked!!!");
  //   let clonedBlocks = this.props.blocks.map(block => ({ ...block }));
  //   for (let i = 0; i < clonedBlocks.length; i++) {
  //     if (blockId === clonedBlocks[i].id) {
  //       let selectedOptionIndex;
  //       for (let j = 0; j < clonedBlocks[i].options.length; j++) {
  //         if (optionId === clonedBlocks[i].options[j].optionId) {
  //           selectedOptionIndex = j;
  //           console.log(j);
  //           break;
  //         }
  //       }
  //       console.log(clonedBlocks[i].options[selectedOptionIndex]);
  //       clonedBlocks[i].selectedOption = clonedBlocks[i].options[selectedOptionIndex + 1].optionId;
  //       const filteredOptions = clonedBlocks[i].options.filter(option => option.optionId !== optionId);
  //       clonedBlocks[i].options = filteredOptions;
  //       console.log(clonedBlocks[i].options);
  //       break;
  //     }
  //   }
  //   console.log(clonedBlocks);
  //   this.props.onBlocksUpdate(clonedBlocks);
  // }

  onDropDownIconClick = (blockId) => {
    console.log("onDropDownIconClick invoked");
    this.props.onBlockDropDownClick(blockId);
    let curBlockContainer = document.getElementById(blockId);
    let curInnerBlock = curBlockContainer.querySelector('.input > .inner-block-container > .inner-block-tab-container-wrapper');
    console.log(curInnerBlock);
    console.log(curInnerBlock.style.display);
    if (!curInnerBlock.style.display || curInnerBlock.style.display === "block") {
      curInnerBlock.style.display = "none";
      console.log("collapsed");
    } else {
      curInnerBlock.style.display = "block";
      console.log("expanded");
    }
  }

  getRenderedContentForEditor = (block) => {
    if (!block.blockType || block.blockType === "Normal Block" || block.blockType === "Boba Config") {
      // console.log("getRenderedContentForEditor returns: " + block.content);
      return block.content;
    } else {
      for (let i = 0; i < block.options.length; i++) {
        if (block.options[i].optionId === block.selectedOption) {
          return block.options[i].optionContent;
        }
      }
      return "Some bug in getRenderedContentForEditor";
    }
  }

  getModeForEditor = (block) => {
    if (!block.language) {
      return "plain_text";
    } else if (block.blockType === "Boba Config") {
      return "json";
    } else {
      return block.language;
    }
  }

  render() {
    const renderedBlocks = this.props.blocks.map((block) => {
      const active = this.props.expandedBlocks.includes(block.id) ? 'down' : 'right';
      const angleMessage = this.props.expandedBlocks.includes(block.id) ? 'collapse' : 'expand';
      const selected = this.props.selectedBlock === block.id ? 'selected' : 'unselected';
      const invisible = this.props.selectedBlock === block.id ? '' : 'invisible';
      const hidden = block.blockType === 'Decision Block' ? '' : 'hidden';
      let options;
      if (block.blockType === 'Decision Block') {
        options = block.options.map((option) => {
          const optionTabSelected = option.optionId === block.selectedOption ? 'option-tab-selected' : 'option-tab-unselected';
          const optionTabInvisible = option.optionId === block.selectedOption ? '' : 'invisible';
          return <div
            key={block.id.toString() + "-" + option.optionId}
            className={`${optionTabSelected}`}
            onClick={() => this.props.onOptionTabSelected(block.id, option.optionId)}
          // onMouseOver={(event) => this.onMouseOverOptionTabHanlder(event, block.selectedOption, option.optionId)}
          // onMouseLeave={(event) => this.onMouseLeaveOptionTabHanlder(event, block.selectedOption, option.optionId)}
          >
            <div className="option-name-container">
              <span className="saved-option-name">
                {option.optionTitle}
              </span>
              <form className="edit-option-name hidden" onSubmit={(event) => this.onOptionNameSubmitHandler(event, block.id, option.optionId)}>
                <input className="edit-option-name-box" type="text" placeholder={option.optionTitle}></input>
                <button>Confirm</button>
              </form>
            </div>
            <i
              className={`edit outline icon edit-option-icon ${optionTabInvisible}`}
              title="click to define the name for this option"
              onClick={() => this.editOptionNameHandler(block.id)}
            >
            </i>
            <i
              className={`close icon close-option-icon ${optionTabInvisible}`}
              title="click to delete this option"
              onClick={(event) => this.props.onOptionDeleteHandler(block.id, option.optionId, event)}
            >
            </i>
          </div>
        });
      }
      return <div key={block.id} id={block.id} className={`block-container ${selected}`} onClick={() => this.props.onBlockSelected(block.id)}>
        <div className="input">
          <div className="prompt-container">
            <span className="invisible">
              <i className="edit outline icon"
                title="click to define the name for this block"
                onClick={this.editBlockNameHandler}
                onMouseOver={this.onMouseOverHanlder}
                onMouseLeave={this.onMouseLeaveHanlder}>
              </i>
            </span>
            <i className={`angle ${active} icon`}
              title={`click to ${angleMessage} this block`}
              onClick={() => this.onDropDownIconClick(block.id)}>
            </i>
          </div>
          <div className="inner-block-container">
            <div className="block-name-container">
              <div className="block-name-wrapper">
                <span className="saved-block-name">
                  {block.title}
                </span>
                <form className="edit-block-name hidden" onSubmit={this.onBlockNameSubmitHandler}>
                  <input className="edit-block-name-box" type="text" placeholder={block.title}></input>
                  <button>Confirm</button>
                </form>
              </div>
              <span className={`${invisible}`}>
                <i className="edit outline icon"
                  title="click to define the name for this block"
                  onClick={this.editBlockNameHandler}
                  onMouseOver={this.onMouseOverHanlder}
                  onMouseLeave={this.onMouseLeaveHanlder}>
                </i>
              </span>
            </div>
            <div className="inner-block-tab-container-wrapper">
              <div className={`options-tab-container ${hidden}`}>
                {options}
                <i
                  className="plus circle icon"
                  title="click to add a new option"
                  onClick={() => this.props.addOptionWithinBlockHandler(block.id)}
                >
                </i>
              </div>
              {/* <div
                className="inner-block"
                contentEditable="true"
                suppressContentEditableWarning={true}
                onInput={(event) => this.props.onBlockContentChangeHandler(event, block.id)}
              >

              </div> */}
              <AceEditor
                // onLoad={function(editor){ editor.renderer.setPadding(5); editor.renderer.setScrollMargin(10); }}
                onLoad={function(editor){editor.container.style.lineHeight = 1.5;}}
                mode={this.getModeForEditor(block)}
                // placeholder="type something"
                theme="iplastic"
                width="100%"
                fontSize={14}
                maxLines={10000}
                value={this.getRenderedContentForEditor(block)}
                onChange={(code) => this.props.onBlockContentChangeHandler(code, block.id)}
                name={block.id.toString()}
                editorProps={{ $blockScrolling: true }}
                setOptions={{
                  enableBasicAutocompletion: true,
                  enableLiveAutocompletion: true,
                  enableSnippets: true
                }}
              />
            </div>
          </div>
        </div>
      </div>
    });

    return (
      <div>
        {renderedBlocks}
      </div>
    );
  }
}

export default BlockList;