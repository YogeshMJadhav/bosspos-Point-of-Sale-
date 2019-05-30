export default {
  jsx: `import * as React from 'react'
import classNames from 'classnames'
import cls from './checkbox.scss'

// @flow
type UikCheckboxProps = {
  className?: ?String,
  label?: React.node,
}

const UikCheckbox = ({
  label,
  className,
  ...rest
}: UikCheckboxProps) => (
  <label className={ classNames(cls.wrapper, className) }>
    <input
      className={ cls.checkbox }
      type="checkbox"
      { ...rest }
    />
    <span className={ cls.label }>
      <span className={ cls.checkIcon } />
      {label}
    </span>
  </label>
)

UikCheckbox.defaultProps = {
  label: null,
  className: null,
}

export default UikCheckbox`,
  json: `{
  "_id": "580e63fc8c9a982ac9b8b745" 
  "lastUpdated": "2016-10-24T19:42:38.929Z",
  "createdOn": "2016-10-24T19:41:48.349Z",
  "name": "Blog Posts",
  "slug": "post",
  "singularName": "Blog Post",
  "fields": [
    {
      "id": "7f62a9781291109b9e428fb47239fd35",
      "editable": true,
      "required": false,
      "type": "RichText",
      "slug": "post-body",
      "name": "Post Body"
    },
    {
      "validations": {
        "singleLine": false
      },
      "id": "ac4ffead755a78c710c44042f528b073",
      "helpText": "A summary of the blog post",
      "editable": true,
      "required": false,
      "type": "PlainText",
      "name": "Post Summary"
    },
    {
      "id": "ba1cfbdaa6b38b8e95e9b5063da8a5bd",
      "editable": true,
      "required": false,
      "type": "ImageRef",
      "name": "Main Image"
    }
  ]
}`,
}
