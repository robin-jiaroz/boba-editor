import React from 'react';
import { CsvToHtmlTable } from 'react-csv-to-table';
import SplitPane from 'react-split-pane';
import Pane from 'react-split-pane/lib/Pane';
import './Console.css';

class Console extends React.Component {
  render() {
    let sampleData = `
    Filename,Code Path,cutoff,A
    universe_1.py,unnamed_block_1->A->B,2,iqr
    universe_2.py,unnamed_block_1->A->B,2.5,iqr
    universe_3.py,unnamed_block_1->A->B,3,iqr
    universe_4.py,unnamed_block_1->A->B,2,std
    universe_5.py,unnamed_block_1->A->B,2.5,std
    universe_6.py,unnamed_block_1->A->B,3,std
    `;
    let curConsoleSize = parseInt(this.props.consoleSize, 10);
    const active = curConsoleSize > 30 ? 'down' : 'up';
    const angleMessage = curConsoleSize > 30 ? 'collapse' : 'expand';
    return (
      <div className="console-pane">
        <div className="console-bar">
          <span>
            CONSOLE
          </span>
          <i className={`angle ${active} icon`}
            title={`click to ${angleMessage} this block`}
            onClick={() => {
              if (active === 'down') {
                this.props.onConsoleSizeChangeHandler('30px');
              } else {
                this.props.onConsoleSizeChangeHandler('250px');
              }
            }}>
          </i>
        </div>
        <CsvToHtmlTable
          data={this.props.output}
          csvDelimiter=","
          tableClassName="table table-striped table-hover table-bordered console-output"
        />
      </div>
    );
  }
}

export default Console;