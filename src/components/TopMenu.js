import React from 'react';

class TopMenu extends React.Component {
  render() {
    return (
      <div className="ui four item menu">
        <a className="item">File</a>
        <a className="item">Edit</a>
        <a className="item" onClick={this.props.addBlockHandler}>Add Block</a>
        <a className="item">Help</a>
      </div>
    );
  }
}

export default TopMenu;