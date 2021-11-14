var sqlite3 = require('sqlite3').verbose()
var md5 = require('md5')

const DBSOURCE = "sessions.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        // Cannot open database
        console.error(err.message)
        throw err
    } else {
        console.log('Connected to the SQLite database.')
        db.run(`CREATE TABLE users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            firstname text not null,
            lastname text not null, 
            email text UNIQUE not null, 
            password text not null, 
            CONSTRAINT email_unique UNIQUE (email)
            )`,
            (err) => {
                if (err) {
                    console.log("users table already created")
                } else {
                    // Table just created, creating some rows
                    console.log("users table created")
                }
            });
        db.run(`create table favorites (
  id integer constraint favorites_pk primary key autoincrement, 
  user_id int references users on delete cascade, 
  pokemon_id int not null, type_a text not null, 
  type_b text
)`,
            (err) => {
                if (err) {
                    console.log("favorites table already created")
                } else {
                    console.log("created favorites table")
                }
            })
    }
})
module.exports = db
