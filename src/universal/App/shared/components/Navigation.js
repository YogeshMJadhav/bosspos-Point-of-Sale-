import * as React from 'react'

import { NavLink } from 'react-router-dom'

//import * as images from '@exampleAssets'

import {

  UikNavLinkTwo,
  UikNavLinkTwoContainer,
  UikTopBar,
  UikTopBarSection,
  Uikon,
  UikDivider,
} from '@components'

import {
  UikNavPanel,
  UikContainerVertical,
  UikScrollArea,
} from '@containers'

import { Icon } from 'antd'

const menuLinks = [
  {
    text: 'Dashboard',
    icon: (
      <Icon type="project" theme="filled" />

    ),
    to: '/'
  },
  {
    text: 'Sell',
    icon: (
      <Uikon>
        money_round
      </Uikon>
    ),
    to: '/sell'
  },
  {
    text: 'Receipts',
    icon: (
      <Uikon>
        inbox_paper_round
      </Uikon>
    ),
    to: '/receipts'
  },
  {
    text: 'Expenses',
    icon: (
      <Uikon>
        money_round
      </Uikon>
    ),
    to: '/expenses'
  },
  {
    text: 'Products',
    icon: (
      <Uikon>
        container
      </Uikon>
    ),
    to: '/products'
  },  
  {
    text: 'Customers',
    icon: (
      <Uikon>
        profile_round
      </Uikon>
    ),
    to: '/customers'
  },
  {
    text: 'Taxes',
    icon: (
      <Icon type="project" theme="filled" />
    ),
    to: '/taxes'
  },
  {
    text: 'Product Type',
    icon: (
      <Uikon>
        container
      </Uikon>
    ),
    to: '/productType'
  },
  {
    text: 'Payment Type',
    icon: (
      <Uikon>
        money_round
      </Uikon>
    ),
    to: '/paymentType'
  },
  {
    text: 'User Type',
    icon: (
      <Icon type="team" />
    ),
    to: '/UserType'
  },
  {
    text: 'Vendor',
    icon: (
      <Uikon>
        profile_round
      </Uikon>
    ),
    to: '/vendor'
  },
  {
    text: 'Inward Stock',
    icon: (
      <Icon type="shopping-cart" />
    ),
    to: '/inward'
  },
  {
    text: 'Billing',
    icon: (
      <Icon type="money-collect" />
    ),
    to: '/billing'
  },
  {
    text: 'User',
    icon: (
      <Uikon>
        profile_round
      </Uikon>
    ),
    to: '/user'
  },
  {
    text: 'Settings',
    icon: (
      <Icon type="setting" theme="filled" />
    ),
    to: '/settings' 
  },
  {
    text: 'Login',
    icon: (
      <Uikon>
        profile_round
      </Uikon>
    ),
    to: '/login'
  }

]


const AnalyticsNavigation = () => (
  <UikNavPanel>
    <UikContainerVertical>

      <UikTopBar center>
        <UikTopBarSection>
          <Uikon>
              home
          </Uikon>
        </UikTopBarSection>
      </UikTopBar>

      <UikScrollArea>
        {/* <UikNavUser
          imgUrl={ images.a21 }
          name="Martha Blair"
          textTop="Art Director"
        /> */}
        <UikDivider />
        <UikNavLinkTwoContainer>
          {
            
            menuLinks.map(link => (
              <UikNavLinkTwo
                key={ link.text }
                //className={ link.text === 'Dashboard' ? 'active' : null }
                activeClassName="active"
                Component={ NavLink }
                exact
                highlighted
                icon={ link.icon }
                to={ `${link.to}` }
              >
                {link.text}
              </UikNavLinkTwo>
              
            ))
          }
        </UikNavLinkTwoContainer>

  
      </UikScrollArea>
    </UikContainerVertical>
  </UikNavPanel>

)

export default AnalyticsNavigation
