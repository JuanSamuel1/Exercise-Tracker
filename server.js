const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
require('dotenv').config()

app.use(cors())
app.use(express.static('public'))
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
console.log(mongoose.connection.readyState)

const personSchema = new mongoose.Schema({
   username: { type: String, unique: true } });
const Person = mongoose.model("Person", personSchema);

const exerciseschema = new mongoose.Schema({ 
  userId: String, 
  description: String, 
  duration: Number, 
  date: Date })
const Exercise = mongoose.model("Exercise", exerciseschema)

app.post("/api/users", (req, res) => {
    const newPerson = new Person({
      username: req.body.username
    })
    newPerson.save((err,data)=>{
      if(err){
        return res.json("username already taken")
      }
      res.json({
        username: data.username,
        _id: data.id
      })
    })
})

app.get("/api/users", (req, res) => {
        Person.find({}, (err, data) => {
            if (!data) {
                res.send("No users")
            } else {
                res.json(data)
            }
      })
})

app.post("/api/users/:_id/exercises",(req,res)=>{
    const userId = req.params._id
    var {description, duration, date} = req.body

    if(!date){
      date = new Date()
    }

    Person.findById(userId,(err,data)=>{
      if(err || !data){
        res.send("user unknown")
      }
      else{
        var username = data.username
        const newExercise = new Exercise({
          userId, description, duration,date
        })
        newExercise.save((err,data)=>{
          res.json({
            _id: userId,
            username: username,
            description: description,
            duration: +duration,
            date: new Date(date).toDateString()  
          })
        })
      }
    })
})


app.get("/api/users/:id/logs",(req,res)=>{
  /*
  const userId = req.params.id
  const {from , to, limit} = req.body
  Person.findById(userId, (err,data)=>{
    if(err){
      return res.send("Unknown userId")
    }
    Exercise.find({userId}, (err,exercise)=>{
      if(err){
        return
      }
      var returnObject = []
      exercise.forEach((item)=>{

      })
    })
  })
  */
  const userId = req.params.id
  const { from, to, limit } = req.query;
    Person.findById(userId, (err, data) => {
        if (!data) {
            res.send("Unknown userId")
        } else {
            const username = data.username;
            console.log({ "from": from, "to": to, "limit": limit })
            Exercise.find({ userId }, {
                    date: {
                        $gte: new Date(from),
                        $lte: new Date(to)
                    }
                }).select(["id", "description", "duration", "date"]).limit(+limit)
                .exec((err, data) => {
                    let customdata = data.map(exer => {
                        let dateFormatted = new Date(exer.date).toDateString();
                        return { id: exer.id, description: exer.description, duration: exer.duration, date: dateFormatted}
                    })
                    if (!data) {
                        res.json({
                          "count": 0,
                            "userId": userId,
                            "username": username,
                            "log": []
                        })

                    } else {
                        res.json({
                          "count":data.length,
                          "username": username,
                          "userId": userId,
                            "log": customdata
                        })
                    }
                    
                })
        }
    })
})

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
