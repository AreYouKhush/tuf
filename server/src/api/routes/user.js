const { Router } = require('express');
const User = require('../db/user');
const router = Router()

router.post('/form', async(req, res) =>{
    const username = req.body.username;
    const language = req.body.language;
    const stdin = req.body.stdin;
    const source = req.body.source;
    const newData = User.build({
        username: username,
        language: language,
        stdin: stdin,
        source: source
    })
    await newData.save();
    res.json(newData);
})

module.exports = router;