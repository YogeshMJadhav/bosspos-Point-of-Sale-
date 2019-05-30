// Libraries
import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'


import {
  UikContainerVertical,
  UikContainerHorizontal,
  UikLayoutMain
} from '@containers'

// Containers

import Inward from './pages/index';
import Product from '../Products/index'
import ModalForm from '../Products/components/ModalPage';

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
                      component={ Inward }
                      exact
                      path="/inward"
                      strict
                    />
                      <Route path="/inword/product/ModalForm" component={ModalForm} /> 
                    <Redirect to="/inward" />
                  </Switch>
              </UikLayoutMain>
          </UikContainerVertical>
        </UikContainerHorizontal>
      
    )
  }
}
