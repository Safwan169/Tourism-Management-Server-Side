const express = require('express');
const app = express();
const cors=require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const port =process.env.PORT || 3028;

// middleware
app.use(cors());
app.use(express.json());





const uri = `mongodb+srv://${process.env.DATA_1}:${process.env.DATA_2}@cluster0.6zehkma.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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
    
    const database = client.db("Transport");
    const data = database.collection("data");
    const data2 = database.collection("country");
    // const result = await haiku.insertOne(doc);
    
   
  
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // app.get('/ad',async(req,res)=>{
    //   res.send('daf')
    // })

    app.post('/ad', async (req, res) => {
      const datas = req.body;
      console.log(datas);
      const result = await data.insertOne(datas);
      res.send(result);
  })
  app.get('/ad',async (req,res)=>{
    const cursor = data.find();
            const result = await cursor.toArray();
            res.send(result);
  })
  app.get('/country',async (req,res)=>{
    const cursor = data2.find();
            const result = await cursor.toArray();
            res.send(result);
  })

//   app.get('/Country/:Country', async (req, res) => {
//     const ids = req.params.Country;
//     console.log(ids)
//     const query = { Country:  (ids) }
//     const result = await data.find(query);
//     res.send(result);
//     console.log(result)
// })

app.put('/up/:idd', async (req, res) => {
  const id = req.params.idd;
  console.log(id)
  const filter = { _id: new ObjectId(id) }
  const options = { upsert: true };
  const datas1 = req.body;
  console.log(datas1)

  const updateData = {
      $set: {
          cost: datas1.cost,
          options: datas1.options,
          time: datas1.time,
          url: datas1.url,
          visitors: datas1.visitors,
          location: datas1.location,
          Country: datas1.Country,
          description: datas1.description
      }
  }

  const result = await data.updateOne(filter, updateData, options);
  res.send(result);
})


// delate
app.delete('/de/:id', async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) }
  const result = await data.deleteOne(query);
  res.send(result);
})


    // console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})