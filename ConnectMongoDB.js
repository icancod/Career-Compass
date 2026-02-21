
const {MongoClient} = require('mongodb')

let dbConnection

module.exports = {
    connectToDb:(cb) =>{
    MongoClient.connect('mongodb://localhost:27017/roadmapdb')
    .then((client)=>{
        dbConnection= client.db()
        return cb()
    })
    .catch(err =>{
        console.log(err)
        return cb(err)
    })
    },
    getDb:() => dbConnection
    }




//     const uri = 'mongodb://localhost:27017'; // Assuming MongoDB is running locally on the default port
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// let db; // Declare a variable to store the reference to the database

// client.connect((err) => {
//     if (err) {
//         console.error('Error connecting to MongoDB:', err);
//         return;
//     }
//     console.log('Connected to MongoDB');
//     db = client.db('your_database_name'); // Replace 'your_database_name' with your actual database name
// });
