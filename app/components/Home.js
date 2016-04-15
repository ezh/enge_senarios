import React from 'react'

import Scenarios from './Scenarios'

import helpers from '../utils/helpers'

class Home extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      scenarios: []
    }
  }

  render() {
    console.log('Home.props', this.props)
    return (
      <div>
      <h2 className="text-center">
      Scenarios
      </h2>
      <Scenarios username="dmaczka" {...this.props} />
      </div>
    )
  }
};

export default Home;

