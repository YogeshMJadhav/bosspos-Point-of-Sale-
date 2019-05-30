// Libraries
import React, {Component} from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import {
  UikContainerVertical,
  UikContainerHorizontal,
  UikLayoutMain,
} from '@containers'

import Header1 from './components/header'

// components
import ShopDetails from './pages/shopDetails'
import Measurement from './pages/Measurement'
import Menus from './pages/Menus'
import Header from '@shared/components/Header'
import Navigation from '@shared/components/Navigation'

export default class Products extends Component {
  render() {
    return (
        <UikContainerHorizontal>
          <Navigation />
          <UikContainerVertical>
            <Header />
              <UikLayoutMain>
                <div>
               <Header1/>
                  <Switch>
                    <Route path="/shop-details" component={ShopDetails}  /> 
                    <Route path="/measurement" component={Measurement} /> 
                    <Route path="/menus" component={Menus} /> 
                  </Switch>
                </div>
              </UikLayoutMain>
          </UikContainerVertical>
        </UikContainerHorizontal>
    )
  }
}