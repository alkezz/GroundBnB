'use strict';
const { Review } = require('../models')
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
    await Review.create({
      spotId: 5,
      userId: 1,
      review: 'BEDBUGS EVERYWHERE!!! Great location, 3 Stars',
      stars: 3
    })
    await Review.create({
      spotId: 4,
      userId: 2,
      review: 'Clean as can be, Alien living in attic, take that as you will',
      stars: 4
    })
    await Review.create({
      spotId: 2,
      userId: 3,
      review: "It's New Yowk baby IM WALKIN HERE BADA BING",
      stars: 5
    })
    await Review.create({
      spotId: 3,
      userId: 4,
      review: 'Rain everywhere, what more could you ask for',
      stars: 5
    })
    await Review.create({
      spotId: 1,
      userId: 5,
      review: 'No where to drink',
      stars: 1
    })
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Reviews', null, {})
  }
};
