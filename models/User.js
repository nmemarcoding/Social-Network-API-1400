const { Schema, model } = require('mongoose');

const UserSchema = new Schema( {
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    }, 
    email: {
        type: String,
        required: true,
        unique: true,
        match: /.+\@.+\..+/, 
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],
    friends: []
},
{
    toJSON: {
        virtuals: true
    },
    id: false
});

// get total count of comments and replies on retrieval
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

// create the User model using the UserSchema
const User = model('User', UserSchema);

// export the User model
module.exports = User;