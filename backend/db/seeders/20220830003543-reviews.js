'use strict';

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
    await queryInterface.bulkInsert('Reviews', [
      {
        userId: 1,
        spotId: 2,
        review: "What an amazing getaway spot!",
        stars: 4.5
      },
      {
        userId: 1,
        spotId: 3,
        review: "TBH kind of a dump :/",
        stars: 1
      },
      {
        userId: 2,
        spotId: 1,
        review: "Super reponsive host, and all of the amenities that were promised delivered... would recommend!",
        stars: 4
      },
      {
        userId: 3,
        spotId: 2,
        review: "A great place for a quick vacation, plenty of things to do nearby... pictures made the house look bigger than it is",
        stars: 3
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
    await queryInterface.bulkDelete('Reviews')
  }
};
