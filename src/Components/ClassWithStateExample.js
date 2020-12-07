import React, { Component } from 'react';

class ClassWithStateExample extends Component {
  constructor(props) {
    super(props);

    /**
     * We initialize state and class variables here
     */
    this.state = {
      text: 'Hello there!',
      visits: 0,
    };
  }

  render() {
    /**
     * We construct here the portion of the html that will be rendered
     */
    const { text, visits } = this.state;

    return (
      <div className="App-example">
        <p>{text}</p>
        <span>
          Visits:
          {visits}
        </span>
      </div>
    );
  }
}

export default ClassWithStateExample;
