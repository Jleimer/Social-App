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
            .then(({ body }) => {
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $push: { thoughts: body } },
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
        addReaction({ params, body }, res) {
            //console.log(body);
                    Thought.findOneAndUpdate(
                      { _id: params.thoughtId },
                      { $push: { reactions: body} },
                      { new: true }
                  )
            // .populate({
            //     path: 'friends',
            //     select: '-__v'
            //   })
            //   .select('-__v')
               .then((thought) => {
                   console.log("This is updated thought", thought)
                   res.json(thought)
            //       return Thought.findOneAndUpdate(
            //           { _id: params.thoughtId },
            //           { $push: { reactions: _id} },
            //           { new: true }
            //       );
               })
            //   .then(dbUserData => {
            //       if (!dbUserData) {
            //         res.status(404).json({ message: 'No User found with this id!' });
            //         return;
            //       }
            //       res.json(body);
             //   })
                .catch(err => res.json(err.message));
          },
        editThought({ params, body }, res) {
            console.log(body);
            Thought.findOneAndUpdate(
                {_id: params.thoughtId },
                 { $push: { thoughts: body } },
                 { new: true, runValidators: true}
            )
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
        removeThought({ params }, res) {
            Thought.findOneAndDelete({ _id: params.thoughtId })
            .then(deletedThought => {
              if (!deletedThought) {
                return res.status(404).json({ message: 'No thought with this id!' });
              }
              return Thought.findOneAndUpdate(
                { _id: params.thoughtId },
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




