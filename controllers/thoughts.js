const { Thought, User } = require('../models');

const thoughtController = {
    getAllThoughts({ params, body }, res) {
        console.log(body);
        Thought.find(body)
          .then(({ _id }) => {
            return User.findOne(
              { _id: params.userId },
              { $push: { thoughts: _id } },
              { new: true }
            );
          })
          .then(dbUserData => {
            if (!dbUserData) {
              res.status(404).json({ message: 'No User found with this id!' });
              return;
            }
            res.json(dbUserData);
          })
          .catch(err => res.json(err));
      },
      findThoughtById({ params, body }, res) {
        console.log(body);
        Comment.findOne(
            { _id: params.thoughtId },
            { $push: { replies: body } },
            { new: true, runValidators: true }
          )
          .then(({ _id }) => {
            return User.findOne(
              { _id: params.userId },
              { $push: { thoughts: _id } },
              { new: true }
            );
          })
          .then(dbUserData => {
            if (!dbUserData) {
              res.status(404).json({ message: 'No User found with this id!' });
              return;
            }
            res.json(dbUserData);
          })
          .catch(err => res.json(err));
      },

      addThought({ params, body }, res) {
          console.log(body);
          Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $push: { thoughts: _id } },
                    { new: true }
                );
            })
            .then(dbUserData => {
                if (!dbUserData) {
                  res.status(404).json({ message: 'No User found with this id!' });
                  return;
                }
                res.json(dbUserData);
              })
              .catch(err => res.json(err));
            },

            


}