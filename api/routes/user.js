const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require('../models/user');
const bcrypt = require('bcrypt');

router.post("/signup", req,res, next) => {
    bcrypt.hash(req.body.password) {
        if ()
    }
}




module.exports = router;