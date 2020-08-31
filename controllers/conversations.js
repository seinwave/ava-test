const fs = require('fs');

function Conversation(id, content, lastMutation){
    this.id = id;
    this.lastMutation = lastMutation;
    this.content = content;
}

const get_conversations = (req, res) =>{
    let conversations = []
    let id
    let content
    let lastMutation = []; 
    fs.readdir('./conversations', (err,files) => {
        files.map(file => {
            let rawData = fs.readFileSync(`./conversations/${file}`);
            let conversation = JSON.parse(rawData);
            id = conversation.id; 
            content = conversation.content;
            lastMutation = conversation.lastMutation;
            return conversations.push(new Conversation(id, content, lastMutation))
        })

    return res.status(200).send(conversations);
    })
}


const delete_conversations = (req, res) =>{
    const file = req.body.file;
    fs.unlink(`./conversations/${file}.json`, (err) =>
    {
        if (err){
            console.log(err)
        }
    })

    return res.status(204).send({
        "ok": true,
        "msg" : "conversation deleted"
        });
    
}

const new_conversation = (req,res) => {
    console.log(req.body.file)
    const file = req.body.file;
    const filePath = `./conversations/${file}.json`

    let id = file; 
    let content = '';
    let lastMutation = []

    const convToLog = 
    JSON.stringify(new Conversation(id,content,lastMutation));
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
    const file = req.body.file[0].id;
    const oldPath = `./conversations/${file}.json`
    const newName = req.body.newName;
    const newPath = `./conversations/${newName}.json`

    let rawData = fs.readFileSync(oldPath);
    let conversation = JSON.parse(rawData);
    conversation.id = newName;
    let ready = JSON.stringify(conversation);

    
    fs.renameSync(oldPath, newPath, (err) => {
        if (err) console.log(err)
    });

    fs.writeFile(newPath, ready, err =>{
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