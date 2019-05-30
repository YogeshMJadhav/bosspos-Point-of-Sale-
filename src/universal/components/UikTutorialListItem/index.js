import * as React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import UikAvatar from '../UikAvatar'
import UikonText from '../UikonText'
import UikStarRating from '../UikStarRating'

import cls from './tutorial-list-item.scss'

const UikTutorialListItem = ({
  duration,
  liked,
  likes,
  comments,
  title,
  description,
  imgUrl,
  className,
  author,
  rating,
  Component,
  ...rest
}) => (
  <Component
    className={ classnames(cls.wrapper, className) }
    { ...rest }
  >
    <div
      className={ cls.cover }
      style={ {
        backgroundImage: `url(${imgUrl})`,
      } }
    />
    <div className={ cls.content }>
      <h3>
        {title}
      </h3>
      <p>
        {description}
      </p>
      <div className={ cls.meta }>
        <UikAvatar
          imgUrl={ author.imgUrl }
          name={ author.name }
          textTop="Created By"
        />
        <UikonText icon="clock">
          {duration}
        </UikonText>
      </div>
    </div>
    <div className={ cls.extra }>
      <div>
        <UikonText
          highlight={ liked }
          icon={ liked ? 'love-fill' : 'love' }
        >
          {likes}
        </UikonText>
        <UikonText icon="message">
          {comments}
        </UikonText>
      </div>
      { rating && <UikStarRating rating={ rating } /> }
    </div>
  </Component>
)

UikTutorialListItem.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imgUrl: PropTypes.string.isRequired,
  author: PropTypes.instanceOf(Object).isRequired,
  duration: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  rating: PropTypes.number,
  liked: PropTypes.bool,
  likes: PropTypes.number,
  comments: PropTypes.number,
  Component: PropTypes.any, // eslint-disable-line
}

UikTutorialListItem.defaultProps = {
  className: null,
  duration: null,
  rating: null,
  liked: null,
  likes: 0,
  comments: 0,
  Component: 'div',
}

export default UikTutorialListItem
