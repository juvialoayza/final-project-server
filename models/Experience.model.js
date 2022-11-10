const { Schema, model } = require("mongoose");
const placesList = require("../utils/placesList")


const experienceSchema = new Schema(
    {
        name: String,
        category:{
            type:String,
            enum:["Art and Culture", "Food", "Photography", "Adventure", "Entertainment", "Dark Tourist"]
        },
        description: String,
        creator:[
            {
                type:Schema.Types.ObjectId,
                ref: "User",
            }
        ],
        place: {
            type:String,
            enum: placesList
        },
        price: Number,
        duration: {
            type: Number,
            min:0
        },
        date: Date,
    },

{
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const Experience = model("Experience", experienceSchema);

module.exports = Experience;