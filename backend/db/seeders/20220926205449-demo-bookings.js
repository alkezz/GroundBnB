'use strict';
const { Booking } = require('../models')
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
    await queryInterface.bulkInsert('Bookings', [
      {
        spotId: 1,
        userId: 5,
        startDate: new Date('2022-01-01'),
        endDate: new Date('2022-01-08')
      },
      {
        spotId: 2,
        userId: 3,
        startDate: new Date('2022-08-12'),
        endDate: new Date('2022-08-26')
      },
      {
        spotId: 3,
        userId: 4,
        startDate: new Date('2022-02-12'),
        endDate: new Date('2022-02-19')
      },
      {
        spotId: 4,
        userId: 2,
        startDate: new Date('2022-12-18'),
        endDate: new Date('2022-12-28')
      },
      {
        spotId: 5,
        userId: 1,
        startDate: new Date('2022-04-04'),
        endDate: new Date('2022-04-09')
      }
    ])
    // await Booking.create({
    //   spotId: 1,
    //   userId: 5,
    //   startDate: new Date('2022-01-01'),
    //   endDate: new Date('2022-01-08')
    // })

    // await Booking.create({
    //   spotId: 2,
    //   userId: 3,
    //   startDate: new Date('2022-08-12'),
    //   endDate: new Date('2022-08-26')
    // })

    // await Booking.create({
    // spotId: 3,
    // userId: 4,
    // startDate: new Date('2022-02-12'),
    // endDate: new Date('2022-02-19')
    // })

    // await Booking.create({
    //   spotId: 4,
    //   userId: 2,
    //   startDate: new Date('2022-12-18'),
    //   endDate: new Date('2022-12-28')
    // })

    // await Booking.create({
    //   spotId: 5,
    //   userId: 1,
    //   startDate: new Date('2022-04-04'),
    //   endDate: new Date('2022-04-09')
    // })
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Bookings', null, {})
  }
};
