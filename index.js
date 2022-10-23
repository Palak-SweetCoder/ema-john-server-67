const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;
const app = express();

//middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.b1srut4.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        // await client.connect();
        const productCollection = client.db("emaJohn").collection("products");
        //load data from mongodb
        app.get('/products', async (req, res) => {
            const query = {};
            const cursor = productCollection.find(query);
            const products = await cursor.toArray();
            res.send(products)
        });
        //for pagination or get count the data
        app.get('/productCount', async(req,res)=>{
            const query = {};
            const cursor = productCollection.find(query);
            const count = await cursor.count();
            res.send({count});
        })

    }
    finally {
        // await client.close();
    }
}
run().catch(console.dir);


// const collection = client.db("emaJohn").collection("product");

app.get('/', (req, res) => {
    res.send('John server running');
})

app.listen(port, () => {
    console.log('John server running port', port)
})