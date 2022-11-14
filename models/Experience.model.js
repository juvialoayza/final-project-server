const { Schema, model } = require("mongoose");
const placesList = require("../utils/placesList")
const categoryList = require("../utils/categoryList")


const experienceSchema = new Schema(
    {
        name: String,
        category:{
            type:[String],
            enum: categoryList
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
        photoExperience: {
            type:[String],
          },
    },

{
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const Experience = model("Experience", experienceSchema);

module.exports = Experience;