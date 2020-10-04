import React from 'react';
import './TopMenu.css';
import { Dropdown } from 'semantic-ui-react';
import logo from '../images/idl-logo.png';

const blockTypes = [
  { key: 1, text: 'Normal Block', value: 'Normal Block' },
  { key: 2, text: 'Decision Block', value: 'Decision Block' },
]

const bobaConfig = [
  { key: 1, text: 'Boba Config', value: 'Boba Config' },
]

const languages = [
  { key: 1, text: 'python', value: 'python' },
  { key: 2, text: 'java', value: 'java' },
  { key: 3, text: 'javascript', value: 'javascript' },
  { key: 4, text: 'json', value: 'json' },
  { key: 5, text: 'matlab', value: 'matlab' },
  { key: 6, text: 'r', value: 'r' }
]

const json = [
  { key: 1, text: 'json', value: 'json' },
]

class TopMenu extends React.Component {

  // state = {};

  // handleChange = (e, { value }) => {
  //   console.log(value);
  // };

  onLogoClickHandler = () => {
    window.open("https://idl.cs.washington.edu/");
  }

  onAboutClickHandler = () => {
    window.open("https://github.com/uwdata/boba");
  }

  render() {
    // const { value } = this.state;
    console.log("TopMenu is rerendered!!");
    console.log("current selectedBlockType: " + this.props.selectedBlockType);
    console.log("current selectedBlockLanguage: " + this.props.selectedBlockLanguage);

    let blockTypeDropDown;
    if (this.props.selectedBlockType === 'Boba Config') {
      blockTypeDropDown = (
        <Dropdown
          options={bobaConfig}
          selection
          disabled
          value="Boba Config"
        />);
    } else if (!this.props.selectedBlockType) {
      console.log("selectedBlockType is undefined");
      blockTypeDropDown = (
        <Dropdown
          onChange={this.props.onBlockTypeSelectHandler}
          options={blockTypes}
          placeholder='Choose an block type'
          selection
          value={''}
        />);
    } else {
      blockTypeDropDown = (
        <Dropdown
          onChange={this.props.onBlockTypeSelectHandler}
          options={blockTypes}
          placeholder='Choose an block type'
          selection
          value={this.props.selectedBlockType}
        />);
    }

    let languageDropDown;
    if (this.props.selectedBlockType === 'Boba Config') {
      languageDropDown = (
        <Dropdown
          options={json}
          selection
          disabled
          value="json"
        />);
    } else if (!this.props.selectedBlockLanguage) {
      console.log("selectedBlockLanguage is undefined");
      languageDropDown = (
        <Dropdown
          onChange={this.props.onBlockLanguageSelectHandler}
          options={languages}
          placeholder='Choose an language'
          selection
          value={''}
        />);
    } else {
      languageDropDown = (
        <Dropdown
          onChange={this.props.onBlockLanguageSelectHandler}
          options={languages}
          placeholder='Choose an language'
          selection
          value={this.props.selectedBlockLanguage}
        />);
    }

    return (
      <div className="nav-bar">
        <div className="ui fixed menu" style={{position: "relative"}}>
          <a href="#">
            <div className="item" onClick={this.onLogoClickHandler}>
              <img src={logo} alt="Boba Editor Logo"></img>
            </div>
          </a>
          <Dropdown text='File' pointing className='link item'>
            <Dropdown.Menu>
              <Dropdown.Item onClick={this.props.onDownloadClickHandler}>Download</Dropdown.Item>
              <Dropdown.Item onClick={this.props.onCompileClickHandler}>Compile</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown text='Edit' pointing className='link item'>
            <Dropdown.Menu>
              <Dropdown.Item>Copy Block</Dropdown.Item>
              <Dropdown.Item onClick={() => this.props.removeBlockHandler(this.props.selectedBlock)}>Delete Block</Dropdown.Item>
              <Dropdown.Item onClick={this.props.moveSelectedBlockUpHandler}>Move Block Up</Dropdown.Item>
              <Dropdown.Item onClick={this.props.moveSelectedBlockDownHandler}>Move Block Down</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown text='Insert' pointing className='link item'>
            <Dropdown.Menu>
              <Dropdown.Item onClick={this.props.insertBlockAboveHandler}>Insert Block Above</Dropdown.Item>
              <Dropdown.Item onClick={this.props.insertBlockBelowHandler}>Insert Block Below</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown text='Help' pointing className='link item'>
            <Dropdown.Menu>
              <Dropdown.Item onClick={this.onAboutClickHandler}>About</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className="toolbar">
          <button className="ui compact icon button" title="insert block below" onClick={this.props.insertBlockBelowHandler}>
            <i className="plus icon"></i>
          </button>
          <button className="ui compact icon button" title="move selected block down" onClick={this.props.moveSelectedBlockDownHandler}>
            <i className="arrow down icon"></i>
          </button>
          <button className="ui compact icon button" title="move selected block up" onClick={this.props.moveSelectedBlockUpHandler}>
            <i className="arrow up icon"></i>
          </button>
          <button className="ui compact icon button" title="delete selected block" onClick={() => this.props.removeBlockHandler(this.props.selectedBlock)}>
            <i className="trash alternate icon"></i>
          </button>
          <button className="ui compact icon button" title="copy selected block" onClick={this.props.copySelectedBlockHandler}>
            <i className="copy outline icon"></i>
          </button>
          <button className="ui compact icon button" title="paste block below" onClick={this.props.pasteBlockBelowHanlder}>
            <i className="paste icon"></i>
          </button>
          {blockTypeDropDown}{' '}
          {languageDropDown}
        </div>
      </div>
    );
  }
}

export default TopMenu;