const router = require('express').Router();
const {
    getAllThoughts,
    findThoughtById,
    addThought,
    editThought,
    removeThought
} = require('../../controllers/thoughts')

router
    .route('/:userId')
    .get(getAllThoughts)
    .post(addThought);

router
  .route('/:userId/:thoughtId')
  .get(findThoughtById)
  .put(editThought)
  .delete(removeThought)

  router.route('/:userId/:thoughtId').delete(removeThought);

  module.exports = router;