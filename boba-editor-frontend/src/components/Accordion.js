import React from 'react';
import './Accordion.css';

// class Accordion extends React.Component {
//   renderedBlocks = this.props.blocks.map(block => {
//     return <React.Fragment>
//       <div className="title active">
//         <i className="dropdown icon"></i>
//         {block.title}
//       </div>
//       <div className="content active">
//         <p>{block.content}</p>
//       </div>
//     </React.Fragment>
//   });

//   render() {
//     console.log(this.props.blocks);
//     console.log(this.renderedBlocks);
//     return (
//       <div className="ui styled accordion">
//         {this.renderedBlocks}
//       </div>
//     );
//   }
// }

const Accordion = (props) => {
  const renderedBlocks = props.blocks.map((block) => {
    const active = props.expandedBlocks.includes(block.id) ? 'active' : '';
    return <React.Fragment>
      <div className={`title ${active} title-container`}>
        <i className="dropdown icon dropdown-icon" onClick={() => props.onBlockDropDownClick(block.id)}></i>
        <span contentEditable="true">
          {block.title}
        </span>
        <i className="window close icon outline close-icon" onClick={() => props.removeBlockHandler(block.id)}></i>
      </div>
      <div className={`content ${active}`} contentEditable="true">
        {block.content}
      </div>
    </React.Fragment>
  });

  return (
    <div className="ui styled fluid accordion">
      {renderedBlocks}
    </div>
  );
}

export default Accordion;