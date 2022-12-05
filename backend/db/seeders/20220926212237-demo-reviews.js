'use strict';
const { Review } = require('../models')
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
    options.tablename = 'Reviews'
    await queryInterface.bulkInsert(options, [
      {
        spotId: 5,
        userId: 1,
        review: 'BEDBUGS EVERYWHERE!!! Great location, 3 Stars',
        stars: 3
      },
      {
        spotId: 1,
        userId: 6,
        review: 'sadsdGVCX',
        stars: 4
      },
      {
        spotId: 1,
        userId: 7,
        review: 'rfgvesawreg',
        stars: 3
      },
      {
        spotId: 1,
        userId: 8,
        review: 'dsfcax',
        stars: 5
      },
      {
        spotId: 1,
        userId: 2,
        review: 'Clean as can be, Alien living in attic, take that as you will',
        stars: 4
      },
      {
        spotId: 3,
        userId: 2,
        review: 'uiorfjgeiruoe',
        stars: 3
      },
      {
        spotId: 2,
        userId: 3,
        review: "It's New Yowk baby IM WALKIN HERE BADA BING",
        stars: 5
      },
      {
        spotId: 1,
        userId: 3,
        review: "oiperfkwagepag",
        stars: 2
      },
      {
        spotId: 3,
        userId: 4,
        review: 'Rain everywhere, what more could you ask for',
        stars: 5
      },
      {
        spotId: 5,
        userId: 4,
        review: 'wfsopk;e[a"ewf',
        stars: 4
      },
      {
        spotId: 4,
        userId: 5,
        review: "They're in the walls, They're in the walls, The",
        stars: 5
      },
      {
        spotId: 2,
        userId: 5,
        review: 'pdapsodaspodas',
        stars: 2
      },
      {
        spotId: 6,
        userId: 1,
        review: 'MY EYES',
        stars: 3
      },
      {
        spotId: 7,
        userId: 2,
        review: 'B-E-A-UTIFUL location',
        stars: 5
      },
      {
        spotId: 8,
        userId: 3,
        review: 'great spot',
        stars: 4
      },
      {
        spotId: 9,
        userId: 4,
        review: 'I hear them wherever I go, someone please help me',
        stars: 5
      },
      {
        spotId: 10,
        userId: 5,
        review: 'AHHHHHHHHHHHHHHH',
        stars: 1
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
