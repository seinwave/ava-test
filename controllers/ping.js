const ping = (req,res) => {
    res.status(200).send({"ok":true, "msg": "pong"}) 
}

module.exports = {
    ping
}