const router = require('express').Router();
const {User, Recipe, Comment} = require('../models/index');

const { Op } = require('sequelize');

const withAuth = require('../utils/auth');


//login page
router.get('/login', async (req, res) => {
try {
    res.render('login', {
       });
}  catch (err) {
    console.log(err);
    res.status(500).json(err);
}
});


//home page
router.get('/', withAuth, async (req, res) => {
    try{
        const recipeDb = await Recipe.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name']
                },
            ],
        });

        const recipes = recipeDb.map((recipe) =>
        recipe.get({plain: true}));

        res.render('home', {
            recipes,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});



//own person's profile route
router.get('/profile', withAuth, async (req, res) => {
    try {
        // Find the logged in user based on the session ID
        const userData = await User.findByPk(req.session.user_id, {
          attributes: { exclude: ['password'] },
          include: [{ model: Recipe }],
        });
    
        const user = userData.get({ plain: true });

        const userRecipes = await Recipe.findAll({
          where: {
            user_id: req.session.user_id,
          }
        });

        const myRecipes = userRecipes.map((recipe) =>
        recipe.get({plain: true}));
    
        res.render('profile', {
          ...user,
          myRecipes,
          loggedIn: req.session.loggedIn
        });
      } catch (err) {
        res.status(500).json(err)
      }
});


//someone else's profile route
router.get('/profile/:id', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the params ID
    const userData = await User.findByPk(req.params.id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Recipe }],
    });

    const user = userData.get({ plain: true });

    const userRecipes = await Recipe.findAll({
      where: {
        user_id: req.session.user_id,
      }
    });

    const myRecipes = userRecipes.map((recipe) =>
    recipe.get({plain: true}));

    res.render('profile', {
      ...user,
      myRecipes,
      loggedIn: req.session.loggedIn
    });
  } catch (err) {
    res.status(500).json(err)
  }
});



//Allrecipes/Explore page
router.get('/explore', withAuth, async (req,res) => {
  try{
    
    const recipeDb = await Recipe.findAll({
      attributes : [
        'id',
        'author',
        'title',
        'ingredients',
        'instructions',
        'image',
        'timestamp'
      ],

  });

  
  const recipes = recipeDb.map((recipe) =>
  recipe.get({plain: true}));
  console.log(recipes);

  res.render('explore', {
      recipes,
      loggedIn: req.session.loggedIn,
  });
} catch (err) {
  console.log(err);
  res.status(500).json(err);
}
});





router.get('/post', withAuth, async (req, res) => {
  try{
    res.render('addRecipe', {
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500),json(err);
  }

});

router.get('/recipe/:id', withAuth, async (req, res) => {
  try{
    const recipePk = await Recipe.findByPk(req.params.id);

      const recipe = recipePk.get({ plain: true });;
      
      res.render('singleRecipe', {
        recipe,
        loggedIn: req.session.loggedIn
      });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});



router.get('/editrecipe/:id', withAuth, async (req, res) => {
  try{
    const recipePk = await Recipe.findByPk(req.params.id, {
      attributes : [
        'id',
        'author',
        'title',
        'ingredients',
        'instructions',
        'image',
        'timestamp'
      ],
    });

      const recipe = recipePk.get({ plain: true });
      
      res.render('editRecipe', {
        recipe,
        loggedIn: req.session.loggedIn
      });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


router.get('/search', async (req, res) => {
  try{
 const searchResults =  Recipe.findAll({
    where: {
      title: req.body
    },
    attributes:[
    'id',
    'author',
    'title',
    'instructions',
    'ingredients',
    'comments',
    'user_id',
    'image'
  ],
 });

const recipes = searchResults.map((searchResult) => searchResult.get({ plain: true }));
res.render('searchrecipe', {recipes, loggedIn: req.session.loggedIn});

} catch (err) {
  console.log(err);
  res.status(500).json(err);
}
});
  
  

module.exports = router;

