const { Thought, User } = require('../models');

const thoughtController = {
    getAllThoughts({params, body}, res) {
        Thought.find({})
          .then(dbUserData => {
            res.json(dbUserData);
          })
          .catch(err => {
            res.json(err);
          });
      },
      findThoughtById({ params, body }, res) {
        console.log(body);
        Thought.findOne(
            { _id: params.thoughtId }
            // { $push: { replies: body } },
            // { new: true, runValidators: true }
          )
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
        editThought({ params, body }, res) {
            console.log(body);
            Thought.findOneAndUpdate(
                {_id: params.thoughtId },
                // { $push: { thoughts: body } },
                // { new: true, runValidators: true}
            )
            // .then(({ _id }) => {
            //     return User.findOneAndUpdate(
            //         { _id: params.userId },
            //         { $push: { thoughts: _id } },
            //         { new: true }
            //     );
            // })
            .then(dbUserData => {
                if (!dbUserData) {
                  res.status(404).json({ message: 'No User found with this id!' });
                  return;
                }
                res.json(dbUserData);
              })
              .catch(err => res.json(err));
        },
        removeThought({ params }, res) {
            Thought.findOneAndDelete({ _id: params.thoughtId })
            .then(deletedThought => {
              if (!deletedThought) {
                return res.status(404).json({ message: 'No thought with this id!' });
              }
              return User.findOneAndUpdate(
                { _id: params.userId },
                { $pull: { thoughts: params.thoughtId } },
                { new: true }
              );
            })
            .then(dbUserData => {
              if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
              }
              res.json(dbUserData);
            })
            .catch(err => res.json(err));
        }};
        
          
module.exports = thoughtController;        




