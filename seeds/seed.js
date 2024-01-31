const sequelize = require('../config/connection');
const { User, Recipe } = require('../models');
const moment = require('moment');
let now = moment();
let Date = now.toDate();
let DateString = Date.toString();

const userData = require('./userData.json');
const recipeData = require('./recipeData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });


  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const recipe of recipeData) {

    let individualUser = users[Math.floor(Math.random() * users.length)];
    //let individualUserName = await User.findByPk(individualUser.id).name;

    await Recipe.create({
      ...recipe,
      user_id: individualUser.id,
      author: individualUser.name,
      timestamp: DateString,
});
  }

  process.exit(0);
};

seedDatabase();
