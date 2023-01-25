'use strict';
const { Booking } = require('../models')
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
    options.tableName = 'Bookings'
    await queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 11,
        startDate: new Date('2022-01-01'),
        endDate: new Date('2022-01-08')
      },
      {
        spotId: 2,
        userId: 11,
        startDate: new Date('2022-08-12'),
        endDate: new Date('2022-08-26')
      },
      {
        spotId: 3,
        userId: 11,
        startDate: new Date('2022-02-12'),
        endDate: new Date('2022-02-19')
      },
      {
        spotId: 4,
        userId: 11,
        startDate: new Date('2022-12-18'),
        endDate: new Date('2022-12-28')
      },
      {
        spotId: 5,
        userId: 11,
        startDate: new Date('2022-04-04'),
        endDate: new Date('2022-04-09')
      },
      {
        spotId: 6,
        userId: 11,
        startDate: new Date('2022-11-04'),
        endDate: new Date('2022-11-09')
      },
      {
        spotId: 7,
        userId: 11,
        startDate: new Date('2022-03-04'),
        endDate: new Date('2022-03-09')
      },
      {
        spotId: 8,
        userId: 11,
        startDate: new Date('2022-07-04'),
        endDate: new Date('2022-07-09')
      },
      {
        spotId: 9,
        userId: 11,
        startDate: new Date('2022-09-04'),
        endDate: new Date('2022-09-09')
      },
      {
        spotId: 10,
        userId: 11,
        startDate: new Date('2022-05-04'),
        endDate: new Date('2022-05-09')
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
    options.tableName = 'Bookings'
    await queryInterface.bulkDelete(options)
  }
};
