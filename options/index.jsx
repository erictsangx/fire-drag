import ReactDOM from 'react-dom';
import React from 'react';
import RadioOption from './RadioOption';
import NumberOption from './NumberOption';
import { saveOptions, loadOptions } from '../lang';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    loadOptions().then((options) => {
      this.setState(options);
    });
  }

  handleChange(key, value) {
    const options = this.state;
    const newOptions = { ...options, [key]: value };
    this.setState(newOptions);
    saveOptions(newOptions);
  }

  render() {
    const { textActive, linkActive, imageActive, threshold } = this.state;
    return (
      <div>
        <RadioOption
          label="Search texts in"
          active={textActive}
          change={(value) => {
            this.handleChange('textActive', value);
          }}
        />
        <RadioOption
          label="Open links in"
          active={linkActive}
          change={(value) => {
            this.handleChange('linkActive', value);
          }}
        />
        <RadioOption
          label="Open images in"
          active={imageActive}
          change={(value) => {
            this.handleChange('imageActive', value);
          }}
        />
        <NumberOption
          label="Ignore if the distance of dragging is less than"
          value={threshold}
          change={(value) => {
            this.handleChange('threshold', value);
          }}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
