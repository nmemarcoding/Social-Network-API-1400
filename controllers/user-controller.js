const { User } = require('../models');

const userController = {
    // find all users
    getAllUsers(req,res) {
        User.find({})
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .select('-__v')
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {res.status(400).json(err)});
    },

    // find one user by id
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
        .populate({
            path: 'thoughts',
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
        .catch(err => {res.status(400).json(err)});
    },

        // create user
        createUser({ body }, res) {
            User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(400).json(err));
        },

        // update User by id
        updateUser({ params, body }, res) {
            User.findOneAndUpdate({ _id: params.id }, body, { new: true })
            .then(dbUserData => {
                if(!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
        },
        
        // delete User
        deleteUser({ params }, res) {
            User.findOneAndDelete({ _id: params.id })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No User found with this id!' });
                    return;
                }
                res.json({message: 'User deleted'});
            })
            .catch(err => res.status(400).json(err));
        },

        addFriend({ params }, res) {
            User.findOneAndUpdate(
                { _id: params.userId },
                { $push: { friends: params.friendId } },
                { new: true, runValidators: true  }
            )
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!'});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
        },
    
        // remove reaction
        deleteFriend({ params }, res) {
            User.findOneAndUpdate(
                { _id: params.userId },
                { $pull: { friends: params.friendId } },
                { new: true }
            )
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err));
        }
}

module.exports = userController;