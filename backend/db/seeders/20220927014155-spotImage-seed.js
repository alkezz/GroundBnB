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
        url: 'https://images1.apartments.com/i2/z39DCbthQ4Zi7UBPImhsnKop55hqSs_C6EmQEgpnf5A/112/8-spruce-new-york-ny-primary-photo.jpg?p=1',
        preview: true
      },
      {
        spotId: 1,
        url: 'https://images1.apartments.com/i2/QcXY2TMrhipH_yDHTatAreHNHlqvjsjb2YcVNacQDx4/112/8-spruce-new-york-ny-building-photo.jpg?p=1',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://images1.apartments.com/i2/vmdMDdgjpkOBvw00bJTGdSKU6f43nDRP_He4TjbCKiA/112/8-spruce-new-york-ny-building-photo.jpg?p=1',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://images1.apartments.com/i2/C6E1vrdXNYrnBicUFVDIhhrH5x75UawR0vouTZSCPGY/112/8-spruce-new-york-ny-building-photo.jpg?p=1',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://images1.apartments.com/i2/leLsuLZmAi9G6BNvlLHn92-dfhnlb37QEANg7xu6BB0/112/via-57-west-new-york-ny-primary-photo.jpg?p=1',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://images1.apartments.com/i2/8juIrR83QyT47VjVRjDrukR6s_4aIfOdfjmuEg5kwUo/112/via-57-west-new-york-ny-building-photo.jpg?p=1',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://images1.apartments.com/i2/wOVB45BAf-WPqm5AQkdMfwRHBVwoX1_fVlHdO6UUaCQ/112/via-57-west-new-york-ny-building-photo.jpg?p=1',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://images1.apartments.com/i2/pWFsOJTL7k7ERmZQoTUVYTGAF6BvWus8s8aWZoPz6Hc/112/via-57-west-new-york-ny-building-photo.jpg?p=1',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://images1.apartments.com/i2/m7VL3NFqqwXOEU6H_HjvUxjlHLnN0QxzeVHSosfI8do/112/10-hanover-square-new-york-ny-building-photo.jpg?p=1',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://images1.apartments.com/i2/WtC0-_F7GSOElTQgKEwcLbBYQnUKsGIAm3XTT12D2lk/112/10-hanover-square-new-york-ny-building-photo.jpg?p=1',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://images1.apartments.com/i2/-OYvfGYIcqjDDgor0C2oTrXj1hCItHR_MkozS4RqpoY/112/10-hanover-square-new-york-ny-building-photo.jpg?p=1',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://images1.apartments.com/i2/cMbhSiZq65vnZpH97_rAM7m_RBJQ3jTIU_TaM9fOP0M/112/10-hanover-square-new-york-ny-building-photo.jpg?p=1',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://images1.apartments.com/i2/F7_APKUtPtKPLll5pNYijwI8hlle3X54keOg0KGp9Zk/112/95-wall-new-york-ny-primary-photo.jpg?p=1',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://images1.apartments.com/i2/WRfdnLxcrFHXLHp8Q_KBZfjEDqfZhfn83_5lgnN162U/112/95-wall-new-york-ny-interior-photo.jpg?p=1',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://images1.apartments.com/i2/FmcG6NYOfBpKFOKublUb49Z_RgCMlz4z3tsvCGyCR9s/112/95-wall-new-york-ny-interior-photo.jpg?p=1',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://images1.apartments.com/i2/_WGib5kinhs8Pi09dzR5XrAksDayJOKaI5qoP5UcoqA/112/95-wall-new-york-ny-interior-photo.jpg?p=1',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://images1.apartments.com/i2/n3alY6BZz4DH6SRs10BRiMX2kJh85AZg6N5GwaPiOnM/112/view-34-new-york-ny-building-photo.jpg?p=1',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://images1.apartments.com/i2/95Wwe5WrmMnGZ2CLyo5NlJOdFRhTt0oTtmfiZqeOjKs/112/view-34-new-york-ny-building-photo.jpg?p=1',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://images1.apartments.com/i2/fuo1F5Et1qJqyAXekvudUf1KetOCuaJIAR-p_TW6pPI/112/view-34-new-york-ny-building-photo.jpg?p=1',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://images1.apartments.com/i2/HRvW8ERoiNHqbSoTrEVTce5368MsZhY54BwBFn68OFs/112/view-34-new-york-ny-building-photo.jpg?p=1',
        preview: false
      }
      // {
      //   spotId: 6,
      //   url: 'https://ak-d.tripcdn.com/images/0352h120009dozmte31D2.jpg',
      //   preview: true
      // },
      // {
      //   spotId: 6,
      //   url: 'https://i.pinimg.com/originals/d9/90/1d/d9901d69d68c68fda5f9eda62fe763ed.jpg',
      //   preview: false
      // },
      // {
      //   spotId: 6,
      //   url: 'https://rushmoreexpress.com/wp-content/uploads/2020/12/Caves-in-South-Dakota-3.jpg',
      //   preview: false
      // },
      // {
      //   spotId: 6,
      //   url: 'https://www.nps.gov/npgallery/GetAsset/01469972-155D-4519-3E3654F42B8EF577/proxy/hires?',
      //   preview: false
      // },
      // {
      //   spotId: 7,
      //   url: 'https://horseshoebend.com/wp-content/uploads/2018/09/uppersm_600.jpg',
      //   preview: true
      // },
      // {
      //   spotId: 7,
      //   url: 'https://navajotours.com/wp-content/uploads/2019/11/home-quotes-right.jpg',
      //   preview: false
      // },
      // {
      //   spotId: 7,
      //   url: 'https://antelopecanyon.az/wp-content/uploads/2022/01/Upper-Antelope-Canyon.jpg',
      //   preview: false
      // },
      // {
      //   spotId: 7,
      //   url: 'https://media.tacdn.com/media/attractions-splice-spp-674x446/07/aa/7b/e7.jpg',
      //   preview: false
      // },
      // {
      //   spotId: 8,
      //   url: 'https://ff68bf3906044917b58d-1b975fa8368fccfa31871a585d0cfbd4.ssl.cf1.rackcdn.com/wp-content/uploads/2015/06/Thurston-Lava-Tube.jpg',
      //   preview: true
      // },
      // {
      //   spotId: 8,
      //   url: 'https://caveofthewinds.com/wp-content/uploads/elementor/thumbs/COW-13-recolored-shirt-scaled-pg49sbnnk0bz7nr0m2urugoxv6kw6v5rcot5nmedf4.jpg',
      //   preview: false
      // },
      // {
      //   spotId: 8,
      //   url: 'https://caveofthewinds.com/wp-content/uploads/2019/07/Cave-Hero-1-768x384.jpg',
      //   preview: false
      // },
      // {
      //   spotId: 8,
      //   url: 'https://i.pinimg.com/736x/0a/bb/f1/0abbf1b0ffbd5a6479ffcceffc0f52ca--colorado-springs-colorado-trip.jpg',
      //   preview: false
      // },
      // {
      //   spotId: 9,
      //   url: 'https://funlifecrisis.com/wp-content/uploads/2020/01/marble-caves-patagonia-chile.jpg',
      //   preview: true
      // },
      // {
      //   spotId: 9,
      //   url: 'https://funlifecrisis.com/wp-content/uploads/2020/01/marble-caves-in-patagonia-chile-General-Carrera-lake.jpg',
      //   preview: false
      // },
      // {
      //   spotId: 9,
      //   url: 'http://www.slate.com/content/dam/slate/blogs/atlas_obscura/2013/05/01/the_marble_caves_of_chile_chico_a_visually_spectacular_interplay_of_light/bf029afbe34e3be4f21fbc75a974b46686b6509d.jpg.CROP.article920-large.jpg',
      //   preview: false
      // },
      // {
      //   spotId: 9,
      //   url: 'https://cdn.audleytravel.com/700/499/79/15982460-marble-caves.jpg',
      //   preview: false
      // },
      // {
      //   spotId: 10,
      //   url: 'https://media2.sacurrent.com/sacurrent/imager/u/original/24385095/hfxv.jpg',
      //   preview: true
      // },
      // {
      //   spotId: 10,
      //   url: 'https://www.thc.texas.gov/public/upload/blog/images/THC_Medallion_NaturalBridgeCaverns_005.jpg',
      //   preview: false
      // },
      // {
      //   spotId: 10,
      //   url: 'https://s7d2.scene7.com/is/image/TWCNews/0605_tx_natural_bridgecavernfacebookjpg',
      //   preview: false
      // },
      // {
      //   spotId: 10,
      //   url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/NaturalBridgeCaverns12.jpg/360px-NaturalBridgeCaverns12.jpg',
      //   preview: false
      // },
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
