import React, { Component } from 'react'

import './App.css'

import SideBar from './components/SideBar'


class App extends Component {
  render() {
    return (
      <div className="text-center">
      <SideBar/>
      <div className="main-content">
        {this.props.children}     
      </div>
    </div>
    );
  }
}

export default App;
