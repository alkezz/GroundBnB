'use strict';
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
    options.tablename = 'ReviewImages'
    await queryInterface.bulkInsert(options, [
      {
        reviewId: 1,
        url: 'www.wrfedwsedfwsedf.com'
      },
      {
        reviewId: 2,
        url: 'www.opasdsoapd.com'
      },
      {
        reviewId: 3,
        url: 'www.dpofsdo.com'
      },
      {
        reviewId: 4,
        url: 'www.sopdaso.com'
      },
      {
        reviewId: 5,
        url: 'www.kcdksps.com'
      },
      {
        reviewId: 6,
        url: 'www.erftg.com'
      },
      {
        reviewId: 7,
        url: 'www.sdq3ewrf.com'
      },
      {
        reviewId: 8,
        url: 'www.tjny.com'
      },
      {
        reviewId: 9,
        url: 'www.ytjesd.com'
      },
      {
        reviewId: 10,
        url: 'www.nfbmasd.com'
      }
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
