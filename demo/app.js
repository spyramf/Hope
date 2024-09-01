require("dotenv").config();
require('./models/db');


const User = require('./models/users');
const express = require('express');
const app = express();
const userRouter = require('./routes/user');
const schemes= require('./models/schemes');








// app.use(express.json());

// app.use((req, res, next) => {
//     req.on('data', chunk => {
//         const data = JSON.parse(chunk);
//         req.body = data;
//         next();
//     });
// });


app.use(express.json());


 app.use(userRouter);

app.post('/test', async (req, res) => {
    let data = new s_names(req.body)
    let result = await data.save();
    console.log(req.body)
    res.send(result);
});


app.post('/test-name', async (req, res) => {
    let data = new schemes(req.body)
    let result = await data.save();
    console.log(req.body)
    res.send(result);
});

app.get('/list', async (req, res) => {
    let data = await schemes.find();
    res.send(data)
});




app.get("/", (req, res) => {
    res.send("<h1>Hello World</h1>");
});





app.listen(8000, () => {
  console.log("port is listening");
});



// mongodb + srv://spyra:<password>@cluster0.qokizow.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0