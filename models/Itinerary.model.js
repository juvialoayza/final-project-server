const { Schema, model } = require("mongoose");
const placesList = require("../utils/placesList");

const itinerarySchema = new Schema(
  {
    name: String,
    place: {
        type:String,
        enum:placesList
    },
    experience:[
        {
        type: Schema.Types.ObjectId,
        ref: "Experience",  
        }
    ],
    date: String,
    budget: Number,
    creator:{
        type:Schema.Types.ObjectId,
        ref:"User",
    }

},
{
  // this second object adds extra properties: `createdAt` and `updatedAt`    s
  
  timestamps: true
}
);

const Itinerary = model("Itinerary", itinerarySchema);

module.exports = Itinerary;