const express = require("express");
const app = express();
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors")

const db = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"password",
    database:"crud",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/api/get',(req,res)=>{
    const sqlSelect = "SELECT * FROM movie_reviews;"
    db.query(sqlSelect , (err,result)=>{
        res.send(result)
    })
})

app.post('/api/insert',(req,res)=>{
    const movieReview = req.body.movieReview
    const movieName = req.body.movieName
    const sqlInsert = "INSERT INTO movie_reviews (movie_review , movie_name) VALUES (?,?);"
    db.query(sqlInsert,[movieReview , movieName], (err,result)=>{
        console.log(result);
    })
});

app.delete("/api/delete/:movieName",(req,res)=>{
    const name = req.params.movieName;
    const sqlDelete = "DELETE FROM movie_reviews WHERE movie_name = ?;";
    db.query(sqlDelete , name,(err,result)=>{
        if(err){console.log(err)};
        console.log(result);
    })
})

app.put("/api/update",(req,res)=>{
    const name = req.body.movieName;
    const review = req.body.movieReview;
    const sqlUpdate = "UPDATE movie_reviews SET movie_review = ? WHERE movie_name = ?";
    db.query(sqlUpdate ,[review,name],(err,result)=>{
        if(err){console.log(err)};
    })
})

app.listen("3001",()=>{
    console.log("server is on");
});