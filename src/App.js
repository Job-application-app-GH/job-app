import React from 'react'
import {NameCards, Chats, Header, FooterButtons} from './components'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import './styles/App.css'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/chat">
            <Header />
            <Chats />
          </Route>
          <Route path="/">
            <Header />
            <NameCards />
          </Route>
        </Switch>
        <FooterButtons />
      </Router>
    </div>
  )
}

export default App
