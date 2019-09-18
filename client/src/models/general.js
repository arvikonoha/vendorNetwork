import uuid from 'uuid'

const general = {
  services: [{
      uuid: uuid.v4(),
      title: 'Photographer',
      source: './images/card13.jpg',
      description: 'Photography and Videography services'
    },
    {
      uuid: uuid.v4(),
      title: 'Musical',
      source: './images/card12.jpg',
      description: 'Sound systems,DJs and related services'
    },
    {
      uuid: uuid.v4(),
      title: 'Caterer',
      source: './images/card9.jpg',
      description: 'Catering and food delivery related services'
    },
    {
      uuid: uuid.v4(),
      title: 'Decorator',
      source: './images/card8.jpg',
      description: 'Decorations and lighting services'
    }
  ]
}

export default general