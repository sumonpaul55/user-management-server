const express = require("express")
const cors = require("cors")
require("dotenv").config();
// require('dotenv').config()

const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;
// use middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USERS}:${process.env.DB_PASS}@cluster0.nrfwsc1.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        const userCollection = client.db("MyUsers").collection("users");

        // get all data or user form data base
        app.get("/", async (req, res) => {
            const allData = userCollection.find();
            const result = await allData.toArray()
            console.log(result)
            res.send(result)
        })
        // get user using post method
        app.post("/users", async (req, res) => {
            const newUser = req.body;
            const result = await userCollection.insertOne(newUser)
        })
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.log);












// app.get("/", async (req, res) => {
//     res.send("Server is Runnig from server Side")
// })
app.listen(port, () => {
    console.log((`Server Running from ${port}`))
})