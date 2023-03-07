'use strict';

const { query } = require("express");
const { User, Spot } = require('../models')
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Spots'
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert(options, [
      {
        ownerId: 1,
        address: "123 Main St",
        city: "New York",
        state: "NY",
        country: "USA",
        lat: 40.7128,
        lng: -74.0060,
        name: "Luxury Apartments at 123 Main",
        description: "Spacious apartments with stunning views of the city.",
        price: 5000
      },
      {
        ownerId: 2,
        address: "456 Park Ave",
        city: "New York",
        state: "New York",
        country: "USA",
        lat: 40.7644,
        lng: -73.9734,
        name: "The Park Avenue Residences",
        description: "Elegant apartments with modern amenities in a prime location.",
        price: 4500
      },
      {
        ownerId: 3,
        address: "789 Madison Ave",
        city: "New York",
        state: "New York",
        country: "USA",
        lat: 40.7736,
        lng: -73.9654,
        name: "Madison Square Luxury Apartments",
        description: "High-end apartments with breathtaking views of the city.",
        price: 6000
      },
      {
        ownerId: 4,
        address: "1010 Lexington Ave",
        city: "New York",
        state: "New York",
        country: "USA",
        lat: 40.7769,
        lng: -73.9612,
        name: "The Lexington",
        description: "Spacious and stylish apartments in a trendy neighborhood.",
        price: 4000
      },
      {
        ownerId: 5,
        address: "1111 Broadway",
        city: "New York",
        state: "New York",
        country: "USA",
        lat: 40.7454,
        lng: -73.9889,
        name: "Broadway Lofts",
        description: "Chic and modern apartments in the heart of the city.",
        price: 3500
      }
      // {
      //   ownerId: 6,
      //   address: "10 Hotsprings Drive",
      //   city: "Hot Springs",
      //   state: "South Dakota",
      //   country: "United States of America",
      //   lat: 12.1223271,
      //   lng: 16.1647320,
      //   name: "Wind Caves",
      //   description: "The first cave in the world to be named a national park! History packed!",
      //   price: 80.45
      // },
      // {
      //   ownerId: 7,
      //   address: "22 South Lake Powell Boulevard",
      //   city: "Page",
      //   state: "Arizona",
      //   country: "United States of America",
      //   lat: 55.1111111,
      //   lng: 22.1538129,
      //   name: "Antelope Canyon",
      //   description: "Flood warning, experienced swimmers ONLY :)",
      //   price: 99.99
      // },
      // {
      //   ownerId: 8,
      //   address: "100 Cave of the Winds Rd",
      //   city: "Manitou Springs",
      //   state: "Colorado",
      //   country: "United States of America",
      //   lat: 210.9973271,
      //   lng: 45.1133220,
      //   name: "Cave of the Winds",
      //   description: "Originally discovered in 1881, who knows what you'll find inside!",
      //   price: 100.01
      // },
      // {
      //   ownerId: 9,
      //   address: "Calle José Joaquín Pérez",
      //   city: "Chile Chico",
      //   state: "Aysén",
      //   country: "Chile",
      //   lat: 93.1783271,
      //   lng: 99.1940090,
      //   name: "Marble Caves",
      //   description: "Water has eroded these calcium carbonate cliffs to create a beautiful cave system.",
      //   price: 145.99
      // },
      // {
      //   ownerId: 10,
      //   address: "26495 Natural Bridge Caverns Rd,",
      //   city: "San Antonio",
      //   state: "Texas",
      //   country: "United States of America",
      //   lat: 13.4593171,
      //   lng: 45.1947092,
      //   name: "Natural Bridge Caverns",
      //   description: "Texas' largest commercial cave, mining gems encouraged! (Owner will take 70% of gems collected)",
      //   price: 450.25
      // }
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Spots'
    await queryInterface.bulkDelete(options);
  }
};
