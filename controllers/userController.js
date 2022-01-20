const User = require('../models/User');

const Thought = require('../models/Thought');

const Reaction = require('../models/Reaction');


module.exports = {

    // get all users
    getUsers(req, res) {
      User.find()
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err));
    },

    // get single user by their ID
    getSingleUser(req, res) {
      User.findOne({ _id: req.params.userId })
        .then((user) =>
          !user
            ? res.status(404).json({ message: 'No user with that ID' })
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },

    // create a new user
    createUser(req, res) {
      User.create(req.body)
        .then((dbUserData) => res.json(dbUserData))
        .catch((err) => res.status(500).json(err));
    },

    // update user by their ID
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
      )
      .then((user) => 
        !user
          ? res.status(404).json({ message: 'No user with that ID'})
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // delete user by their ID and their thoughts 
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : Thought.deleteMany({ _id: { $in: user.thoughts } })
      )
      .then(() => res.json({ message: 'User and thoughts deleted' }))
      .catch((err) => res.status(500).json(err));
  },
  
  //add users friend
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
    .then((user) =>
    !user
      ? res
          .status(404)
          .json({ message: 'No user found with that ID' })
      : res.json(user)
  )
      .catch((err) => res.status(500).json(err));
  },

  //delete users friend
  deleteFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
    .then((user) =>
    !user
      ? res
          .status(404)
          .json({ message: 'No user found with that ID' })
      : res.json(user)
  )
      .catch((err) => res.status(500).json(err));
  },
};