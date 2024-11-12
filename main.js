const express = require('express');
const {Client}=require('pg');
//const {MongoClient} = require('mongodb');
const path = require("path");
//const MongoClient = require('mongodb/lib/mongo_client');
const mongoose = require('mongoose');

mongoose.set('strictQuery', true);

const flowerSchema = new mongoose.Schema({
    id: Number,
    name: String,
    price: String,
    stock: Number
}, { versionKey: false });

flowerSchema.set('toJSON', {
    transform: (doc, ret) => {
        delete ret.__v;
        return ret;
    }
});

const Flowers = mongoose.models.Flowers || mongoose.model('Flowers', flowerSchema);

//open and connect to the server
const server = express();
const port = 3000;
server.use(express.json());
server.use(express.static(path.join(__dirname, "frontend")));
server.listen(port, () => {
    console.log('Server started on port '+port);
});

server.get('/city', async (req, res) => {
    const city = req.query.name;

    //Connecting to PGAdmin
    if (city === "Tampere"){
        
        //Change to your own PGAdmin data here
        const con=new Client({
            host:"localhost",
            user:"postgres",
            port: 5432,
            password: "Admin",
            database: "TampereSQL"
        }); 
        try {
            await con.connect();
            console.log(`Connected to PostgreSQL database for ${city}`);

            const databaseflowers = await con.query('SELECT * FROM flowers');

            let database = databaseflowers.rows;
            res.json(database);  // Send the query result to the frontend as JSON
            } catch (err) {
                console.error("Postgre database error:", err.message);
                res.status(500).send("Postgre database error: " + err.message);
            } finally {
                await con.end();
                console.log("Database connection closed");
            }
        
        }
        //Connecting to mongoDB and fetch data
    else if (city === "Lahti"){

        try {
            await mongoose.connect('mongodb://localhost:27017/LahtiNoSQL');
            console.log(`Connected to MongoDB database for ${city}`);

            // Shema for database
            /*const Flowers = mongoose.models.Flowers || mongoose.model('Flowers', new mongoose.Schema({
                id: Number,
                name: String,
                price: String,
                stock: Number
            }));*/
            //const Flowers = mongoose.model('Flowers', flowerSchema);

            //Delete _id parameter
            const Flowers = mongoose.models.Flowers || mongoose.model('Flowers', flowerSchema);
            let databaseflowers = await Flowers.find({}).lean();
            databaseflowers = databaseflowers.map(({ _id, ...rest }) => rest)

            console.log(databaseflowers);
            res.json(databaseflowers);
        } catch (err) {
            console.log("MongoDB database error:" + err.message);
            res.status(500).send("MongoDB database error:" + err.message);
        } finally {
            await mongoose.disconnect();
            console.log("MongoDB Connection closed");
        }
                    
    }

    else if (city === "Both"){
        //Change to your own PGAdmin data here
        const con=new Client({
            host:"localhost",
            user:"postgres",
            port: 5432,
            password: "Admin",
            database: "TampereSQL"
        }); 
        
        try {
            await con.connect();
            console.log(`Connected to PostgreSQL database for Tampere`);
            const databaseflowersSQL = await con.query('SELECT * FROM flowers');
            database=databaseflowersSQL.rows;

            await mongoose.connect('mongodb://localhost:27017/LahtiNoSQL');
            console.log(`Connected to MongoDB database for Lahti`);

            const Flowers = mongoose.models.Flowers || mongoose.model('Flowers', flowerSchema);
            //const Flowers = mongoose.model('Flowers', flowerSchema);
            //Delete _id parameter
            let databaseflowersNoSQL = await Flowers.find({}).lean();
            databaseflowersNoSQL = databaseflowersNoSQL.map(({ _id, ...rest }) => rest)

            database = database.concat(databaseflowersNoSQL);
            console.log(database);
            
            res.json(database);  // Send the query result to the frontend as JSON
            } catch (err) {
                console.error("Database error:", err.message);
                res.status(500).send("Database error: " + err.message);
            } finally {
                await con.end();
                await mongoose.disconnect();
                console.log("Database connections closed");
            }
        
    }
})

server.get('/both', async (req, res) => {

    const con=new Client({
        host:"localhost",
        user:"postgres",
        port: 5432,
        password: "Admin",
        database: "TampereSQL"
    }); 
    
    try {
        await con.connect();
        //console.log(`Connected to PostgreSQL database for Tampere`);
        const databaseflowersSQL = await con.query('SELECT * FROM flowers');
        database=databaseflowersSQL.rows;

        await mongoose.connect('mongodb://localhost:27017/LahtiNoSQL');

        const Flowers = mongoose.models.Flowers || mongoose.model('Flowers', flowerSchema);
        //const Flowers = mongoose.model('Flowers', flowerSchema);
        //Delete _id parameter
        let databaseflowersNoSQL = await Flowers.find({}).lean();
        databaseflowersNoSQL = databaseflowersNoSQL.map(({ _id, ...rest }) => rest)

        database = database.concat(databaseflowersNoSQL);
        //console.log(database);
        
        res.json(database);  // Send the query result to the frontend as JSON
        } catch (err) {
            console.error("Database error:", err.message);
            res.status(500).send("Database error: " + err.message);
        } finally {
            await con.end();
            await mongoose.disconnect();
            console.log("Database connections closed");
        }
});

server.post('/insert', async (req, res) => {
    //console.log(req.body);
    const { city } = req.query;
    const {id, name, price, stock} = req.body;

    if(Object.keys(req.body).length === 0) {
        console.error("No data collected from user");
        res.status(500).send("req.body error");
    }
    else if (city === "Tampere") {
        const con = new Client({
            host: "localhost",
            user: "postgres",
            port: 5432,
            password: "Admin",
            database: "TampereSQL"
        });
        try {
            await con.connect();
            await con.query( 'INSERT INTO flowers (id, name, price, stock) VALUES ($1, $2, $3, $4)', [id, name, price, stock]);
            res.json({message: "Data inserted into PostgreSQL in Tampere"});
        }
        catch (err){
            console.error("Error inserting into PostgreSQL:", err);
            res.status(500).send("Database error: "+ err.message);
        } finally {
            await con.end();
        }
    } else if (city === "Lahti") {
        try {
            await mongoose.connect('mongodb://localhost:27017/LahtiNoSQL');
            console.log(`Connected to MongoDB database for Lahti`);

            const Flowers = mongoose.models.Flowers || mongoose.model('Flowers', flowerSchema);
            await Flowers.create({ id, name, price, stock });
            res.json({ message: "Data insert into MongoDB in Lahti"});
        }
        catch (err) {
            console.error("Error inserting into MongoDB:", err);
            res.status(500).send("Database error: " + err.message);
        } finally {
            await mongoose.disconnect();
        }
    }
});

server.post('/delete', async (req, res) => {
    //console.log(req.body);
    const { city } = req.query;
    const { name } = req.body;

    if(Object.keys(req.body).length === 0) {
        console.error("No data collected from user");
        res.status(500).send("req.body error");
    }
    else if (city === "Tampere") {
        const con = new Client({
            host: "localhost",
            user: "postgres",
            port: 5432,
            password: "Admin",
            database: "TampereSQL"
        });
        try {
            await con.connect();
            await con.query( 'DELETE FROM flowers WHERE name = $1', [name]);
            res.json({message: "Data deleted from PostgreSQL in Tampere"});
        }
        catch (err){
            console.error("Error deleting from PostgreSQL:", err);
            res.status(500).send("Database error: "+ err.message);
        } finally {
            await con.end();
        }
    } else if (city === "Lahti") {
        try {
            await mongoose.connect('mongodb://localhost:27017/LahtiNoSQL');
            console.log(`Connected to MongoDB database for Lahti`);

            const Flowers = mongoose.models.Flowers || mongoose.model('Flowers', flowerSchema);
            const result = await Flowers.deleteOne({ name: name });

            if (result.deletedCount === 0){
                 res.json({ message: `In ${city} there is no plant named `+ name});
            }
            else{
                res.json({message: `Data deleted from MongoDB in Lahti with name "${name}"`})
            }
           
        }
        catch (err) {
            console.error("Error inserting into MongoDB:", err);
            res.status(500).send("Database error: " + err.message);
        } finally {
            await mongoose.disconnect();
        }
    }
})

server.get('/', (reg, res) => {
    res.send('Flower Shop');
});