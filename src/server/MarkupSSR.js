import * as React from 'react'
import { StaticRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import App from '../universal/App'

// @flow
type MarkupProps = {
  assets: Object,
  store: Object,
  context: Object,
  req: Object,
  ssr?: Boolean,
}

const title = 'BossPos'
const description = 'Worlds leading POS system and beyond'


const Markup = ({
  assets,
  store,
  context,
  req,
  ssr,
}: MarkupProps) => (
  <html lang="en">
    <head>
      <meta
        content="IE=edge"
        httpEquiv="X-UA-Compatible"
      />
      <meta charSet="utf-8" />
      <title>
        {title}
      </title>
      <meta content={ description } name="description" />

      <meta content={ title } property="og:title" />
      <meta content="website" property="og:type" />
      <meta content="http://preview.janlosert.com" property="og:url" />
      <meta content="http://preview.janlosert.com/OGDocumentation.jpg" property="og:image" />
      <meta content={ description } property="og:description" />

      <meta
        content="width=device-width, initial-scale=1" name="viewport"
      />
      {(assets.client && assets.client.css && (
      <link
        href={ `${assets.client.css}` }
        rel="stylesheet"
      />
      )) }
      {(assets.vendor && assets.vendor.js && (
      <script
        defer
        src={ `${assets.vendor.js}` }
      />
      )) }
      {
        process.env.NODE_ENV === 'production'
          ? (
            <script
              defer
              src={ `${assets.client.js}` }
            />
          )
          : (
            <script
              crossOrigin="true"
              defer
              src={ `${assets.client.js}` }
            />
          )
      }
    </head>
    <body>
      <link
        async
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,900"
        rel="stylesheet"
      />
      <div id="root">
        {ssr ? (
          <Provider store={ store }>
            <StaticRouter
              context={ context }
              location={ req.url }
            >
              <App />
            </StaticRouter>
          </Provider>
        ) : null}
      </div>
    </body>
  </html>
)

Markup.defaultProps = {
  ssr: false,
}

export default Markup
