import { Schema, model } from "mongoose";

//Create a schema for the person model using the prototype (name: string [required] age: number, favoriteFoods: array of strings (*))

const personSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    age: {
      type: Number,
      required: true,
      trim: true,
    },

    gender: {
      type: String,
      required: true,
      trim: true,
    },

    favoriteFoods: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true }
);

//Create a model from the schema
const person = model("person", personSchema); //The model is created from the schema, the fisrt argument is the name of the model, and the second argument is the schema. The model is used to interact with the database.

export default person; //export the person model
