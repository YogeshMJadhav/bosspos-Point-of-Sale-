// Libraries
import * as React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import Home from './Home'


import {
  UikContainerVertical,
  UikContainerHorizontal,
  UikLayoutMain,
} from '@containers'


// components
import Header from '@shared/components/Header'
import Navigation from '@shared/components/Navigation'

const Dashboard = () => (
  <UikContainerHorizontal>
    <Navigation />

    <UikContainerVertical>
      <Header />
      <UikLayoutMain>


        <Switch>
          <Route
            component={ Home }
            exact
            path="/dashboard"
            strict
          />
          <Redirect to="/dashboard" />
        </Switch>

      </UikLayoutMain>
    </UikContainerVertical>
  </UikContainerHorizontal>
)

export default Dashboard
