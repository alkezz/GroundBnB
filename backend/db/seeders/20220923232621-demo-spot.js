'use strict';

const { query } = require("express");
const { User, Spot } = require('../models')
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tablename = 'Spots'
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
        address: "20 Valley of the Dog River",
        city: "Beirut",
        state: "Beirut",
        country: "Lebanon",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "Jeita Grotto",
        description: "Lebanon's oldest and awe-inspiring cave. Check it out before you can't!",
        price: 330.50
      },
      {
        ownerId: 2,
        address: "1720 South Scenic Hwy",
        city: "Chattanooga",
        state: "Tennessee",
        country: "United States of America",
        lat: 40.7831674,
        lng: 73.9712639,
        name: "Ruby Falls",
        description: "See the gem of Tennessee, the ruby falls!",
        price: 500.00
      },
      {
        ownerId: 3,
        address: "3462 Bluejay Lane",
        city: "Mammoth Cave",
        state: "Kentucky",
        country: "United States of America",
        lat: 67.4236363,
        lng: 45.8420395,
        name: "Mammoth Cave",
        description: "A UNESCO World Heritage site! You can not miss out on renting a room here!",
        price: 999.99
      },
      {
        ownerId: 4,
        address: "391 Dovetail Boulevard",
        city: "Gardiner",
        state: "Montana",
        country: "United States of America",
        lat: 93.7328923,
        lng: 32.2382303,
        name: "Yellowstone Cave",
        description: "A good place for a hibernation nap!",
        price: 150.10
      },
      {
        ownerId: 5,
        address: "190 SantaFe Lane",
        city: "Carlsbad",
        state: "New Mexico",
        country: "United States of America",
        lat: 253.4523271,
        lng: 415.1947320,
        name: "Beautiful Carlsbad Caverns",
        description: "119 Caves, thats 119 rooms to yourself! Think about it!",
        price: 80.45
      },
      {
        ownerId: 6,
        address: "10 Hotsprings Drive",
        city: "Hot Springs",
        state: "South Dakota",
        country: "United States of America",
        lat: 12.1223271,
        lng: 16.1647320,
        name: "Wind Caves",
        description: "The first cave in the world to be named a national park! History packed!",
        price: 80.45
      },
      {
        ownerId: 7,
        address: "22 South Lake Powell Boulevard",
        city: "Page",
        state: "Arizona",
        country: "United States of America",
        lat: 55.1111111,
        lng: 22.1538129,
        name: "Antelope Canyon",
        description: "Flood warning, experienced swimmers ONLY :)",
        price: 99.99
      },
      {
        ownerId: 8,
        address: "100 Cave of the Winds Rd",
        city: "Manitou Springs",
        state: "Colorado",
        country: "United States of America",
        lat: 210.9973271,
        lng: 45.1133220,
        name: "Cave of the Winds",
        description: "Originally discovered in 1881, who knows what you'll find inside!",
        price: 100.01
      },
      {
        ownerId: 9,
        address: "51000 Two Rivers Plaza Road",
        city: "Glenwood Springs",
        state: "Colorado",
        country: "United States of America",
        lat: 93.1783271,
        lng: 99.1940090,
        name: "Glenwood Caverns",
        description: "It's both an action park and a cave, what more could you ask for",
        price: 45.99
      },
      {
        ownerId: 10,
        address: "26495 Natural Bridge Caverns Rd,",
        city: "San Antonio",
        state: "Texas",
        country: "United States of America",
        lat: 13.4593171,
        lng: 45.1947092,
        name: "Natural Bridge Caverns",
        description: "Texas' largest commercial cave, mining gems encouraged! (Owner will take 70% of gems collected)",
        price: 450.25
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
    await queryInterface.bulkDelete(options);
  }
};
