const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000

let db = {};

// app.use(express.static('public', options))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.post('/login', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    res.send('Access Granted');
})

app.get('/', (req, res) => {
    res.sendFile('/index.html');
    res.send('Hello World!');
})



app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
});



console.log('hi');