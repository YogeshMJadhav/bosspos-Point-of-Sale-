// Libraries
import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'


import {
  UikContainerVertical,
  UikContainerHorizontal,
  UikLayoutMain
} from '@containers'

// Containers

import Vendor from './pages/index';


//import Navigation from './components/Navigation'
import Header from '@shared/components/Header'
import Navigation from '@shared/components/Navigation'

export default class Products extends Component {
  render() {
    return (
        <UikContainerHorizontal>
          <Navigation />
          <UikContainerVertical>
            {/* <Header /> */}
              <UikLayoutMain>
                  <Switch>
                    <Route
                      component={ Vendor }
                      exact
                      path="/vendor"
                      strict
                    />
                    <Redirect to="/vendor" />
                  </Switch>
              </UikLayoutMain>
          </UikContainerVertical>
        </UikContainerHorizontal>
      
    )
  }
}
