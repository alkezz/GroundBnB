'use strict';

const { query } = require("express");
const { User, Spot } = require('../models')

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
    await queryInterface.bulkInsert('Spots', [
      {
        ownerId: 1,
        address: "12345 Disney Lane",
        city: "San Francisco",
        state: "California",
        country: "United States of America",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "App Academy",
        description: "Place where web developers are created",
        price: 123.45
      },
      {
        ownerId: 2,
        address: "932 Efwujiopw Way",
        city: "New York City",
        state: "New York",
        country: "United States of America",
        lat: 40.7831674,
        lng: 73.9712639,
        name: "Interpol",
        description: "egrrgedergdergf",
        price: 40.25
      },
      {
        ownerId: 3,
        address: "3462 Bluejay Lane",
        city: "Seattle",
        state: "Washington",
        country: "United States of America",
        lat: 67.4236363,
        lng: 45.8420395,
        name: "Place2Be",
        description: "YES!",
        price: 999.99
      },
      {
        ownerId: 4,
        address: "1024 Cherry Street",
        city: "Langley Falls",
        state: "Virginia",
        country: "United States of America",
        lat: 93.7328923,
        lng: 32.2382303,
        name: "The Smith Residence",
        description: "Good Morning USA",
        price: 150.10
      },
      {
        ownerId: 5,
        address: "31 Spooner Street",
        city: "Quahog",
        state: "Rhode Island",
        country: "United States of America",
        lat: 23.4523271,
        lng: 45.1947320,
        name: "The Griffins",
        description: "YES",
        price: 80.45
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Spots', null, {});
  }
};
