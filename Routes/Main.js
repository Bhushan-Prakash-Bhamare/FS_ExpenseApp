const express = require('express');
const Controller = require('../Controllers/Main');

const router = express.Router();

router.get('/',Controller.getAllExpense);

router.post('/add-expense', Controller.postAddExpense);

router.delete('/delete-expense/:id',Controller.postDeleteExpense);

module.exports = router; 
