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
        userId: 1,
        spotId: 4,
        review: "Truly a phenomenal place to stay if you have a large group. Highly recommend.",
        stars: 5
      },
      {
        userId: 2,
        spotId: 5,
        review: "This is a beautiful place to stay. I highly recommend this place for large groups. ",
        stars: 4
      },
      {
        userId: 3,
        spotId: 6,
        review: "I've often been excited about photos of an AirBnb that make the place look like an A, and when I show up, it’s a B. Like this place.",
        stars: 3
      },
      {
        userId: 1,
        spotId: 7,
        review: "Well appointed home with well-stocked kitchen. More than plenty of space for 13 of us.",
        stars: 5
      },
      {
        userId: 2,
        spotId: 8,
        review: "The house is incredible. It's a bit far from the city, so be prepared to commute, and also there isn't cell service in the canyon.",
        stars: 4
      },
      {
        userId: 2,
        spotId: 9,
        review: "Beautiful kitchen, small rooms",
        stars: 3
      },
      {
        userId: 3,
        spotId: 10,
        review: "A great place, location and climate",
        stars: 4
      },
      {
        userId: 1,
        spotId: 11,
        review: "The host's attention to detail regarding the homes accommodations was incredible :)",
        stars: 5
      },
      {
        userId: 1,
        spotId: 12,
        review: "Nice place, but was not cleaned when we arrived :(... Wish I could give it a higher rating",
        stars: 2
      },
      {
        userId: 2,
        spotId: 14,
        review: "YOU WON'T REGRET COMING HERE!!!",
        stars: 5
      },
      {
        userId: 3,
        spotId: 15,
        review: "TBH..... I've definitely been to nicer places. Photos seem to be edited....",
        stars: 2
      },
      {
        userId: 1,
        spotId: 16,
        review: "Amazing Spot! Would Recommend!",
        stars: 4
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
    await queryInterface.bulkDelete('Reviews')
  }
};
