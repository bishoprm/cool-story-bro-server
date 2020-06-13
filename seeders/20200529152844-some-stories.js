"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "stories",
      [
        {
          name: "After great pain, a formal feeling comes",
          content:
            "After great pain, a formal feeling comes, the nerves sit ceremonius like tombs, the stiff heart questions 'was it he, that bore' and 'yesterday or centuries before?'",
          imageUrl: "https://picsum.photos/200/300",
          homepageId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Banish Air from Air",
          content:
            "Banish air from air, divide light if you date, they'll meet while cubes in a drop or pellets of shape fit",
          imageUrl: "https://picsum.photos/200/300",
          homepageId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Annabel Lee",
          content:
            "And so, all the night-tide, I lie down by the side of my darling, my darling, my life and my bride, In her sepulchre there by the sea- In her tomb by the side of the sea.",
          imageUrl: "https://picsum.photos/200/300",
          homepageId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "The Raven",
          content:
            "Once upon a midnight dreary, while I pondered, weak and weary, Over many a quaint and curious volume of forgotten lore, While I nodded, nearly napping, suddenly there came a tapping, As of some one gently rapping, rapping at my chamber door. 'Tis some visitor, I muttered, tapping at my chamber door- Only this, and nothing more.",
          imageUrl: "https://picsum.photos/200/300",
          homepageId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  },
};
