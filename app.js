const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('You reached this endpoint!')
});


app.listen(5555, (err) => {
    console.log(err ? err : 'Express server listening...')
});