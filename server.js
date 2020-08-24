const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors())
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use( (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 
    'Origin, X-Requested-With, Content-Type, Accept');
    next();
});


// ping & pong — simple call & response
const pi = require('./controllers/ping');
app.get('/ping', (req,res) =>{
    pi.ping(req,res);
})

// getting author (that's me) info, when requested
const info = require('./controllers/info');
app.get('/info', (req,res) => {
    info.info(req,res);
})


// for posting mutations, to be handled by
// the frontend & transformer functions
const mutations = require('./controllers/mutations');
app.post('/mutations', (req,res) => {
    mutations.mutations(req,res);
})

// requesting conversations — ie, the current
// documents receiving edits
const conversations = require('./controllers/conversations');
app.get('/conversations', (req,res) => {
    conversations.get_conversations(req,res);
})

// deleting conversations — ie, removing
// a document from the backend
app.delete('/conversations', (req,res) => {
    conversations.delete_conversations(req,res);
})

//adding a new conversation
app.post('/conversations', (req,res) => {
    conversations.new_conversations(req,res);
})




const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`live and listening on port ${PORT}.`)
})