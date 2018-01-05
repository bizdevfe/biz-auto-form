import React from 'react';
import {Input} from '../../src/index';
import MarkdownElement from '../MarkdownElement';
import doc from './doc.md';

class InputDoc extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'http://'
    }
  }

  handleChange = (value) => {
    this.setState({
      value: value
    });
  };

  render() {
    return (
      <div>
        <h1>Input 输入框</h1>
        <div className="example">
          <Input
            value={this.state.value}
            limiter={{
              type: 'byte',
              max: 512
            }}
            onChange={this.handleChange}
          />
        </div>
        <div className="example">
          <Input
            value={this.state.value}
            limiter={{
              type: 'char',
              max: 10
            }}
            onChange={this.handleChange}
          />
        </div>
        <div className="example">
          <Input
            value="test"
            limiter={{
              type: 'char',
              max: 10
            }}
            disabled
          />
        </div>
        <MarkdownElement text={doc}/>
      </div>
    );
  }
}

export default InputDoc;