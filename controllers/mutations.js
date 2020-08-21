const mutations = (req, res) => {
    res.status(201).send({
        "msg" : "error_message",
        "ok" : "TBD_boolean",
        "text" : "current_string, post-mutation"
    })
}

module.exports = {
    mutations
}