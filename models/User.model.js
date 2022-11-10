const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Password is required.']
    },
    role: {
      type:String,
      enum:["user","admin", "creator"],
      default:"user"
    },
    photoUser: {
      type: String
    },
    bioCreator: String,
    photoExperience: {
      type:[String],
    },

    favorites: [
      { 
        type: Schema.Types.ObjectId,
        ref: "Experience",
    }
    ]
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;
