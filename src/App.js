import React, { Component } from "react"
import logo from "./logo.svg"
import Clients from "./components/Clients"
import Navbar from "./components/Navbar"
import Home from "./components/Home"
import { BrowserRouter as Router, Route } from "react-router-dom"
import { Container } from "semantic-ui-react"

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Navbar />
          <Container>
            <div>
              <Route exact path="/" component={Home} />
              <Route path="/clients" component={Clients} />
            </div>
          </Container>
        </Router>
      </div>
    )
  }
}

export default App
