const User = require('../models/User');


module.exports = {
    // get all users
    getUsers(req, res) {
      User.find()
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err));
    },
    // find a single user by ID
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
    // update user by ID
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
  // delete user by ID - also delete thoughts related to that user
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      // .then((user) =>
      //   !user
      //     ? res.status(404).json({ message: 'No user with that ID' })
      //     : Thought.deleteMany({ _id: { $in: user.thoughts } })
      // )
      .then(() => res.json({ message: 'User and thoughts deleted!' }))
      .catch((err) => res.status(500).json(err));
  },
};