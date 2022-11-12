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
    await queryInterface.bulkInsert('SpotImages', [
      {
        spotId: 1,
        url: "https://images.pexels.com/photos/6510967/pexels-photo-6510967.jpeg?cs=srgb&dl=pexels-curtis-adams-6510967.jpg&fm=jpg",
        preview: true
      },
      {
        spotId: 1,
        url: "https://images.pexels.com/photos/2121120/pexels-photo-2121120.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        preview: false
      },
      {
        spotId: 1,
        url: "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        preview: false
      },
      {
        spotId: 1,
        url: "https://images.pexels.com/photos/6510974/pexels-photo-6510974.jpeg?cs=srgb&dl=pexels-curtis-adams-6510974.jpg&fm=jpg",
        preview: false
      },
      {
        spotId: 1,
        url: "https://images.pexels.com/photos/3705529/pexels-photo-3705529.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        preview: false
      },
      {
        spotId: 2,
        url: "https://images.pexels.com/photos/2294125/pexels-photo-2294125.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        preview: true
      },
      {
        spotId: 2,
        url: "https://images.pexels.com/photos/13945431/pexels-photo-13945431.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        preview: false
      },
      {
        spotId: 2,
        url: "https://images.pexels.com/photos/5439499/pexels-photo-5439499.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        preview: false
      },
      {
        spotId: 2,
        url: "https://images.pexels.com/photos/10855157/pexels-photo-10855157.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        preview: false
      },
      {
        spotId: 2,
        url: "https://images.pexels.com/photos/1450208/pexels-photo-1450208.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        preview: false
      },
      {
        spotId: 3,
        url: "https://images.unsplash.com/photo-1414497370617-1d23dd92ab2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80",
        preview: true
      },
      {
        spotId: 3,
        url: "https://images.pexels.com/photos/1084362/pexels-photo-1084362.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        preview: false
      },
      {
        spotId: 3,
        url: "https://images.pexels.com/photos/10825572/pexels-photo-10825572.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        preview: false
      },
      {
        spotId: 3,
        url: "https://images.pexels.com/photos/4940760/pexels-photo-4940760.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        preview: false
      },
      {
        spotId: 3,
        url: "https://images.pexels.com/photos/4917176/pexels-photo-4917176.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        preview: false
      },
      {
        spotId: 4,
        url: "https://a0.muscache.com/im/pictures/15a460f8-5a61-448e-b9d0-a887500c4298.jpg?im_w=720",
        preview: true
      },
      {
        spotId: 4,
        url: "https://images.pexels.com/photos/12879017/pexels-photo-12879017.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        preview: false
      },
      {
        spotId: 4,
        url: "https://images.pexels.com/photos/13264841/pexels-photo-13264841.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        preview: false
      },
      {
        spotId: 4,
        url: "https://images.pexels.com/photos/14281158/pexels-photo-14281158.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        preview: false
      },
      {
        spotId: 4,
        url: "https://images.pexels.com/photos/11837610/pexels-photo-11837610.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        preview: false
      },
      {
        spotId: 5,
        url: "https://images.pexels.com/photos/276551/pexels-photo-276551.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        preview: true
      },
      {
        spotId: 5,
        url: "https://images.pexels.com/photos/259962/pexels-photo-259962.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        preview: false
      },
      {
        spotId: 5,
        url: "https://images.unsplash.com/photo-1608058204446-1cf0f7d11d38?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
        preview: false
      },
      {
        spotId: 5,
        url: "https://images.pexels.com/photos/1543447/pexels-photo-1543447.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        preview: false
      },
      {
        spotId: 5,
        url: "https://images.pexels.com/photos/1571467/pexels-photo-1571467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        preview: false
      },
      {
        spotId: 6,
        url: "https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        preview: true
      },
      {
        spotId: 6,
        url: "https://images.pexels.com/photos/534172/pexels-photo-534172.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        preview: false
      },
      {
        spotId: 6,
        url: "https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        preview: false
      },
      {
        spotId: 6,
        url: "https://images.pexels.com/photos/1571471/pexels-photo-1571471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        preview: false
      },
      {
        spotId: 6,
        url: "https://images.pexels.com/photos/1571452/pexels-photo-1571452.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        preview: false
      },
      {
        spotId: 7,
        url: "https://images.unsplash.com/photo-1583765748076-cac46b8c98c1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1771&q=80",
        preview: true
      },
      {
        spotId: 7,
        url: "https://images.pexels.com/photos/8406971/pexels-photo-8406971.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        preview: false
      },
      {
        spotId: 7,
        url: "https://images.pexels.com/photos/271643/pexels-photo-271643.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        preview: false
      },
      {
        spotId: 7,
        url: "https://images.pexels.com/photos/210265/pexels-photo-210265.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        preview: false
      },
      {
        spotId: 7,
        url: "https://images.pexels.com/photos/2883047/pexels-photo-2883047.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        preview: false
      },
      {
        spotId: 8,
        url: "https://images.unsplash.com/photo-1627553002447-cb93a0010deb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=796&q=80",
        preview: true
      },
      {
        spotId: 8,
        url: "https://images.pexels.com/photos/3773572/pexels-photo-3773572.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        preview: false
      },
      {
        spotId: 8,
        url: "https://images.pexels.com/photos/3697742/pexels-photo-3697742.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        preview: false
      },
      {
        spotId: 8,
        url: "https://images.pexels.com/photos/6297244/pexels-photo-6297244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        preview: false
      },
      {
        spotId: 8,
        url: "https://images.pexels.com/photos/2606612/pexels-photo-2606612.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        preview: false
      },
      {
        spotId: 9,
        url: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        preview: true
      },
      {
        spotId: 9,
        url: "https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        preview: false
      },
      {
        spotId: 9,
        url: "https://images.pexels.com/photos/2089698/pexels-photo-2089698.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        preview: false
      },
      {
        spotId: 9,
        url: "https://images.pexels.com/photos/6510952/pexels-photo-6510952.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        preview: false
      },
      {
        spotId: 9,
        url: "https://images.pexels.com/photos/2343467/pexels-photo-2343467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        preview: false
      },
      {
        spotId: 10,
        url: "https://images.unsplash.com/photo-1599809275671-b5942cabc7a2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
        preview: true
      },
      {
        spotId: 10,
        url: "https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        preview: false
      },
      {
        spotId: 10,
        url: "https://images.pexels.com/photos/7168052/pexels-photo-7168052.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        preview: false
      },
      {
        spotId: 10,
        url: "https://images.pexels.com/photos/12148587/pexels-photo-12148587.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        preview: false
      },
      {
        spotId: 10,
        url: "https://images.pexels.com/photos/12908649/pexels-photo-12908649.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        preview: false
      },
      {
        spotId:11,
        url: "https://images.unsplash.com/photo-1586727568950-92b60d70fd69?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
        preview: true
      },
      {
        spotId: 11,
        url: "https://images.pexels.com/photos/3450330/pexels-photo-3450330.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        preview: false
      },
      {
        spotId: 11,
        url: "https://images.pexels.com/photos/9541341/pexels-photo-9541341.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        preview: false
      },
      {
        spotId: 11,
        url: "https://images.pexels.com/photos/10866049/pexels-photo-10866049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        preview: false
      },
      {
        spotId: 11,
        url: "https://images.pexels.com/photos/10855265/pexels-photo-10855265.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        preview: false
      },
      {
        spotId:12,
        url: "https://images.unsplash.com/photo-1416331108676-a22ccb276e35?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1767&q=80",
        preview: true
      },
      {
        spotId: 12,
        url: "https://images.pexels.com/photos/8082297/pexels-photo-8082297.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        preview: false
      },
      {
        spotId: 12,
        url: "https://images.pexels.com/photos/11701119/pexels-photo-11701119.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        preview: false
      },
      {
        spotId: 12,
        url: "https://images.pexels.com/photos/10594273/pexels-photo-10594273.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        preview: false
      },
      {
        spotId: 12,
        url: "https://images.pexels.com/photos/3209049/pexels-photo-3209049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        preview: false
      },
      {
        spotId: 13,
        url: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8ODJ8fG1hbnNpb258ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
        preview: true
      },
      {
        spotId: 13,
        url: "https://images.pexels.com/photos/3201921/pexels-photo-3201921.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        preview: false
      },
      {
        spotId: 13,
        url: "https://images.pexels.com/photos/12715492/pexels-photo-12715492.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        preview: false
      },
      {
        spotId: 13,
        url: "https://images.pexels.com/photos/13009881/pexels-photo-13009881.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        preview: false
      },
      {
        spotId: 13,
        url: "https://images.pexels.com/photos/342800/pexels-photo-342800.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        preview: false
      },
      {
        spotId: 14,
        url: "https://images.unsplash.com/photo-1639135689910-5268886bf45e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
        preview: true
      },
      {
        spotId: 14,
        url: "https://images.pexels.com/photos/4450337/pexels-photo-4450337.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        preview: false
      },
      {
        spotId: 14,
        url: "https://images.pexels.com/photos/1040893/pexels-photo-1040893.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        preview: false
      },
      {
        spotId: 14,
        url: "https://images.pexels.com/photos/3773583/pexels-photo-3773583.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        preview: false
      },
      {
        spotId: 14,
        url: "https://images.pexels.com/photos/4112236/pexels-photo-4112236.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        preview: false
      },
      {
        spotId: 15,
        url: "https://images.unsplash.com/photo-1591825729269-caeb344f6df2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
        preview: true
      },
      {
        spotId: 15,
        url: "https://images.pexels.com/photos/2662183/pexels-photo-2662183.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        preview: false
      },
      {
        spotId: 15,
        url: "https://images.pexels.com/photos/9130979/pexels-photo-9130979.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        preview: false
      },
      {
        spotId: 15,
        url: "https://images.pexels.com/photos/10750999/pexels-photo-10750999.jpeg?auto=compress&cs=tinysrgb&w=400",
        preview: false
      },
      {
        spotId: 15,
        url: "https://images.pexels.com/photos/6032424/pexels-photo-6032424.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        preview: false
      },
      {
        spotId: 16,
        url: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2800&q=80",
        preview: true
      },
      {
        spotId: 16,
        url: "https://images.pexels.com/photos/4740485/pexels-photo-4740485.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
        preview: false
      },
      {
        spotId: 16,
        url: "https://images.pexels.com/photos/4940605/pexels-photo-4940605.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
        preview: false
      },
      {
        spotId: 16,
        url: "https://images.pexels.com/photos/12205231/pexels-photo-12205231.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
        preview: false
      },
      {
        spotId: 16,
        url: "https://images.pexels.com/photos/5733619/pexels-photo-5733619.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
        preview: false
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
    await queryInterface.bulkDelete('SpotImages')
  }
};
