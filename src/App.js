import React, { Component } from "react"
import logo from "./logo.svg"
import Clients from "./components/Clients"
import NewClient from "./components/NewClient"
import ClientPage from "./components/ClientPage"
import Navbar from "./components/Navbar"
import Home from "./components/Home"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { Container } from "semantic-ui-react"

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Navbar />
          <Container>
            <div>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/clients" component={Clients} />
                <Route exact path="/clients/new" component={NewClient} />
                <Route path="/clients/:id" component={ClientPage} />
              </Switch>
            </div>
          </Container>
        </Router>
      </div>
    )
  }
}

export default App
