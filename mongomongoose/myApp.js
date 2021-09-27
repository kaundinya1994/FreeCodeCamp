
require('dotenv').config();
var mongoose = require('mongoose')
var { Schema } = require('mongoose')

const mySecret = "mongodb+srv://username:pass123@cluster0.eio2c.mongodb.net/clusterDB?retryWrites=true&w=majority"
mongoose.connect(mySecret, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new Schema({
  
    name: { type: String, required: true },
    age :  Number,
    favoriteFoods: [String],

}) 

let Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {

  const jave = new Person({name:"jave", age: 24, favoriteFoods:["fruit","junk food"]})
  
  jave.save((err,data)=>{
    if(err) return done(err)
    done(null, data);
  })
  
};

var arrayOfPeople = [
  {name: "Frankie", age: 74, favoriteFoods: ["Del Taco"]},
  {name: "Sol", age: 76, favoriteFoods: ["roast chicken"]},
  {name: "Robert", age: 78, favoriteFoods: ["wine"]}
];

const createManyPeople = async (arrayOfPeople, done) => {

const newPerson = await Person.create(arrayOfPeople,
(err,data)=>{
    if(err) return done(err)
    done(null, data);
  }
)
};

const findPeopleByName = async (personName, done) => {

const findPerson = await Person.find({name:personName}, 
(err,data)=>{
  if(err) return done(err)
  done(null, data)
}
)
};

var findOneByFood = function(food, done) {
  Person.findOne({favoriteFoods: food}, function (err, data) {
    if (err) return console.log(err);
    done(null, data);
  });
};


const findPersonById = async (personId, done) => {

const findbyid = await Person.findById({_id:personId},

(err,data)=>{

  if(err) return done(err)
  done(null,data)
}
)

};

const findEditThenSave = async (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findOne(personId,
  (err,data) =>{
    data.favoriteFoods.push(foodToAdd)

    data.save(
      (err,data) =>{

      if(err) return done(err)
      
      done(null, data)

    }
    )
  }
  )

  // console.log(findingPerson)


};

const findAndUpdate = (personName, done) => {
  
  const ageToSet = 20;

  Person.findOneAndUpdate({name:personName},{age:ageToSet},{new:true},
  (err,data)=>{
    if(err) return console.log(err)
    done(null, data)
  })
};



const removeById = (personId, done) => {

Person.findByIdAndRemove(personId,(err,data)=>{
    if(err) return console.log(err)
    done(null, data)
  }) 

};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.remove({name:nameToRemove}, (err,data)=>{
    if(err) return console.log(err)
    done(null, data)
  })

};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  Person.find({ favoriteFoods: foodToSearch })
  .sort({ name: 1 })
  .limit(2)
  .select({ age: 0 })
  .exec((err, data)=>{
    if(err) return done(err)
    done(null, data)
  });

};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
