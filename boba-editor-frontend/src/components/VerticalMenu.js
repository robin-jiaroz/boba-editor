import React from 'react';

class VerticalMenu extends React.Component {
  render() {
    return (
      <div className="three wide column">
        <div className="ui vertical fluid tabular menu">
          <a className="item active">
            Input Script
          </a>
          <a className="item">
            Boba Config
          </a>
          <a className="item">
            Generate Output
          </a>
        </div>
      </div>
    );
  }
}

export default VerticalMenu;