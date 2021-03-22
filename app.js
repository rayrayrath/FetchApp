var express = require('express');
var path = require('path');

//leaving in the bodyParser in case we ever send up form data and need to get data out of form
var bodyParser = require('body-parser');


var app = express();

// view engine setup
app.set('view engine', 'ejs');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'));

let myWalkers = [];

// define a constructor to create Walker objects
let DogWalker = function (pFirst, pLast, pEmail, pPhone, pExperience, pDays) {
    this.ID = Math.random().toString(16).slice(5)  // tiny chance could get duplicates!
    this.FirstName = pFirst;
    this.LastName = pLast;
    this.Email = pEmail;
    this.Phone = pPhone;
    this.Experience = pExperience;
    this.Days = pDays; //Monday,Tuesday,Wednesday,Thursday,Friday,Saturday,Sunday
};

// index page 

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});


/* GET walkerlist. */
app.get('/ListAll', function(req, res) {
    res.json(myWalkers);
});



/* POST to addWalker */
app.post('/addWalker', function(req, res) {
    console.log(req.body);
    myWalkers.push(req.body);
    // set the res(ponse) object's status propery to a 200 code, which means success
    res.status(200).send(JSON.stringify('success'));
  });


app.delete('/deleteWalker/:id', (req, res) => {
    let id = req.params.id;
    for (var i = 0; i < myWalkers.length; i++) {
        if (myWalkers[i].ID === id) {
            myWalkers.splice(i, 1);  // remove 1 element at loc i
            res.send('success');
        }
    }
    res.status(404);  // if not found
});


// error page 
app.get('/error', function(req, res) {
    // should get real data from some real operation, but instead ...
    let message = "some text from someplace";
    let errorObject ={
        status: "this is real bad",
        stack: "somebody called #$% somebody who called somebody <awful>"
    };
    res.render('pages/error', {  // pass the data to the page renderer
        message: message,
        error: errorObject
    });
});



app.listen(process.env.Port || 80);  // not setting port number in www.bin, simple to do here
//console.log('3000 is the magic port');

module.exports = app;
