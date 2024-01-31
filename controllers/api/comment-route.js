const router = require('express').Router();
const { comments } = require('../../models');
const withAuth = require('../../utils/auth');
router.get('/', (req, res) => {
    comments.findAll()
    .then(commentData => res.json(commentData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});
router.post('/', withAuth, (req, res) => {
    if (req.session) {
      comments.create({
        comment_text: req.body.comment_text,
        recipe_id: req.body.recipe_id,
        user_id: req.session.user_id,
      })
        .then(commentData => res.json(commentData))
        .catch(err => {
          console.log(err);
          res.status(400).json(err);
        });
    }
});

module.exports = router;