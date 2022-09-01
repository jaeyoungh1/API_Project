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

    await queryInterface.bulkInsert('Spots', [
      {
        ownerId: 1,
        address: "123 ABC St",
        city: "Beverly Hills",
        state: "California",
        country: "United States of America",
        lat: 34.0736,
        lng: 118.4004,
        name: "Beverly Hills Mansion",
        description: "Private, gated French country chateau-inspired home sits at the end of a cul de sac on nearly 2 acres of land and is surrounded by stately trees, mature landscaping, and verdant canyon views.",
        price: 2500,
        // avgRating: 4,
        // previewImage: "https://images.unsplash.com/photo-1631630259742-c0f0b17c6c10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
      },
      {
        ownerId: 1,
        address: "000 XYZ Ave",
        city: "Big Bear",
        state: "California",
        country: "United States of America",
        lat: 34.2439,
        lng: 116.9114,
        name: "Luxury Cabin in the Woods",
        description: "A tranquil contemplative nature retreat, in a magnificent setting surrounded by a creek, meadow and woodlands. You’ll love this place because of the light, the comfy beds and the location.",
        price: 2000,
        // avgRating: 4,
        // previewImage: "https://images.unsplash.com/photo-1631630259742-c0f0b17c6c10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
      },
      {
        ownerId: 2,
        address: "456 DEF St",
        city: "Oakdale",
        state: "California",
        country: "United States of America",
        lat: 40.1248793,
        lng: -130.1238394,
        name: "Zen Lux Treehouse on 45 acres",
        description: "Surrounded by redwood trees inside & out, on an amazingly unique property full of wonders.",
        price: 4500,
        // avgRating: 4,
        // previewImage: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80"
      },
      {
        ownerId: 3,
        address: "789 GHI Ln",
        city: "Felton",
        state: "California",
        country: "United States of America",
        lat: 60.0834212,
        lng: -170.123074,
        name: "Whiskey Hollow, A High End Cabin in the Redwoods",
        description: "Whiskey Hollow is a true get-away! Wake up to bird song through the skylights, lounge on the deck under the redwoods with a cup of coffee, luxuriate in the oversized bathtub with candles, and cozy up in front of the wood fireplace.",
        price: 3000,
        // avgRating: 4,
        // previewImage: "https://images.unsplash.com/photo-1414497370617-1d23dd92ab2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80"
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
    await queryInterface.bulkDelete('Spots')
  }
};
