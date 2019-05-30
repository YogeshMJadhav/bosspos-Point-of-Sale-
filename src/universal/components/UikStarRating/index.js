import * as React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import Uikon from '../Uikon'

import cls from './star-rating.scss'

const rates = [
  1,
  2,
  3,
  4,
  5,
]

const UikStarRating = ({
  rating = 5,
  className,
  ...rest
}) => (
  <div
    className={ classnames(cls.wrapper, className) }
    { ...rest }
  >
    {
      rates.map(r => (r <= rating ? (
        <Uikon
          key={ r }
          className={ cls.fill }
        >
          star_fill
        </Uikon>
      ) : (
        <Uikon key={ r }>
          star
        </Uikon>
      )))
    }
  </div>
)

UikStarRating.propTypes = {
  className: PropTypes.string,
  rating: PropTypes.number,
}

UikStarRating.defaultProps = {
  className: null,
  rating: 5,
}

export default UikStarRating
