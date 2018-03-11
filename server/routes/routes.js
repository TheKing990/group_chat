const express = require('express');
const router = express.Router();


router.get('/api/',(req, res) =>{
    res.json({
        "hello": "hey"
    })

});






module.exports = router;