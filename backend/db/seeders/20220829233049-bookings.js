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
          userId: 2,
          startDate: "2024-12-24",
          endDate: "2024-12-25"
        },
        {
          spotId: 2,
          userId: 3,
          startDate: "2024-11-24",
          endDate: "2024-11-25"
        },
        {
          spotId: 3,
          userId: 1,
          startDate: "2024-10-24",
          endDate: "2024-10-25"
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
    await queryInterface.bulkDelete('Bookings')
  }
}
