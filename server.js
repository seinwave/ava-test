// ---- GETTING REQUIRED MODULES ----
const express = require('express');
const app = express();
const http = require('http');

const cors = require('cors');
app.use(cors());

// for handling POST requests
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// setting CORS configuration
app.use( (req, res, next) => {
    
    res.header('Access-Control-Allow-Origin', "*")
    res.header('Access-Control-Allow-Headers', 
    'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// shareDB modules
const ShareDB = require('sharedb');
const backend = new ShareDB();

// websocket modules
const WebSocket = require('ws');
const WebSocketJSONStream = require('@teamwork/websocket-json-stream');


// ---- CONFIGURING OT BACKEND ----

// connecting server-hosted documents
// to shareDB backend
var connection = backend.connect();
  var doc = connection.get('textAreas', 'textarea');
  doc.fetch(function(err) {
    if (err) throw err;
    if (doc.type === null) {
      doc.create({content: ''});
      return;
    }
});


// creating a websocket-ready server,
// that shareDB is listening to
const server = http.createServer(app);
const wss = new WebSocket.Server({server: server});
wss.on('connection', (ws) => {
    const stream = new WebSocketJSONStream(ws);
    backend.listen(stream);
})


// ---- ROUTING ----

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

// for logging the last known mutation
app.patch('/mutations', (req,res) => {
    mutations.mutationLogger(req,res);
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
    conversations.new_conversation(req,res);
})

//renaming conversations
app.put('/conversations', (req,res) => {
    conversations.rename_conversation(req,res);
})


// ---- ERROR HANDLING ----

app.get('*', (req, res, next) => {
    setImmediate(() => { next(new Error('Error!')); });
  });

app.put('*', (req, res, next) => {
    setImmediate(() => { next(new Error('Error!')); });
  });

app.post('*', (req, res, next) => {
    setImmediate(() => { next(new Error('Error!')); });
  });  
  
app.use((error, req, res, next) => {
    res.json({
    name: error.name, 
    message: error.message,
    stack: error.stack });
  });
  

// ---- INITIALIZING THE SERVER ----

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log(`live and listening on port ${PORT}.`)
})