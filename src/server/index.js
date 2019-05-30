import * as React from 'react'
import express from 'express'
import { renderToString } from 'react-dom/server'
import { matchRoutes } from 'react-router-config'


import { createStore } from '@redux'
import compression from 'compression'
import routes from './asyncRoutes'

import Markup from './MarkupSSR'

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST) // eslint-disable-line
const server = express()

server
  .disable('x-powered-by')
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Headers', 'access-token')
    next()
  })
  .use(compression())
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', (req, res) => {
    // collect all ssr async, in your components, you can define static getInitialProps methods
    const branch = matchRoutes(routes, req.url)
    const store = createStore()
    const promises = branch.map(({ route, match }) => {
      const { getInitialProps } = route.component
      return typeof getInitialProps === 'function' ? getInitialProps({ store, req, match }) : null
    }).filter(p => p !== null)

    Promise.all(promises)
      .catch((error) => {
        console.error(error) // eslint-disable-line
        res.status(404)
      })
      .then(() => {
        res.status(200).send(renderToString(
          <Markup { ...{
            ssr: true,
            assets,
            store,
            req,
            context: {},
          } }
          />,
        ))
      })
  })

export default server
