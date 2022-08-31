'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [
      {
        id: 1,
        firstName: 'Tahani',
        lastName: 'Al-Jamil',
        email: 'demo@user.io',
        username: 'Demo-Tahani',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        id: 2,
        firstName: 'Kamilah',
        lastName: 'Al-Jamil',
        email: 'user1@user.io',
        username: 'Demo-Kamilah',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        id: 3,
        firstName: 'Larry',
        lastName: 'Hemsworth',
        email: 'user2@user.io',
        username: 'Demo-Larry',
        hashedPassword: bcrypt.hashSync('password3')
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users',{
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2']}
    }, {})
  }
};
