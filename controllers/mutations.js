const fs = require('fs');
const mongoose = require('mongoose');
const MongoConversation = mongoose.model('conversations')

const mutations = (req, res) => {
    // todo: get this working with MongoDB Atlas
    const file = req.body.file
    const text = req.body.text
    const filePath = `./conversations/${file}`
    let conversation = JSON.parse(fs.readFileSync(filePath));
    conversation.content = text;
    let ready = JSON.stringify(conversation);

    fs.writeFile(filePath, ready, (err) => {
        if (err){
        console.log(err)};
        })

    res.status(201).send({
        "ok": true,
        "msg": "conversation changed",
        "text": text
    });
}

const mutationLogger = (req, res) => {
    // todo: get this working with MongoDB Atlas

    const file = req.body.file;
    const filePath = `./conversations/${file}`
    const mutation = req.body.mutation;

    let conversation = JSON.parse(fs.readFileSync(filePath));
    conversation.lastMutation = mutation;
    let ready = JSON.stringify(conversation);

    fs.writeFile(filePath, ready, (err) => {
        if (err){
        console.log(err)};
        })
    
    res.status(200).send({
        "ok": true,
        "msg": "mutation logged",
        "mutation": mutation
    });
}

module.exports = {
    mutations,
    mutationLogger
}