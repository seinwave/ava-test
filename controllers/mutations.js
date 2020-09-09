const fs = require('fs');
const mongoose = require('mongoose');
const MongoConversation = mongoose.model('conversations')

const mutations = (req, res) => {
    // todo: get this working with MongoDB Atlas
    const file = req.body.file
    const text = req.body.text
    await MongoConversation.findOne({fileName: file}, function (err, doc) {
        if (err){
            console.log(err);
        };
        doc.content = text;
        return doc.save(); 
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
    const mutation = req.body.mutation;
    await MongoConversation.findOne({fileName: file}, function (err, doc) {
        if (err){
            console.log(err);
        };
        doc.lastMutation = mutation;
        return doc.save(); 
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