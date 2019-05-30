import * as React from 'react'
import classnames from 'classnames'

import cls from './emoji-headline.scss'
import { UikContentItem } from '@containers'

// @flow

type UikEmojiHeadlineProps = {
  className?: String,

  /**
   * Unicode emoji, such as 😌
   * http://www.unicode.org/emoji/charts/full-emoji-list.html
   */
  emoji?: React.node,

  /**
   * title
   */
  title?: React.node,

  /**
   * description
   */
  description?: React.node,
}

const UikEmojiHeadline = ({
  emoji,
  title,
  description,
  className,
  ...rest
}: UikEmojiHeadlineProps) => (
  <UikContentItem
    className={ classnames(cls.wrapper, className) }
    { ...rest }
  >
    { emoji && (
      <div className={ cls.emojiBox }>
        {emoji}
      </div>
    )}
    <div className={ cls.content }>
      { title && (
        <h2>
          {title}
        </h2>
      )}
      {description && (
        <p>
          {description}
        </p>
      )}
    </div>
  </UikContentItem>
)

UikEmojiHeadline.defaultProps = {
  className: null,
  emoji: null,
  title: null,
  description: null,
}

export default UikEmojiHeadline
