import React from 'react'
import * as images from '@exampleAssets'

export default [
  {
    title: 'Getting Started',
    description: 'Last edited 2 days ago by Eugene Jenkins',
    isAdmin: true,
    icon: {
      color: 'blue',
      name: 'love',
    },
    users: [
      {
        imgUrl: images.a01,
        actionIcon: (
          <img
            alt="like"
            src={ images.ua02 }
          />
        ),
      },
      {
        imgUrl: images.a03,
        actionIcon: (
          <img
            alt="comment"
            src={ images.ua01 }
          />
        ),
      },
    ],
  },
  {
    title: 'Responsive Design',
    description: 'Last edited 3 days ago by Erik Page',
    icon: {
      color: 'violet',
      name: 'image_picture',
    },
    users: [
      {
        imgUrl: images.a04,
        actionIcon: (
          <img
            alt="comment"
            src={ images.ua01 }
          />
        ),
      },
      {
        imgUrl: images.a01,
        actionIcon: (
          <img
            alt="comment"
            src={ images.ua01 }
          />
        ),
      },
    ],
  },
  {
    title: 'Layout & Positioning Basics',
    description: 'Last edited a week ago by Joana Jenkins',
    icon: {
      color: 'red',
      name: 'container',
    },
    users: [
      {
        imgUrl: images.a03,
        actionIcon: (
          <img
            alt="comment"
            src={ images.ua01 }
          />
        ),
      },
      {
        imgUrl: images.a02,
        actionIcon: (
          <img
            alt="comment"
            src={ images.ua01 }
          />
        ),
      },
    ],
  },
  {
    title: 'Photoshop Fundamentals',
    description: 'Last edited a week ago by Todd Singleton',
    icon: {
      color: 'green',
      name: 'edit',
    },
    isAdmin: true,
    users: [
      {
        imgUrl: images.a04,
        actionIcon: (
          <img
            alt="like"
            src={ images.ua02 }
          />
        ),
      },
      {
        imgUrl: images.a02,
        actionIcon: (
          <img
            alt="comment"
            src={ images.ua01 }
          />
        ),
      },
    ],
  },
  {
    title: 'Sketch Fundamentals',
    description: 'Last edited a week ago by Erik Page',
    icon: {
      color: 'orange',
      name: 'gallery_grid_view',
    },
    users: [
      {
        imgUrl: images.a03,
        actionIcon: (
          <img
            alt="comment"
            src={ images.ua01 }
          />
        ),
      },
      {
        imgUrl: images.a01,
        actionIcon: (
          <img
            alt="like"
            src={ images.ua02 }
          />
        ),
      },
    ],
  },
  {
    title: 'Advanced Sketch',
    description: 'Last edited a week ago by Myrtie Greer',
    icon: {
      color: 'violet',
      name: 'image_picture',
    },
    users: [
      {
        imgUrl: images.a03,
        actionIcon: (
          <img
            alt="like"
            src={ images.ua02 }
          />
        ),
      },
      {
        imgUrl: images.a02,
        actionIcon: (
          <img
            alt="like"
            src={ images.ua02 }
          />
        ),
      },
    ],
  },
  {
    title: 'How to setup 1170px grid in Sketch',
    description: 'Last edited a week ago by Myrtie Greer',
    icon: {
      name: 'multitasking',
    },
    users: [
      {
        imgUrl: images.a02,
        actionIcon: (
          <img
            alt="like"
            src={ images.ua02 }
          />
        ),
      },
    ],
  },
]
