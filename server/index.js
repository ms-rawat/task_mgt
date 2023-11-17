const express= require('express')
const cors=require('cors')
  const { MongoClient, ObjectId } = require('mongodb');

const app= express();
app.use(cors())
app.use(express.json())
async function datasend(){
    let client = new MongoClient('mongodb://127.0.0.1:27017');
    await client.connect();
    console.log("connected to database also ")
   const db = client.db("task_mgt")
   const collection = db.collection('tasks')
   const data= await collection.find().toArray()
   
    return await data;
   
  
}


app.get('/',async (req,res)=>{

    const data= await datasend();
    res.json(data)



})

app.post('/delete', async(req,res)=>{
let data=req.body._id
    let client = new MongoClient('mongodb://127.0.0.1:27017');
    await client.connect();
    console.log("connected to database also ")
   const db = client.db("task_mgt")
   const collection = db.collection('tasks')
  let response=await collection.deleteOne({'_id': new ObjectId(req.body._id) })
  .then(response=>{
    if(response.deletedCount>=1)
    {
      res.status(200).json({message:'deleted succesfully'})
      console.log(response.deletedCount)
    }
    else{
      res.status(400).json({message:'some error eccored'})
      console.log(response.deletedCount)
  
    }
  })

})

app.post('/update', async (req, res) => {
  const data = req.body;
  console.log(data);

  try {
    const client = new MongoClient('mongodb://127.0.0.1:27017');
    await client.connect();
    console.log("Connected to the database");

    const db = client.db("task_mgt");
    const collection = db.collection('tasks');

    const response = await collection.updateOne(
      { "_id": new ObjectId(data._id) },
      {
        $set: {
          "TaskID": data.heading,
          "DueDate": data.dueDate,
          "TaskDescription": data.desc
        }
      }
    );

    if (response.modifiedCount >= 1) {
      res.status(200).json({ message: "Updated successfully" });
    } else {
      res.status(400).json({ message: "Update failed" });
    }
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


app.post('/insert', async (req, res) => {
  const data = req.body;
  console.log(data);

  try {
    const client = new MongoClient('mongodb://127.0.0.1:27017');
    await client.connect();
    console.log("Connected to the database");

    const db = client.db("task_mgt");
    const collection = db.collection('tasks');

    const response = await collection.insertOne(
      
      {
         
          "TaskID": data.heading,
          "DueDate": data.dueDate,
          "TaskDescription": data.desc
        
      }
    );

    if (response.insertedId) {
      res.status(200).json({ message: "Task Added" });
    } else {
      res.status(400).json({ message: "try again" });
    }
  } catch (error) {
    console.error('Error in insertion of task:', error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});










app.listen(8000,()=>console.log("connnected"))
 