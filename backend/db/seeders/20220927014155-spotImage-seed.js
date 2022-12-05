'use strict';
const { SpotImage } = require('../models')
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    options.tablename = 'SpotImages'
    await queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        url: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/24/35/5a/ef/caption.jpg?w=1200&h=-1&s=1',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://birdinflight.com/wp-content/uploads/2015/03/hangsondoongcover.jpg',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://travel.mqcdn.com/mapquest/travel/wp-content/uploads/2017/08/GettyImages-670484258-720x480.jpg',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/65/39/ac/caption.jpg?w=1200&h=-1&s=1',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://focusasiatravel.com/wp-content/uploads/2021/07/son-doong.jpg',
        preview: true
      },
      {
        spotId: 6,
        url: 'https://ak-d.tripcdn.com/images/0352h120009dozmte31D2.jpg',
        preview: true
      },
      {
        spotId: 7,
        url: 'https://summerhomes.com/upload/page-photos/285/caves-of-alanya-36514927.webp',
        preview: true
      },
      {
        spotId: 8,
        url: 'https://ff68bf3906044917b58d-1b975fa8368fccfa31871a585d0cfbd4.ssl.cf1.rackcdn.com/wp-content/uploads/2015/06/Thurston-Lava-Tube.jpg',
        preview: true
      },
      {
        spotId: 9,
        url: 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/07/01/28/85.jpg',
        preview: true
      },
      {
        spotId: 10,
        url: 'https://a0.muscache.com/im/pictures/43651c71-880b-462f-86a3-d3a308234792.jpg?im_w=720',
        preview: true
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete(options)
  }
};
