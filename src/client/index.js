import { ConnectedRouter } from 'react-router-redux'
import * as React from 'react'
import { Provider } from 'react-redux'
import { hydrate } from 'react-dom'
import { createStore, initialState } from '@redux'

import createHistory from 'history/createBrowserHistory'
import App from '../universal/App'


// eslint-disable-next-line
const initStore = window ? window.__STORE__ : initialState

const history = createHistory()
const store = createStore(initStore, history)


hydrate(
  <Provider store={ store }>
    <ConnectedRouter history={ history }>
      <App history={ history } />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
)

if (module.hot) {
  module.hot.accept('../universal/App', () => {
    hydrate(
      <Provider store={ store }>
        <ConnectedRouter history={ history }>
          <App history={ history } />
        </ConnectedRouter>
      </Provider>,
      document.getElementById('root'),
    )
  })
}
