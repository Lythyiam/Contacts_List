const mongoose = require('mongoose');
const contact = require('./schema-stu');

async function dbconnect(param, action, res) {

  mongoose.connect('mongodb://127.0.0.1:27017/mydb', { useNewUrlParser: true })
    .then(() => {
      console.log('Connected to database!');

      if (action === "create") {
        console.log(action);
        createcontact(param, contact);
      }

      if (action === "update") {
        console.log(action);
        updatecontact(param, contact);
      }

      // uncomment the function below or comment out the closing `)` on the commented function
      if (action === "getall") {
        console.log(action);
        getallcontact(contact, res);
      }

      if (action === "delete") {
        console.log(action);
        deletecontact(param, contact);
      }
    })
    .catch(err => console.error('Connection error:', err));
}

const createcontact = (param, u) => {
  const contact = new u({ firstname: param.firstname, name: param.name, age: param.age, email: param.email });
  contact.save()
    .then(() => console.log('contact record created in mongodb created!'))
    .catch(err => console.error('Error creating contact:', err));
}

const updatecontact = async (param, u) => {
  const student1 = await u.findByIdAndUpdate(param.id, { firstname: param.firstname, name: param.name, age: param.age, email: param.email });
  console.log('Student record updated in mongodb updated! ' + student1 + 'json coming' + JSON.stringify(student1));
}


const deletecontact = async (param, u) => {
  const contact2 = await u.deleteOne({ _id: param });
  console.log('contact record delete in mongodb updated !');
};

// uncomment the function below or comment out the closing `)` on the commented function
const getallcontact = async (u, res) => {
  const contacts = await u.find();
  console.log('contacts found in mongodb listed!' + contacts + 'json coming' + JSON.stringify(contacts));
  const contactsWithIds = contacts.map(contact => {
    return {
      ...contact.toObject(),
      id: contact._id.toString()
    };
  });
  res.send(contactsWithIds);
}

module.exports = { dbconnect };