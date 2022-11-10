const { Schema, model } = require("mongoose");

const itinerarySchema = new Schema(
  {
    name: String,
    place: {
        type:String,
        enum:["Alicante", "Madrid", "Valencia", "Barcelona"]
    },
    experience:[
        {
        type: Schema.Types.ObjectId,
        ref: "Experience",  
        }
    ],
    date:Date,
    budget: Number,
    creator:{
        type:Schema.Types.ObjectId,
        ref:"User",
    }

},
{
  // this second object adds extra properties: `createdAt` and `updatedAt`    
  timestamps: true
}
);

const User = model("User", userSchema);

module.exports = User;