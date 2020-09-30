const router = require('express').Router();
const {
    getAllThoughts,
    findThoughtById,
    addThought,
    editThought,
    removeThought,
    addReaction
} = require('../../controllers/thoughts')

router.route('/').get(getAllThoughts)
router.route('/:userId').post(addThought)

router
  .route('/:thoughtId')
  .get(findThoughtById)
  .put(editThought)
  .delete(removeThought)

router.route('/:thoughtId/reactions')
    .post(addReaction)

router.route('/:userId/:thoughtId').delete(removeThought);

  module.exports = router;