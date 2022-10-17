const express = require('express');
const Repo = require('../structures/ApiQuery');
const router = express.Router();
const TextRepo = new Repo('test');



router.post("/create", async(req, res) => {
  const {name, email, description} = req.body;
  const data = {name, email, description};
  const result = TextRepo.Create(data)
})

module.exports = router;