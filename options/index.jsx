import ReactDOM from "react-dom";
import React from "react";
import RadioOption from "./RadioOption.jsx";
import NumberOption from "./NumberOption.jsx";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            textActive: true,
            linkActive: false,
            threshold: 100
        };
    }

    // componentDidMount() {
    //     const gettingItem = browser.storage.local.get("options");
    //     gettingItem.then(({options}) => {
    //         if (Object.keys(options).length > 0) {
    //             this.setState('options', options)
    //         } else {
    //             const {options} = this.state;
    //             browser.storage.local.set(options);
    //         }
    //     })
    // }

    handleChange(key, value) {
        const options = this.state;
        this.setState({...options, [key]: value});
    }

    render() {
        const {textActive, linkActive, threshold} = this.state;
        return (
            <div>
                <RadioOption label="Search texts in" active={textActive} change={value => {
                    this.handleChange('textActive', value);
                }}/>
                <RadioOption label="Open links in" active={linkActive} change={value => {
                    this.handleChange('linkActive', value);
                }}/>
                <NumberOption label="Ignore if the distance of dragging is less than"
                              value={threshold}
                              change={(value) => {
                                  this.handleChange('threshold', value)
                              }}
                />
            </div>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));