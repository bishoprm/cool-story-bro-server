"use strict";
module.exports = (sequelize, DataTypes) => {
  const story = sequelize.define(
    "story",
    {
      name: { type: DataTypes.STRING, allowNull: false },
      content: DataTypes.TEXT,
      imageUrl: DataTypes.STRING,
      homepageId: {
        type: DataTypes.INTEGER,
        references: {
          model: "homepages",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
    },
    {}
  );
  story.associate = function (models) {
    story.belongsTo(models.homepage);
  };
  return story;
};
