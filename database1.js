const { MongoClient } = require('mongodb')
// Replace the uri string with your MongoDB deployment's connection string.
const uri = "mongodb://0.0.0.0:27017/";
const client = new MongoClient(uri);
var status = "1";
/*
exports.insertlocal = function (txtusername,txtpassword,passdata){
    console.log(`${txtusername} + ${txtpassword} + ${passdata})`);
async function run() {
    try {
  
      const database = client.db("mohandb");
      const students = database.collection("students");
  
      // create a document to insert
  
      //const doc = {usn : "21DBCAG001",name: "mohan",dob: "02-May-2023",gender: "Male",mobileno: "1234567890",username: `${txtusername}`,password: `${txtpassword}` }
  
      const doc = JSON.parse(`${passdata}`);

     //insert one record to students collections
      //const result = await students.insertOne(doc);

      const result = await  students.insertOne(doc, function(err, res) {
        if (err) throw err;
                console.log("Number of documents inserted: " + res.insertedCount);
                return ("Number of documents inserted: " + res.insertedCount);
      });

      console.log(`document inserted with the _id: ${result.insertedId}`);
      
      if(!result){
          status = "0";
    }
      
    } finally {
     await client.close();
    }   
  }
  run().catch(console.dir);
 return Date() + status;
}*/


exports.registrationinsert= function (passdata){
  console.log(`${passdata})`);
async function run() {
  try {

    const database = client.db("roadmapdb");
    const registration = database.collection("registration");

    // create a document to insert

    //const doc = {usn : "21DBCAG001",name: "mohan",dob: "02-May-2023",gender: "Male",mobileno: "1234567890",username: `${txtusername}`,password: `${txtpassword}` }

    const doc = JSON.parse(`${passdata}`);

   //insert one record to students collections
    //const result = await students.insertOne(doc);

    const result = await  registration.insertOne(doc, function(err, res) {
      if (err) throw err;
              console.log("Number of documents inserted: " + res.insertedCount);
              return ("Number of documents inserted: " + res.insertedCount);
    });

    console.log(`document inserted with the _id: ${result.insertedId}`);
    
    if(!result){
        status = "0";
  }
    
  } finally {
   await client.close();
  }   
}
run().catch(console.dir);
return Date() + status;
}

exports.contactinsert= function (passdata){
  console.log(`${passdata})`);
async function run() {
  try {

    const database = client.db("roadmapdb");
    const contact = database.collection("contact");

    // create a document to insert

    //const doc = {usn : "21DBCAG001",name: "mohan",dob: "02-May-2023",gender: "Male",mobileno: "1234567890",username: `${txtusername}`,password: `${txtpassword}` }

    const doc = JSON.parse(`${passdata}`);

   //insert one record to students collections
    //const result = await students.insertOne(doc);

    const result = await  contact.insertOne(doc, function(err, res) {
      if (err) throw err;
              console.log("Number of documents inserted: " + res.insertedCount);
              return ("Number of documents inserted: " + res.insertedCount);
    });

    console.log(`document inserted with the _id: ${result.insertedId}`);
    
    if(!result){
        status = "0";
  }
    
  } finally {
   await client.close();
  }   
}
run().catch(console.dir);
return Date() + status;
}


exports.coursesinsert= function (passdata){
  console.log(`${passdata})`);
async function run() {
  try {

    const database = client.db("roadmapdb");
    const courses = database.collection("courses");

    // create a document to insert

    //const doc = {usn : "21DBCAG001",name: "mohan",dob: "02-May-2023",gender: "Male",mobileno: "1234567890",username: `${txtusername}`,password: `${txtpassword}` }

    const doc = JSON.parse(`${passdata}`);

   //insert one record to students collections
    //const result = await students.insertOne(doc);

    const result = await  courses.insertOne(doc, function(err, res) {
      if (err) throw err;
              console.log("Number of documents inserted: " + res.insertedCount);
              return ("Number of documents inserted: " + res.insertedCount);
    });

    console.log(`document inserted with the _id: ${result.insertedId}`);
    
    if(!result){
        status = "0";
  }
    
  } finally {
   await client.close();
  }   
}
run().catch(console.dir);
return Date() + status;
}

