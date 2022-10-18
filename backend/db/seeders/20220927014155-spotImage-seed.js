'use strict';
const { SpotImage } = require('../models')
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
    await queryInterface.bulkInsert('SpotImages', [
      {
        spotId: 1,
        url: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/24/35/5a/ef/caption.jpg?w=1200&h=-1&s=1',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://vacationidea.com/pix/img25Hy8R/articles/best-caves-in-usa_g20_mobi.jpg',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://vacationidea.com/pix/img25Hy8R/articles/best-caves-in-usa_g15_mobi.jpg',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://www.kendalldavenport.com/hidden.jpg',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://upload.wikimedia.org/wikipedia/commons/d/dd/Carlsbad_Interior_Formations.jpg',
        preview: true
      },
      {
        spotId: 6,
        url: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Cave_Boxwork_often_call_cratework_when_this_large._WInd_Cave.JPG',
        preview: true
      },
      {
        spotId: 7,
        url: 'https://vacationidea.com/pix/img25Hy8R/articles/t-c3_antelope_canyon_122650_mobi.jpg',
        preview: true
      },
      {
        spotId: 8,
        url: 'https://vacationidea.com/pix/img25Hy8R/articles/t-c5_cave_of_the_winds_122650_mobi.jpg',
        preview: true
      },
      {
        spotId: 9,
        url: 'https://vacationidea.com/pix/img25Hy8R/articles/t-c6_glenwood_caverns_adventure_par_122650_mobi.jpg',
        preview: true
      },
      {
        spotId: 10,
        url: 'https://vacationidea.com/pix/img25Hy8R/articles/best-caves-in-usa_g17_mobi.jpg',
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
    await queryInterface.bulkDelete('SpotImages', null, {})
  }
};
