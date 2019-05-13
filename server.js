const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const {Repo} = require('./database/db.js');

const port = process.env.PORT || 1997
const saltRounds = 10;

const mongoDB = 'mongodb://127.0.0.1/my_database'
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});


// var db = mongoose.connection;
mongoose.connect(mongoDB).then(connection => {
    console.log('Connected');
}).catch(function(err){
    console.log(err);
});

// db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser());


app.use(express.static('puplic'))

// app.use(express.static('public', options))
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());



app.post('/', (req, res) => {
    res.redirect('index.html');
})

app.post('/signup', function(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);
    Repo.create({username:username, password:hashedPassword, email:email}).then(() => {
        console.log(username,hashedPassword, email);
        return res.send('Finally you did it !!')
    }).catch((err) => {
        if(err.code === 11000){
            return res.status(400).send(`This account already used!
            try to create another one :D`)
        } else {
            return res.send('Unknown error, Try again please!');

        }
    });

    // Repo.users[password] = hashedPassword;

    return res.status(201).send('Sign up successful');
});

app.post('/signin', function(req, res) {
    console.log(Repo)
    const username = req.body.username;
    const password = req.body.password;
    //Check if the user exists in the database  
    Repo.findOne({username : username}).then(function(user){
        if(!user) {
            return res.status(401).send('Please sign up');
        } else {
             const oldPassword = Repo.user[password];
    bcrypt.compare(password, oldPassword).then((isMatching) =>{
        if(isMatching){
            const token = jwt.sign({username: user.username}, {expiresIn: 4000});
                return res.send({token: token});
        } else {
            return res.status(401).send('Wrong password');
        }
    }).catch((err) => {
        if(err) {
            console.log(err);
        }   
    });
        }
    // if(!Repo.users[username]){ //did not use dot notation to not enter to the value.
    //     return res.status(401).send('Please sign up');
    // }
    //Compare with already stored password
   
 });

    //to compare the already registered password to the newly entered one 
    // bcrypt.compare(password, existingPassword, function(err, isMatching){
    //     if(isMatching){
    //         //Create a token and send to client
    //         //a token is created to keep the user logged in unless if he/she logs out of their account
    //         //and it always has an expiry date.
    //         const token = jwt.sign({user: username}, SECRET_KEY, {expiresIn: 10});
    //         return res.send({token: token});
    //     } else {
    //         return res.status(401).send('Wrong password');
    //     }
    // });
});



app.get('/', (req, res) => {
    console.log('me')
    res.redirect('index.html');
})



app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
});


