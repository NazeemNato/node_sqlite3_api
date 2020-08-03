const express = require('express')
const db = require("./database.js")
const bodyparser = require('body-parser') 

var app = express()
app.use(bodyparser.json())

app.get('/',(req,res)=>{
	res.send({'message':'ok'})
})
// get request users
app.get('/users',(req,res)=>{
	var sql = "select * from user"
 var params = []
 db.all(sql, params, (err, rows,field) => {
 	if(!err)
 		res.send(rows)
 	else
 		res.status(400).json({"error":err.message});
});
})
// get user by id
app.get('/users/:id',(req,res)=>{
	var sql = "select * from user  WHERE id = ?"
 var params = [req.params.id]
 db.all(sql, params, (err, rows,field) => {
 	if(!err)
 		res.send(rows)
 	else
 		res.status(400).json({"error":err.message});
});
})
// insert
app.post('/users',(req,res)=>{
// call users table
var usr = req.body;
var snd = {"is":"added"}
db.run('INSERT INTO user (name, email, password) VALUES (?,?,?)',[usr.name,usr.email,usr.password],(err,field)=>{
	if(!err)
		res.send(snd)
	else
		res.status(400).json({"error": err.message})
		console.log(err)
})
});
// 404
app.use(function(req,res){
	res.status(404)
})
// listen
app.listen(3000,()=>{
	console.log('Server running..')
})