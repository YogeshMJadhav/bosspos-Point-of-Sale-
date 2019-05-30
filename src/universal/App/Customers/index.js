// Libraries
import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'


import {
  UikContainerVertical,
  UikContainerHorizontal,
  UikLayoutMain
} from '@containers'

import * as pages from './pages'

import Chat from './components/Chat'
import Header from '@shared/components/Header'
import Navigation from '@shared/components/Navigation'

const Customers = () => (
  
    
    <UikContainerHorizontal>
      <Navigation />
      <UikContainerVertical>
      <Header />
      <UikLayoutMain>

      {/* router */}
      <Switch>
        <Route
          component={ pages.Profile }
          exact
          path="/customers"
          strict
        />
        <Redirect to="/customers" />
      </Switch>

      {/* <Chat /> */}
      </UikLayoutMain>

      </UikContainerVertical>
    </UikContainerHorizontal>
  
)

export default Customers
