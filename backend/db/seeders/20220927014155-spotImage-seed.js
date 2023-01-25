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
    options.tableName = 'SpotImages'
    await queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        url: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/24/35/5a/ef/caption.jpg?w=1200&h=-1&s=1',
        preview: true
      },
      {
        spotId: 1,
        url: 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/09/5b/68/fc.jpg',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://www.toursbylocals.com/images/guides/8/8090/201719033303392.jpg',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://upload.wikimedia.org/wikipedia/commons/0/09/Upper_Jeita_Grotto.jpg',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://birdinflight.com/wp-content/uploads/2015/03/hangsondoongcover.jpg',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://www.lookoutmountain.com/images/uploads/attractions/RubyFallsC4WebRes-small.jpg',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://www.rubyfalls.com/images/uploads/gallery/cave-and-falls-gallery-listing-home.jpg',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://media-cdn.tripadvisor.com/media/photo-s/14/47/75/8d/lover-s-leap-waterfall.jpg',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://travel.mqcdn.com/mapquest/travel/wp-content/uploads/2017/08/GettyImages-670484258-720x480.jpg',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://www.nps.gov/articles/000/images/375EC6C7-1DD8-B71B-0B98F2E5334629F5Original.jpg?maxwidth=650&autorotate=false',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://gregdisch.com/wp-content/uploads/2020/10/Mammoth-Cave-National-Park-20200901-IMG_2602-HDR.jpg',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://worldheritageoutlook.iucn.org/sites/default/files/styles/sites_thumbnail/public/images/site/Mammoth%20Cave%20National%20Park_Geoff%20Livingston_CC%20BY%20NC%20ND%202.0.jpg?itok=tipO5oMa',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/65/39/ac/caption.jpg?w=1200&h=-1&s=1',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://backyardmontana.com/wp-content/uploads/Stairwell-Ending-the-Lewis-and-Clark-Caverns-Tour.jpg',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://montanastateparks.reserveamerica.com/webphotos/MT/pid630315/0/540x360.jpg',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Lewis_and_clark_caverns.jpg/640px-Lewis_and_clark_caverns.jpg',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://focusasiatravel.com/wp-content/uploads/2021/07/son-doong.jpg',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://assets3.thrillist.com/v1/image/3065736/828x610/flatten;crop;webp=auto;jpeg_quality=60.jpg',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://historyfangirl.com/wp-content/uploads/2020/06/shutterstock_132426206.jpg',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://www.travelandleisure.com/thmb/cDt8F8xU1A8dIU_9AhkIeZjSpkM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/carlsbad-caverns-entrance-CCNP1219-03c9387c80004941873ee38dc54a11f9.jpg',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://ak-d.tripcdn.com/images/0352h120009dozmte31D2.jpg',
        preview: true
      },
      {
        spotId: 6,
        url: 'https://i.pinimg.com/originals/d9/90/1d/d9901d69d68c68fda5f9eda62fe763ed.jpg',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://rushmoreexpress.com/wp-content/uploads/2020/12/Caves-in-South-Dakota-3.jpg',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://www.nps.gov/npgallery/GetAsset/01469972-155D-4519-3E3654F42B8EF577/proxy/hires?',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://horseshoebend.com/wp-content/uploads/2018/09/uppersm_600.jpg',
        preview: true
      },
      {
        spotId: 7,
        url: 'https://navajotours.com/wp-content/uploads/2019/11/home-quotes-right.jpg',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://antelopecanyon.az/wp-content/uploads/2022/01/Upper-Antelope-Canyon.jpg',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://media.tacdn.com/media/attractions-splice-spp-674x446/07/aa/7b/e7.jpg',
        preview: false
      },
      {
        spotId: 8,
        url: 'https://ff68bf3906044917b58d-1b975fa8368fccfa31871a585d0cfbd4.ssl.cf1.rackcdn.com/wp-content/uploads/2015/06/Thurston-Lava-Tube.jpg',
        preview: true
      },
      {
        spotId: 8,
        url: 'https://caveofthewinds.com/wp-content/uploads/elementor/thumbs/COW-13-recolored-shirt-scaled-pg49sbnnk0bz7nr0m2urugoxv6kw6v5rcot5nmedf4.jpg',
        preview: false
      },
      {
        spotId: 8,
        url: 'https://caveofthewinds.com/wp-content/uploads/2019/07/Cave-Hero-1-768x384.jpg',
        preview: false
      },
      {
        spotId: 8,
        url: 'https://i.pinimg.com/736x/0a/bb/f1/0abbf1b0ffbd5a6479ffcceffc0f52ca--colorado-springs-colorado-trip.jpg',
        preview: false
      },
      {
        spotId: 9,
        url: 'https://funlifecrisis.com/wp-content/uploads/2020/01/marble-caves-patagonia-chile.jpg',
        preview: true
      },
      {
        spotId: 9,
        url: 'https://funlifecrisis.com/wp-content/uploads/2020/01/marble-caves-in-patagonia-chile-General-Carrera-lake.jpg',
        preview: false
      },
      {
        spotId: 9,
        url: 'http://www.slate.com/content/dam/slate/blogs/atlas_obscura/2013/05/01/the_marble_caves_of_chile_chico_a_visually_spectacular_interplay_of_light/bf029afbe34e3be4f21fbc75a974b46686b6509d.jpg.CROP.article920-large.jpg',
        preview: false
      },
      {
        spotId: 9,
        url: 'https://cdn.audleytravel.com/700/499/79/15982460-marble-caves.jpg',
        preview: false
      },
      {
        spotId: 10,
        url: 'https://media2.sacurrent.com/sacurrent/imager/u/original/24385095/hfxv.jpg',
        preview: true
      },
      {
        spotId: 10,
        url: 'https://www.thc.texas.gov/public/upload/blog/images/THC_Medallion_NaturalBridgeCaverns_005.jpg',
        preview: false
      },
      {
        spotId: 10,
        url: 'https://s7d2.scene7.com/is/image/TWCNews/0605_tx_natural_bridgecavernfacebookjpg',
        preview: false
      },
      {
        spotId: 10,
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/NaturalBridgeCaverns12.jpg/360px-NaturalBridgeCaverns12.jpg',
        preview: false
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
    options.tableName = 'SpotImages'
    await queryInterface.bulkDelete(options)
  }
};
