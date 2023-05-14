const express = require('express');
const app = express();
const { MongoClient } = require('mongodb');

const cors = require('cors');

app.use(express.json());
const uri = "mongodb+srv://demons:JudVunW7lyHqmiYW@cluster0.o8bwypj.mongodb.net/?retryWrites=true&w=majority";
const dbName = 'personal_trial';

async function main() {
  // Use connect method to connect to the server
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('port_result');
  const coll_pswd = db.collection('pswd_result');
  const coll_sys = db.collection('sys_result');

  

  // Set up the API endpoint to retrieve all documents in the collection

  app.get('/api/trial1/prt', async (req, res) => {
    try {
      const findResult = await collection.find().toArray();

      // console.log('Found documents =>', findResult);
      res.json(findResult);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error fetching data from trial1 collection');
    }
  });

  app.get('/api/trial1/pswd', async (req, res) => {
    try {
      const pswd_result = await coll_pswd.find({}).sort({_id:-1}).toArray()

      // console.log(pswd_result)

      res.json(pswd_result);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error fetching data from trial1 collection');
    }
  });

  app.get('/api/trial1/sysn', async (req, res) => {
    try {
      const sys_result = await coll_sys.find({}).sort({_id:-1}).toArray()

      // console.log(sys_result)
      
      res.json(sys_result);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error fetching data from trial1 collection');
    }
  });
    
  
  return 'done.';
}

main()
.catch(console.error);

app.use(cors()); 

const PORT = 1800;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});