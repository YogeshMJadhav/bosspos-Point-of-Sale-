import * as React from 'react'
// import { connect } from 'react-redux'
import {
  Route,
  Switch,
  Redirect,
  withRouter,
} from 'react-router-dom'

import {
  UikPageFade,
} from '@containers'

import cls from './App.scss'

import routeMap from './routeMap'

// @flow
type AppProps = {
  location: Object
}
@withRouter
export default class App extends React.PureComponent<AppProps> {
  constructor(){
    super();
   this.state = {
    loading:true
   }
  }
  
  componentDidMount = () => {
    this.setState({loading:false})
  }
  render() {
    const { location, location: { pathname } } = this.props
    const key = pathname.slice('/')[0]
    return (
      <UikPageFade className={ cls.app }>
       {this.state.loading ? 
        //   <ReactLoading type="spin" color="#00FFFF" height='20%' width='20%'
        //                   style={{marginLeft:500,marginTop:150,marginButtom:600,marginRight:500}}
                          
        //  /> 
        <center><img   src={require('../exampleAssets/loading.gif')} /></center>
        :
        <Switch
          key={ key }
          location={ location }
        >
          <Route
            component={ routeMap.Dashboard }
            path="/dashboard"
          />
          <Route
            component={ routeMap.Sell }
            path="/sell"
          />
          <Route
            component={ routeMap.Receipts }
            path="/receipts"
          />
          <Route
            component={ routeMap.Expenses }
            path="/expenses"
          />
          <Route
            component={ routeMap.Products }
            path="/products"
          />
          <Route
            component={ routeMap.Customers }
            path="/customers"
          />
           <Route
            component={ routeMap.Taxes }
            path="/taxes"
          />
          <Route
            component={ routeMap.ProductType }
            path="/productType"
          />
          <Route
            component={ routeMap.PaymentType }
            path="/paymentType"
          />
          <Route
            component={ routeMap.UserType }
            path="/userType"
          />
           <Route
            component={ routeMap.Vendor }
            path="/vendor"
          />
          <Route
            component={ routeMap.Inword }
            path="/inward"
          />
           <Route
            component={ routeMap.Billing }
            path="/billing"
          />
           <Route
            component={ routeMap.User }
            path="/user"
          />
          <Route
            component={ routeMap.Login }
            path="/login"
          />
          <Route
            component={ routeMap.Registration }
            path="/registration"
          />
           <Route
            component={ routeMap.Settings }
            path="/"
          />
          
          <Redirect to="/" />
        </Switch>}
      </UikPageFade>
    )
  }
}
