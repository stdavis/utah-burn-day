var Alexa = require('alexa-app');
var app = new Alexa.app('utahburnday');

app.launch((req, res) => {
    res.say('The current burn day for Salt Lake County is green (no restrictions).');
});

module.exports = app;
