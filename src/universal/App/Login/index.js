// Libraries
import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'


import {
  UikContainerVertical,
  UikContainerHorizontal,
  UikLayoutMain
} from '@containers'

// Containers

import Login from './pages/index';
import Registration from './components/Registration';


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
                    <Route path="/login" component={Login} exact /> 
                    <Route path="/login/registration" component={Registration} /> 
                  </Switch>
              </UikLayoutMain>
          </UikContainerVertical>
        </UikContainerHorizontal>
      
    )
  }
}
