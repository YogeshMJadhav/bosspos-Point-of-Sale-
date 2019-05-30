// Libraries
import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import Home from './Home'
import DocumentationPage from './DocumentationPage'

export default class SellRoutes extends Component {
  render() {
    return (
      <Switch>
        <Route
          component={ Home }
          exact
          path="/sell"
          strict
        />
        <Route
          component={ DocumentationPage }
          exact
          path="/knowledge/doc"
          strict
        />
        <Redirect to="/sell" />
      </Switch>
    )
  }
}

