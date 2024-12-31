import express from "express"
import mysql from "mysql"
import cors from "cors"

const app = express();

app.use(express.json());
app.use(cors({
    origin:"http://localhost:5173",
    methods: ['GET','POST','PUT','DELETE'],
    credentials: true
}));

//Connection with mysql database.
const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"password",
    database:"bookmanager",
    dateStrings: 'date'
})

//Api to read all the books stored in database.
// To read data we use get method.
app.get("/",(req,res) => {
    const sql = "SELECT * FROM books";

    // To run the query 
    db.query(sql, (err,data) => {
        if(err) return res.json({Error:"Query Error"});
        return res.json(data);
    })
})


//Api to insert a book in database
//To insert data from frontend we use post method. 
app.post("/create",(req,res) => {
    const sql = `INSERT INTO books 
    (publisher,name,date) 
    VALUES (?)`;
    
    // To fetch the values
    const values = [
        req.body.publisher,
        req.body.name,
        req.body.date
    ]

    // To run the query 
    db.query(sql,[values], (err,data) => {
        if(err) return res.json({Error:"Query Error"});
        return res.json(data);
    })
});

//Api to update the record.
//For updating purpose we use put method.
app.post("/update/:id",(req,res) => {
    const sql = "update books set publisher = ? , name = ?, date = ? where id = ?";
    
    // To fetch the values
    const values = [
        req.body.publisher,
        req.body.name,
        req.body.date
    ]

    //To get the id 
    const id = req.params.id;

    // To run the query 
    db.query(sql,[...values,id], (err,data) => {
        if(err) return res.json({Error:"Query Error"});
        return res.json(data);
    })
});

//Api to delete a book from database
//To delete a record we use delete method
app.delete("/delete/:id",(req,res) => {
    const sql = "DELETE FROM books where id = ?";
    
    //To get the id 
    const id = req.params.id;

    // To run the query 
    db.query(sql,[id], (err,data) => {
        if(err) return res.json({Error:"Query Error"});
        return res.json(data);
    })
});

//api to get the record
app.get('/getrecord/:id', (req,res) =>{
    const id = req.params.id;
    const sql = `SELECT * FROM books WHERE id = ?`

    db.query(sql,[id], (err, data) => {
        if(err){
            return res.json({Error:"Error"})
        }
        return res.json(data)
    })
})
// Port number of the backend
app.listen(3030 , () => {
    console.log("App is running")
})