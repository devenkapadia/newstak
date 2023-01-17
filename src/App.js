import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  ps = 4
  apiKey="9004f7d9121d4f13b4d22005b2a69b87"
  // apiKey=process.env.NEWS_APIKEY
  state = {
    progress: 0
  }
  setProgress = (prg) => {
    this.setState({ progress: prg })
  }
  render() {
    return (
      <Router>
        <div>
          <LoadingBar color='#f11946' progress={this.state.progress} />
          <Navbar />
          <Switch>
            <Route exact path="/"><News setProgress={this.setProgress} apiKey={this.apiKey} key="general" pageSize={this.ps} country='in' category='general' /></Route>
            <Route exact path="/business"><News setProgress={this.setProgress} apiKey={this.apiKey} key="business" pageSize={this.ps} country='in' category='business' /></Route>
            <Route exact path="/entertainment"><News setProgress={this.setProgress} apiKey={this.apiKey} key="entertainment" pageSize={this.ps} country='in' category='entertainment' /></Route>
            <Route exact path="/health"><News setProgress={this.setProgress} apiKey={this.apiKey} key="health" pageSize={this.ps} country='in' category='health' /></Route>
            <Route exact path="/science"><News setProgress={this.setProgress} apiKey={this.apiKey} key="science" pageSize={this.ps} country='in' category='science' /></Route>
            <Route exact path="/sports"><News setProgress={this.setProgress} apiKey={this.apiKey} key="sports" pageSize={this.ps} country='in' category='sports' /></Route>
            <Route exact path="/technology"><News setProgress={this.setProgress} apiKey={this.apiKey} key="technology" pageSize={this.ps} country='in' category='technology' /></Route>
          </Switch>
        </div>
      </Router>
    )
  }
}

// api key 9004f7d9121d4f13b4d22005b2a69b87