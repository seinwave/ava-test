const fs = require('fs');

const get_conversations = (req, res) =>{

    let conversations = []
    fs.readdir('./conversations', (err,files) => {
        files.map(file => {
            return conversations.push({"id":file})
        })

    // sure there's a more efficient way of doing this...
    conversations.map((c) => {
        c.content = fs.readFileSync(`./conversations/${c.id}`, 'utf8', (err, data) => { 
            console.log(data)   
            return data;
        })
    })

    return res.status(200).send(conversations)
    })
}


// SOME SCRATCH,
// TRYING TO READ CONTENT OF EACH FILE
// USE REDUCE() YOU COWARD
// conversationProcesser = (file, content, arr) => {
//     arr.push({"id":file, "content":content})
//     console.log(arr)
//     return arr;
// }


// fs.readdir('./conversations', (err,files) => {
//     files.map(file => {
//         console.log(file)
//         conversations.push({"id" : file})
//         console.log(conversations)
//         return conversations
        
//         // fs.readFile(`./conversations/${file}`, "utf8", (err,data) =>{
//         //     if (err) throw err;
//         //     const content = data;
//         //     console.log(content)
//         //     return conversationProcesser(file, content, conversations);
//         // })
//     })

//     return conversations


const delete_conversations = (req, res) =>{
    const file = req.body.file;
    fs.unlink(`./conversations/${file}`, (err) =>
    {
        if (err){
            console.log(err)
        }
    })

    return res.status(200).send({
        "msg" : "conversation deleted"
    })
    
}

const new_conversation = (req,res) => {
    const file = req.body.file;
    const filePath = `./conversations/${file}`
    const fileContent = '';

    fs.writeFile(filePath, fileContent, (err) => {
        if (err){
        console.log(err)};
        
        })

    return res.status(200).send({
            "msg" : "conversation created"
        })
}

const rename_conversation = (req, res) =>{
    const file = req.body.file[0].id;
    const oldPath = `./conversations/${file}`
    const newName = req.body.newName;
    const newPath = `./conversations/${newName}`

    fs.rename(oldPath, newPath, (err) => {
        if (err) console.log(err);
    });

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