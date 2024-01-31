const router = require('express').Router();

const userRoutes = require('./user-route');

const recipeRoutes = require('./recipe-route');
const commentRoutes = require('./comment-route');
router.use('/recipe', recipeRoutes)

router.use('/users', userRoutes);
router.use('/comments', commentRoutes)
module.exports = router;
