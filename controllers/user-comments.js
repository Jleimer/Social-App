const { User } = require('../models');

const userController = {
    getAllUsers(req, res) {
        User.find({})
            .populate({
                path: 'users',
                select: '-__v'
            })
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
        .sort({ _id: -1 })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
          console.log(err);
          res.status(400).json(err);
        });
    },

    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
          .populate({
            path: 'thoughts',
            select: '-__v'
          })
          .populate({
            path: 'friends',
            select: '-__v'
        })
          .select('-__v')
          .then(dbUserData => {
            if (!dbUserData) {
              res.status(404).json({ message: 'No user found with this id!' });
              return;
            }
            res.json(dbUserData);
          })
          .catch(err => {
            console.log(err);
            res.status(400).json(err);
          });
      },

      createUser({ body }, res) {
        User.create(body)
          res.json("User Created")
          .catch(err => res.status(400).json(err));
      },

      addFriend({ params }, res) {
        //console.log(body);
        User.findOne({ _id: params.friendId })
        // .populate({
        //     path: 'friends',
        //     select: '-__v'
        //   })
        //   .select('-__v')
          .then(({ _id }) => {
              return User.findOneAndUpdate(
                  { _id: params.userId },
                  { $push: { friends: _id} },
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
      

      updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
          .then(dbUserData => {
            if (!dbUserData) {
              res.status(404).json({ message: 'No user found with this id!' });
              return;
            }
            res.json(dbUserData);
          })
          .catch(err => res.status(400).json(err.message));
      },

      deleteFriend({ params }, res) {
        User.findOne({ _id: params.friendId })
        .then(deletedFriend => {
          if (!deletedFriend) {
            return res.status(404).json({ message: 'No thought with this id!' });
          }
          return User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId } },
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
    },

      deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
          .then(dbUserData => {
            if (!dbUserData) {
              res.status(404).json({ message: 'No user found with this id!' });
              return;
            }
            res.json("User Deleted");
          })
          .catch(err => res.status(400).json(err));
      }
}

module.exports = userController;