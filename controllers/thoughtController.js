const User = require('../models/User');
const Thought = require('../models/Thought')

module.exports = {

  // get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },

  // find a thought user by ID
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  // create a new thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((dbThoughtData) => {
        User.findOneAndUpdate(
          //connects it to the user to display in the get all user
          { username: req.body.username },
          { $addToSet: { thoughts: dbThoughtData._id } },
          { runValidators: true, new: true }
        )
          .then((user) =>
            !user
              ? res
                .status(404)
                .json({ message: 'error with user' })
              : res.json(dbThoughtData)
          )
      })
      .catch((err) => {
        console.log(err)
        res.status(500).json(err)
      });
  },

  // update thought by its ID
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err))
  },

  // delete thought by its ID
  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No such thought exists' })
          : User.findOneAndUpdate(
            { username: thought.username },
            { $pull: { thoughts: req.params.thoughtId } },
            { new: true }
          )
      )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'Thought deleted, but no user found' })
          : res.json({ message: 'Thought successfully deleted' })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  //add reaction
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res
            .status(404)
            .json({ message: 'error with thought' })
          : res.json(thought)
      )
      .catch((err) => {
        console.log(err)
        res.status(500).json(err)
      });
  },

  // delete reaction
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res
            .status(404)
            .json({ message: 'No reaction found with that ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
};
