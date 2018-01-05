# Input


## Usage
```
class InputTest extends React.Component {
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
      <Input
        value={this.state.value}
        limiter={{
          type: 'byte',
          max: 512
        }}
        onChange={this.handleChange}
      />
    );
  }
}
```

## API

### props
|name    | type   | default | description |
|--------|--------|---------|-------------|
|value | string |  | 输入框的值 |
|limiter | Object |  | 字节倒数限制 |

