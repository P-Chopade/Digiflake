import mysql from 'mysql'
import cors from 'cors'

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "digitalflake"
})

con.connect(function(err) {
    if(err) {
        console.log("connection error")
    } else {
        console.log("Connected")
    }
})

export default con;

