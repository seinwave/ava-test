const fs = require('fs');
const mongoose = require('mongoose');
const MongoConversation = mongoose.model('conversations')

function Conversation(fileName, id, content, lastMutation){
    this.fileName = fileName
    this.id = id;
    this.lastMutation = lastMutation;
    this.content = content;
}




const get_conversations = (req, res) =>{
    let conversations = []
    let fileName
    let id
    let content
    let lastMutation = [];
    let Convos = MongoConversation.find({})
    console.log(Convos.collection.collection);

    fs.readdir('./conversations', (err,files) => {
        files.map(file => {
            let rawData = fs.readFileSync(`./conversations/${file}`);
            let conversation = JSON.parse(rawData);
            id = conversation.id; 
            fileName = conversation.fileName
            content = conversation.content;
            lastMutation = conversation.lastMutation;
            let newConversation = new Conversation(fileName, id, content, lastMutation)
            return conversations.push(newConversation)
        })

    return res.status(200).send(conversations);
    })
}


const delete_conversations = (req, res) =>{
    const file = req.body.file;
    fs.unlink(`./conversations/${file}`, (err) =>
    { if (err){
            console.log(err)
        }
    })

    return res.status(204).send({
        "ok": true,
        "msg" : "conversation deleted"
        });
}

const new_conversation = async (req,res) => {
    const file = req.body.file;
    const filePath = `./conversations/${file}.json`

    let id = file;
    let fileName = `${file}.json` 
    let content = '';
    let lastMutation = []

    // keeping both server-side file writing
    // and mongoDB writing for now,
    // while I develop everything around 
    // mongoDB atlas
    const conv = new Conversation(fileName,id,content,lastMutation);
    const convToLog = JSON.stringify(conv);
    const mongoReady = new MongoConversation({
        fileName: conv.fileName,
        id: conv.id,
        content: conv.content,
        lastmutation: conv.lastMutation,
    })
    try{ 
        let reg = await mongoReady.save();
        console.log("Conversation Saved", reg);
    } catch (err){
        console.log(err);
    }

    fs.writeFileSync(filePath, convToLog, (err) => {
        if (err){
        console.log(err)
        };
    })
    return res.status(200).send({
            "msg" : "conversation created"
    })
}

const rename_conversation = (req, res) =>{
    const file = req.body.file[0].fileName;
    const oldPath = `./conversations/${file}`
    const newName = req.body.newName;

    let rawData = fs.readFileSync(oldPath);
    let conversation = JSON.parse(rawData);
    conversation.id = newName;
    let ready = JSON.stringify(conversation);

    fs.writeFileSync(oldPath, ready, err =>{
        if (err) console.log(err);
    })

    return res.status(200).send({
        "msg" : "conversation renamed"
    })
}


module.exports = {
    get_conversations,
    delete_conversations,
    new_conversation,
    rename_conversation
}