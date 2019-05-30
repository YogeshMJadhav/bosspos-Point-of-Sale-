// Libraries
import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

// Containers

import {
  UikContainerVertical,
  UikContainerHorizontal,
  UikLayoutMain
} from '@containers'
import Navigation from '@shared/components/Navigation'
import Expenses from './pages/index';
// import Header from './components/Header'


const Docs = () => (
  <UikContainerHorizontal>
  <Navigation />
  <UikContainerVertical>
    {/* <Header /> */}
      <UikLayoutMain>
          <Switch>
            <Route
              component={ Expenses }
              exact
              path="/expenses"
              strict
            />
            <Redirect to="/expenses" />
          </Switch>
      </UikLayoutMain>
  </UikContainerVertical>
</UikContainerHorizontal>

)

export default Docs
