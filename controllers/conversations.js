const fs = require('fs');
const mongoose = require('mongoose');
const MongoConversation = mongoose.model('conversations')

function Conversation(fileName, id, content, lastMutation){
    this.fileName = fileName
    this.id = id;
    this.lastMutation = lastMutation;
    this.content = content;
}




const get_conversations = async (req, res) =>{
    let conversations = []
    let fileName
    let id
    let content
    let lastMutation = [];
    let Convos = await MongoConversation.find({})
    console.log(Convos);

    Convos.map(conversation => {
        id = conversation.id; 
        fileName = conversation.fileName
        content = conversation.content;
        lastMutation = conversation.lastMutation;
        let newConversation = new Conversation(fileName, id, content, lastMutation)
        return conversations.push(newConversation)
    })

    return res.status(200).send(conversations);
}


const delete_conversations = async (req, res) =>{
    const file = req.body.file;
    await MongoConversation.deleteOne({fileName: file}, function (err, obj) {
        if (err){
            console.log(err);
        };
        return console.log(obj.ok === 1)
    })
    return res.status(204).send({
        "ok": true,
        "msg" : "conversation deleted"
        });
}

const new_conversation = async (req,res) => {
    const file = req.body.file;
    let id = file;
    let fileName = `${file}.json` 
    let content = '';
    let lastMutation = []
    const conv = new Conversation(fileName,id,content,lastMutation);
    const mongoReady = new MongoConversation({
        fileName: conv.fileName,
        id: conv.id,
        content: conv.content,
        lastmutation: [],
    })
    try{ 
        let reg = await mongoReady.save();
        console.log("Conversation Saved", reg);
    } catch (err){
        console.log(err);
    }
    return res.status(200).send({
            "msg" : "conversation created"
    })
}

const rename_conversation = async (req, res) =>{
    const file = req.body.file[0].fileName;
    const newName = req.body.newName;
    await MongoConversation.findOne({fileName: file}, function (err, doc) {
        if (err){
            console.log(err);
        };
        doc.id = newName;
        return doc.save(); 
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