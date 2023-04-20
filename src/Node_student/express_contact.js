const dbc= require('./NodeMongoose2-stu');
const { json } = require('express');
const express = require('express');
const cors = require('cors')
const app = express();
//comment the 1 line
//comement the 21 line

app.use(express.json()); // this middleware is needed to parse request body as JSON
app.use(cors());

app.get('/home', (req, res) => {
    const contactId = req.query.id;
    // do something with contactId 
    res.send('contact with id ' + contactId + ' retrieved successfully');
  });

app.post('/addcontacts', (req, res) => {
    const contactData = req.body;
    console.log(JSON.stringify(req.body.name));
    let x = dbc.dbconnect(req.body,"create",res);
    res.send(x);

});

app.put('/updatecontacts', (req, res) => {
    const contactData = req.body;
    dbc.dbconnect(req.body,"update",res);
    res.send('Contact Object sent successfully to node js' + req.body.name);
});

app.delete('/deletecontacts/:id', (req, res) => {
    const contactId = req.params.id;
    console.log("ELEMENT SUPPRIME : "+contactId)
    dbc.dbconnect(contactId,"delete",res);
});  


//below method will be get
app.get('/getallcontacts',  (req, res) =>  {
    const contactData = req.body;
    let x = dbc.dbconnect("0","getall",res);  

 //res.send(x);
});

//use applicaiton/json in body content type when testing from advanced rest client

app.listen(3005, () => console.log('Server running on port 3005'));
