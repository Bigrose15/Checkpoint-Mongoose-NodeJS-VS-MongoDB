import dotenv from "dotenv"; //this is used to import the dotenv module,
dotenv.config(); //this line is used to access the .env file, whcih is used to store the environment variables like PORT, DB_URL, username, password etc.

//Note if your server is not in the root directory, you will have to specify the path to the .env file like this: dotenv.config({ path: "../path/.env" }); but if the server is in the root directory, you can use dotenv.config();

import express from "express";

//Importing the mongoose module
import mongoose from "mongoose";
import Person from "./Models/person.model.js"; //importing the user model from the user.model.js file

const app = express();

mongoose
  .connect(process.env.myMONGOURI) //connecting to the database using the URL from the .env file
  .then((result) => {
    console.log(`database connected @ ${result.connection.host}`);
  })
  .catch((error) => {
    //this line is used to catch the error if the connection to the database is not successful, meaning that if the error is cathced, the application will not crash, and the error message will be displayed, but the application will still run. Without the catch block, the application will crash if the connection to the database is not successful.
    console.log(`error connecting to database: ${error.message}`);
  });

//CREATE & SAVE A RECORD

//Creating the Person Instance
// const person = new Person({
//   fullName: "LAW UGO",
//   age: 105,
//   gender: "male",
//   favoriteFoods: ["Jollof Rice and Chciken", "Egusi Soup and Garri"],
// });

// // //Saving the Person to the Database
// person
//   .save()
//   .then((result) => {
//     console.log(`person record saved successfully: ${result}`);
//   })
//   .catch((error) => {
//     console.log(`error saving person record: ${error.message}`);
//   });

//CREATE MANY RECORDS WITH Person.create()
//I noticed that using the small letter for the "p" in Person did not work out, rather Vscode returned an error that person.create is not a function. It created the many record when I changed the "p" to P.
// Person.create([
//   {
//     fullName: "CHINONSO ORJI",
//     age: 40,
//     gender: "male",
//     favoriteFoods: ["fried Yam", "Pap and Akara"],
//   },

//   {
//     fullName: "FRANK ORJI",
//     age: 50,
//     gender: "male",
//     favoriteFoods: ["Bread and Egg", "Beans"],
//   },

//   {
//     fullName: "LAW ORJI",
//     age: 47,
//     gender: "male",
//     favoriteFoods: ["Noodles", "Rice and Stew"],
//   },

//   {
//     fullName: "IBIENE ABBI",
//     age: 30,
//     gender: "female",
//     favoriteFoods: ["Spaghetti", "Yam Porridge"],
//   },

//   {
//     fullName: "DEINMA ABBI",
//     age: 20,
//     gender: "female",
//     favoriteFoods: ["Fufu with Fisherman Soup", "Noodles and Egg"],
//   },
// ])

//   .then((result) => {
//     console.log(
//       `many person's (people) record created successfully: ${result}`
//     );
//   })
//   .catch((error) => {
//     console.log(`error saving many person's (people) record: ${error.message}`);
//   });

//USE Person.find() TO SEARCH YOUR DATABASE
// Person.find()
//   .then((result) => {
//     console.log(`successful: ${result}`);
//   })
//   .catch((error) => {
//     console.log(
//       `error finding many person's (people) record: ${error.message}`
//     );
//   });

//FIND ALL PEOPLE HAVING A GIVEN NAME USING Model.find() -> [Person]
// Person.find({ fullName: "LAW UGO" })
//   .then((result) => {
//     console.log(`successful: ${result}`);
//   })
//   .catch((error) => {
//     console.log(`error finding people with the name LAW UGO: ${error.message}`);
//   });

//USE model.findOne() TO RETURN A SINGLE MATCHING DOCUMENT FROM YOUR DATABASE
// Person.findOne({ fullName: "Ibiene Abbi" })
//   .then((result) => {
//     console.log(`successful: ${result}`);
//   })
//   .catch((error) => {
//     console.log(`error finding person with the given name: ${error.message}`);
//   });

//Use model.findOne() TO RETURN A SINGLE DOCUMENT FROM YOUR DATABASE
//Find just one person which has a certain food in the person's favorites, using Model.findOne() -> Person. Use the function argument food as a search key.

// Person.findOne({
//   _id: "67016d6ea6b880f7d1fcde80",
//   favoriteFoods: { $in: ["Jollof Rice and Chciken"] },
// })

//   .then((result) => {
//     console.log(`successful: ${result}`);
//   })
//   .catch((error) => {
//     console.log(
//       `error finding person with the given favorite food: ${error.message}`
//     );
//   });
// /*The Query above Finds a person with the specified _id and favoriteFoods containing "Jollof Rice and Chciken".
// - Uses $in operator to search within the favoriteFoods array. This query is the best method for the given task because it has a unique identifier (id) and two users can't have same ID.
// */
// //OTHER METHODS THAT ARE SIMILAR BUT WILL NOT GIVE THE ABSOLUTE RESULT ARE; line 143 to line 157

// //Person.findOne using favoriteFood
Person.findOne({ favoriteFoods: "Jollof Rice and Chicken" });
// /*- This query finds a person with favoriteFoods exactly equal to "Jollof Rice and Chicken". The query assumes favoriteFoods is a single string value, not an array. Is not the best query for the given task.
//  */

// //Person.findOne using the fullName and favoriteFoods
Person.findOne({
  fullName: "LAW UGO",
  favoriteFoods: { $in: ["Jollof Rice and Chciken"] },
}); /*This query may likely find a person or people with the specified fullName and favoriteFoods containing "Jollof Rice and Chciken".
// - Uses $in operator to search within the favoriteFoods array. It may return a person's or peoples record(s) that mathces the query because in a collection or database users can have same name and favoriteFoods. This method is not the best for the given task, because it does not have unique identifier.*/

// //Person.findOne using the fullName and favoriteFoods
Person.findOne({
  fullName: "LAW UGO",
  favoriteFoods: "Jollof Rice and Chciken",
});
// /*This query finds a person with the specified fullName and favoriteFoods exactly equal to "Jollof Rice and Chciken".
// - This query assumes favoriteFoods is a single string value, not an array. This method does not conform to the instruction given in line 121/122*/

//Use model.findById() TO SEARCH YOUR DATABASE BY _id
//Find the (only!!) person having a given _id, using Model.findById() -> Person. Use the function argument personId as the search key.

// Person.findById("67061935d75e7a1122bf6d48")
//   .then((result) => {
//     console.log(`successful: ${result}`);
//   })
//   .catch((error) => {
//     console.log(`error searching database: ${error.message}`);
//   });

//PERFORM CLASSIC UPDATES BY RUNNING FIND, EDIT, THEN SAVE
//Find a person by _id ( use any of the above methods ) with the parameter personId as a search key. Add "hamburger" to the list of the person's favoriteFoods (you can use Array.push()). Then - inside the find callback - save() the updated Person.

// Person.findByIdAndUpdate(
//   { _id: "67061935d75e7a1122bf6d46" },
//   { $push: { favoriteFoods: "Hamburger" } } //Using the $push operator adds the "Hamburger" to the array[] of favoriteFoods, without it the update overwrites it with a single string value ("Hamburger"). To create a new document if it doesn't exist, add the upsert option {upsert: true} behind the $push operator curly bracket.
// )
// .then((result) => {
//   console.log(`found, updated, and saved successfully: ${result}`);
// })
// .catch((error) => {
//   console.log(`error performing operation: ${error.message}`);
// });

//PERFORM NEW UPDATES ON A DOCUMENT USING model.findOneAndUpdate()
//Find a person by Name and set the person's age to 20. Use the function parameter personName as a search key.

// Person.findOneAndUpdate({ fullName: "LAW UGO" }, { age: 20 }, { new: true }) //Without adding this >> { new: true } the document will still be updated in the database, but is required when you need to: View the updated document in the console. Access the updated document immediately after updating.
// .then((result) => {
//   console.log(`found,and age updated, successfully: ${result}`);
// })
// .catch((error) => {
//   console.log(`error in operation: ${error.message}`);
// });

//DELETE ONE DOCUMENT USING model.findByIdAndRemove
//Delete one person by the person's _id. You should use one of the methods findByIdAndRemove() or findOneAndRemove(). They are like the previous update methods. They pass the removed document to the DB. As usual, use the function argument personId as the search key.

// Person.findByIdAndDelete({ _id: "67061935d75e7a1122bf6d48" })
// .then((result) => {
//   console.log(`found and deleted successfully: ${result}`);
// })
// .catch((error) => {
//   console.log(`error in carrying this operation: ${error.message}`);
// });

//MongoDB and Mongoose - DELETE MANY DOCUMENTS WITH model.remove()
//Delete all the people whose name is “Mary”, using Model.remove(). Pass it to a query document with the name field set, and of course, do a callback.

// Person.deleteMany({ fullName: "Mary" })
//   .then((result) => {
//     console.log(`deleted successfully: ${result.deletedCount}`); //deletedCount tells the number of deleted document in the terminal or console.
//   })
//   .catch((error) => {
//     console.log(`error in carrying this operation: ${error.message}`);
//   });
//Note: The Model.remove() doesn’t return the deleted document, but a JSON object containing the outcome of the operation, and the number of items affected.

//CHAIN SEARCH QUERY HELPERS TO NARROW SEARCH RESULTS
//Find people who like burritos. Sort them by name, limit the results to two documents, and hide their age. Chain .find(), .sort(), .limit(), .select(), and then .exec(). Pass the done(err, data) callback to exec().
Person.find({ favoriteFoods: "burritos" }) // finding who likes burritos as favoriteFoods
  .sort({ name: 1 }) //Sorting their names in ascending order
  .limit(2) //Limiting the search result to only two, that is the first two ascendingly
  .select("-age") //this exclude the age from the query. Using select('-age'), in Mongoose will retrieve all fields in the document except for age.
  .then((result) => {
    console.log(`done: ${result.message}`);
  })
  .catch((error) => {
    console.log(`error: ${error.message}`);
  });

const PORT = process.env.PORT;

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
